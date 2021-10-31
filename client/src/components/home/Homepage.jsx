import axios from "axios"
import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { update as userUpdate } from "../../redux/user/userSlice"
import { update as todoUpdate, fill, filter } from "../../redux/todo/todoSlice"
import jwtDecode from "jwt-decode"
import "../home/homepage.scss"
import { useForm } from "react-hook-form"
import Check from "../../assets/img/check-circle(1).svg"
import TodoItem from "./TodoItem"
import { FaSearch } from "react-icons/fa"
import { BsMoon } from "react-icons/bs"
import DateContainer from "./DateContainer"
import Modal from "./Modal"
import EditForm from "./EditForm"

const Homepage = ({ history }) => {
	const username = useSelector((state) => state.user.username)
	const todos = useSelector((state) => state.todos.todoList)
	const filteredTodolist = useSelector((state) => state.todos.filteredTodoList)
	const actualTodo = useSelector((state) => state.modal.actualTodo)
	const openModal = useSelector((state) => state.modal.openModal)
	const openEditForm = useSelector((state) => state.modal.openEditForm)
	const dispatch = useDispatch()

	useEffect(() => {
		const token = localStorage.getItem("authToken")

		const fetchData = async () => {
			const userData = await axios.get("http://localhost:5000/api/auth/privatedata", {
				headers: { authorization: token }
			})
			const todoData = await axios.get("http://localhost:5000/api/user/todos", {
				headers: { authorization: token }
			})
			return { ...userData.data, ...todoData.data }
		}
		fetchData()
			.then((data) => {
				const { todos, userInfo } = data
				if (username === "") {
					const { email, username } = userInfo
					dispatch(userUpdate({ email, username }))
				}
				if (todos.length > 0) {
					dispatch(fill(todos))
				}
			})
			.catch((error) => {
				if (error.response.status === 404 || error.response.status === 401) {
					localStorage.removeItem("authToken")
					history.push("/register")
				}
			})
		const decodedToken = jwtDecode(token.split("Bearer")[1].trim())
		const expiryDate = new Date(decodedToken.exp * 1000)
		const todaysDate = new Date(Date.now())
		if (todaysDate > expiryDate) {
			localStorage.removeItem("authToken")
			history.push("/login")
			return
		}
		if (!token) {
			history.push("/login")
			return
		}
	}, [])

	const [sidebar, setSidebar] = useState(false)
	const [focused, setFocused] = useState(false)
	const formInputs = useRef()

	const { register, handleSubmit } = useForm()
	const addTodo = (formData) => {
		const url = "http://localhost:5000/api/user/todos"
		const token = localStorage.getItem("authToken")
		axios
			.post(url, formData, {
				headers: { "Content-type": "application/json", authorization: token }
			})
			.then((response) => {
				const { data } = response
				dispatch(todoUpdate(data.data))
				formInputs.current[0].value = ""
				formInputs.current[1].value = ""
			})
			.catch((error) => {
				if (error.response.status === 404 || error.response.status === 401) {
					localStorage.removeItem("authToken")
					history.push("/register")
				}
			})
	}

	const filterTodos = (namesearch) => {
		dispatch(filter(namesearch))
	}

	return (
		<div className={sidebar ? "container--homepage active" : "container--homepage"}>
			{openModal && <div className="overlay"></div>}
			{openEditForm && <div className="overlay"></div>}
			<nav className="navbar">
				<div className="navbar--left">
					<div className={sidebar ? "navbar--menu active" : "navbar--menu"} onClick={() => setSidebar((prevState) => !prevState)}>
						<span className="menu--icon"></span>
					</div>
					<div className="title">
						<h1>React Todo App</h1>
					</div>
				</div>
				<div className="search--container">
					<input type="text" className="search--input" onKeyUp={(e) => filterTodos(e.target.value)} />
					<FaSearch />
				</div>
				<div className="navbar--toggle">
					<BsMoon />
				</div>
			</nav>
			<aside className="sidebar">
				<div className="menu"></div>
			</aside>
			<main className="main--container">
				{openModal && <Modal todo={actualTodo} />}
				{openEditForm && <EditForm todo={actualTodo} />}
				<DateContainer username={username} />
				<div className={focused ? "todos--form active" : "todos--form"}>
					<form onSubmit={handleSubmit(addTodo)} ref={formInputs}>
						<div className="form--group">
							<input
								type="text"
								placeholder="+ Nouvelle tâche"
								{...register("name", { required: true, maxLength: 80 })}
								className="form--input"
								onFocus={() => setFocused(true)}
								onBlur={() => setFocused(false)}
								data-cy="todotitle"
							/>
						</div>
						<div className="form--group">
							<input
								type="text"
								placeholder="Need to a little description :) ?"
								{...register("description", {})}
								className="form--input"
								onFocus={() => setFocused(true)}
								onBlur={() => setFocused(false)}
								data-cy="tododescription"
							/>
						</div>

						<input type="image" src={Check} className="submit--image" data-cy="submit" />
					</form>
				</div>
				<div className="todos--container" data-cy="todos">
					{filteredTodolist.length > 0 ? <TodoItem todos={filteredTodolist} history={history} /> : <TodoItem todos={todos} history={history} />}
				</div>
			</main>
		</div>
	)
}

export default Homepage
