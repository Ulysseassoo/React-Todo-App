import axios from "axios"
import React from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { update } from "../../redux/user/userSlice"
import { FaEye, FaLock, FaUser } from "react-icons/fa"
import { AiOutlineMail } from "react-icons/ai"

const RegisterForm = ({ history }) => {
	const dispatch = useDispatch()
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm()
	const onSubmitRegister = (formData) => {
		const { password, confirmPassword } = formData
		if (password !== confirmPassword) {
			alert("The passwords don't match")
			return
		}
		const url = "http://localhost:5000/api/auth/register"
		axios
			.post(url, formData, {
				headers: { "Content-type": "application/json" }
			})
			.then((response) => {
				localStorage.setItem("authToken", response.data.token)
				dispatch(update(formData))
				history.push("/")
			})
			.catch((error) => {
				console.log(error)
				alert("error")
			})
	}
	return (
		<div className="signup--form">
			<form onSubmit={handleSubmit(onSubmitRegister)}>
				<div className="form--title">
					<h1>React Todo App</h1>
					<h2>Create an account</h2>
				</div>
				<div className="form--details">
					<div className="form--group">
						<p>
							<FaUser />
						</p>

						<input
							className="form--input"
							type="text"
							placeholder="Username"
							autoComplete="on"
							id="username"
							{...register("username", { required: true, min: 3 })}
							data-cy="username"
						/>
					</div>
					{errors.email && <span className="errors">Email is incorrect</span>}

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
							data-cy="email"
						/>
					</div>
					{errors.password && <span className="errors">Your password is incorrect</span>}

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
							data-cy="password"
						/>

						<span>
							<FaEye />
						</span>
					</div>
					<div className="form--group">
						<p>
							<FaLock />
						</p>

						<input
							className="form--input"
							type="password"
							placeholder="Repeat your Password"
							id="confirmPassword"
							{...register("confirmPassword", { required: true, min: 1 })}
							data-cy="confirmpassword"
						/>
						<span>
							<FaEye />
						</span>
					</div>

					<input className="form--btn" type="submit" value="Sign Up" data-cy="submit" />
				</div>
			</form>
		</div>
	)
}

export default RegisterForm
