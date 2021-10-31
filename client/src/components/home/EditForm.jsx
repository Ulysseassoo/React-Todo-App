import axios from "axios"
import React from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { showEditForm } from "../../redux/modal/modalSlice"
import { updateTodo } from "../../redux/todo/todoSlice"

const EditForm = ({ todo }) => {
	const { register, handleSubmit } = useForm()
	const dispatch = useDispatch()
	const onSubmit = (data) => {
		const url = `http://localhost:5000/api/user/todos/${todo.id}`
		const token = localStorage.getItem("authToken")
		axios
			.put(url, data, {
				headers: { "Content-type": "application/json", authorization: token }
			})
			.then((response) => {
				const { data } = response
				console.log("🚀 ~ file: EditForm.jsx ~ line 19 ~ .then ~ data", data)
				dispatch(updateTodo(data.data))
				dispatch(showEditForm(false))
			})
			.catch((error) => {
				if (error.response.status === 401 || error.response.status === 404) {
					localStorage.removeItem("authToken")
					history.push("/register")
				}
			})
	}
	return (
		<div className="modal" data-cy="modal">
			<form onSubmit={handleSubmit(onSubmit)}>
				<input type="text" placeholder={todo.name} {...register("name", { required: true })} data-cy="name" />
				<input type="text" placeholder={todo.description} {...register("description", {})} data-cy="description" />
				<input type="submit" data-cy="submit-modify" />
			</form>
		</div>
	)
}

export default EditForm
