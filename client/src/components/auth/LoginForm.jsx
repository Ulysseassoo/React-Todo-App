import axios from "axios"
import React from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { update } from "../../redux/user/userSlice"
import { FaEye, FaLock } from "react-icons/fa"
import { AiOutlineMail } from "react-icons/ai"

const LoginForm = ({ history }) => {
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
		<div className="signin--form">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="form--title">
					<h1>React Todo App</h1>
					<h2>Log yourself in !</h2>
				</div>
				<div className="form--details">
					{errors.email && "Email is incorrect"}

					<div className="form--group">
						<p>
							<AiOutlineMail />
						</p>

						<input
							className="form--input"
							type="email"
							placeholder="john@gmail.com..."
							id="email"
							autoComplete="on"
							{...register("email", { required: true, min: 5, pattern: /^\S+@\S+$/i })}
						/>
					</div>
					{errors.password && "Your password is incorrect"}

					<div className="form--group">
						<p>
							<FaLock />
						</p>

						<input
							className="form--input"
							type="password"
							placeholder="Enter your password"
							id="password"
							{...register("password", { required: true, min: 1 })}
						/>

						<span>
							<FaEye />
						</span>
					</div>
					<input className="form--btn" type="submit" value="Sign In" />
				</div>
			</form>
		</div>
	)
}

export default LoginForm
