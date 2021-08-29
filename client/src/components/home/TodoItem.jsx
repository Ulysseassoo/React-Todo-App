import axios from "axios"
import React from "react"
import { FaEdit, FaTrashAlt } from "react-icons/fa"
import { MdRadioButtonUnchecked, MdUpdate } from "react-icons/md"
import { IoIosCheckmarkCircleOutline } from "react-icons/io"
import { useDispatch } from "react-redux"
import { completeTodo, deleteTodo } from "../../redux/todo/todoSlice"
import { changeTodo, showModal } from "../../redux/modal/modalSlice"
import { convertDatabaseDate } from "../../utils/convertDatabaseDate"

const TodoItem = ({ todos, history }) => {
	const dispatch = useDispatch()
	const deleteTodoItem = (id) => {
		const url = `http://localhost:5000/api/user/todos/${id}`
		const token = localStorage.getItem("authToken")
		axios
			.delete(url, {
				headers: { "Content-type": "application/json", authorization: token },
			})
			.then(() => {
				dispatch(deleteTodo(id))
			})
			.catch((error) => {
				if (error.response.status === 401 || error.response.status === 404) {
					localStorage.removeItem("authToken")
					history.push("/register")
				}
			})
	}
	const completeTodoItem = (id, complete) => {
		const url = `http://localhost:5000/api/user/todos/${id}`
		const token = localStorage.getItem("authToken")
		const todoData = JSON.stringify({ complete: !complete })
		axios
			.put(url, todoData, {
				headers: { "Content-type": "application/json", authorization: token },
			})
			.then((response) => {
				const { data } = response
				console.log("🚀 ~ file: TodoItem.jsx ~ line 58 ~ .then ~ data", data)
				dispatch(completeTodo(id))
			})
			.catch((error) => {
				if (error.response.status === 401 || error.response.status === 404) {
					localStorage.removeItem("authToken")
					history.push("/register")
				}
			})
	}
	const actualTodo = (id) => {
		const todo = todos.filter((todo) => todo.id === id)
		return todo[0]
	}
	return (
		<>
			{todos
				? todos.map((todo) => (
						<div
							className="todo--item"
							key={todo.id}
							onClick={() => {
								dispatch(changeTodo(actualTodo(todo.id)))
								dispatch(showModal(true))
							}}>
							<div className="todo--content">
								{todo.complete ? (
									<IoIosCheckmarkCircleOutline
										className="todo--completed"
										onClick={() => completeTodoItem(todo.id, todo.complete)}
									/>
								) : (
									<MdRadioButtonUnchecked
										className="todo--completed"
										onClick={() => completeTodoItem(todo.id, todo.complete)}
									/>
								)}
								<div className={todo.complete ? "todo--title complete" : "todo--title"}>{todo.name}</div>
								<div className="todo--hour">
									<MdUpdate />
									<p>{convertDatabaseDate(todo.updatedAt)}</p>
								</div>
							</div>
							<div className="todo--options">
								<div className="todo--discard" onClick={() => deleteTodoItem(todo.id)}>
									<FaTrashAlt />
								</div>
								<div className="todo--edit">
									<FaEdit />
								</div>
								{/* <div className="todo--label">{todo.completed}</div> */}
							</div>
						</div>
				  ))
				: " "}
		</>
	)
}

export default TodoItem
