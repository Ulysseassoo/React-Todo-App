import axios from "axios"
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { update } from "../../redux/user/userSlice"

const LoginPage = ({ history }) => {
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
		const url = "http://localhost:5000/api/auth/login"
		axios
			.post(url, formData, {
				headers: { "Content-type": "application/json" },
			})
			.then((response) => {
				console.log("🚀 ~ file: LoginPage.jsx ~ line 26 ~ .then ~ response", response)
				localStorage.setItem("authToken", response.data.token)
				dispatch(update(response.data.userInfo))
				history.push("/")
			})
			.catch((error) => {
				console.log(error)
			})
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input
				type="email"
				placeholder="email"
				{...register("email", { required: true, min: 1, pattern: /^\S+@\S+$/i })}
			/>
			{errors.email && "Email is incorrect"}
			<input type="text" placeholder="password" {...register("password", { required: true, min: 1 })} />
			{errors.password && "Your password is incorrect"}
			<input type="submit" />
		</form>
	)
}

export default LoginPage
