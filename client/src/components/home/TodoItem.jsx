import axios from "axios"
import React from "react"
import { FaTrashAlt } from "react-icons/fa"
import { useDispatch } from "react-redux"
import { deleteTodo } from "../../redux/todo/todoSlice"

const TodoItem = ({ todos, history }) => {
	const dispatch = useDispatch()
	const convertDatabaseDate = (date) => {
		let convertedDate = date.split(/\D+/)
		let newDate = new Date(
			Date.UTC(
				convertedDate[0],
				--convertedDate[1],
				convertedDate[2],
				convertedDate[3],
				convertedDate[4],
				convertedDate[5],
				convertedDate[6]
			)
		)
		let todaysDate = new Date(Date.now())
		if (newDate === todaysDate) {
			return "Today"
		}
		return `${newDate.getDate()}/${newDate.getMonth()}/${newDate.getFullYear()}`
	}
	const deleteTodoItem = (id) => {
		const url = `http://localhost:5000/api/user/todos/${id}`
		const token = localStorage.getItem("authToken")
		axios
			.delete(url, {
				headers: { "Content-type": "application/json", authorization: token },
			})
			.then((response) => {
				const { data } = response
				console.log("🚀 ~ file: TodoItem.jsx ~ line 35 ~ deleteTodoItem ~ data", data)
				dispatch(deleteTodo(id))
			})
			.catch((error) => {
				if (error.response.status === 401 || error.response.status === 404) {
					localStorage.removeItem("authToken")
					history.push("/register")
				}
			})
	}
	return (
		<>
			{todos
				? todos.map((todo) => (
						<div className="todo--item" key={todo.id}>
							<div className="todo--discard" onClick={() => deleteTodoItem(todo.id)}>
								<FaTrashAlt />
							</div>
							<div className="todo--title">{todo.name}</div>
							<div className="todo--hour">{convertDatabaseDate(todo.createdAt)}</div>
							<div className="todo--label">{todo.completed}</div>
						</div>
				  ))
				: "BRO"}
		</>
	)
}

export default TodoItem
