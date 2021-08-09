import axios from "axios"
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { update } from "../../redux/user/userSlice"
import "./registerPage.scss"

const RegisterPage = ({ history }) => {
	useEffect(() => {
		if (localStorage.getItem("authToken")) {
			history.push("/")
		}
	}, [history])
	const dispatch = useDispatch()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()
	const onSubmit = (formData) => {
		const { password, confirmPassword } = formData
		if (password !== confirmPassword) {
			alert("The passwords don't match")
			return
		}
		const url = "http://localhost:5000/api/auth/register"
		axios
			.post(url, formData, {
				headers: { "Content-type": "application/json" },
			})
			.then((response) => {
				localStorage.setItem("authToken", response.data.token)
				dispatch(update(formData))
				history.push("/")
			})
			.catch((error) => {
				console.log(error)
			})
	}

	return (
		<section className="container">
			<div className="background"></div>
			<form className="form" onSubmit={handleSubmit(onSubmit)}>
				<input
					className="form--input"
					type="text"
					placeholder="username"
					{...register("username", { required: true, min: 1 })}
				/>
				<input
					type="email"
					placeholder="email"
					{...register("email", { required: true, min: 1, pattern: /^\S+@\S+$/i })}
				/>
				{errors.email && "Email is incorrect"}
				<input
					className="form--input"
					type="password"
					placeholder="password"
					{...register("password", { required: true, min: 1 })}
				/>
				{errors.password && "Your password is incorrect"}
				<input
					className="form--input"
					type="password"
					placeholder="confirmPassword"
					{...register("confirmPassword", { required: true, min: 1 })}
				/>

				<input className="form--btn" type="submit" />
			</form>
		</section>
	)
}

export default RegisterPage
