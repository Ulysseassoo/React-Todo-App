import React, { useEffect, useState } from "react"
import SignupBackground from "../../assets/img/signupbackground.png"
import SigninBackground from "../../assets/img/signinbackground.png"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"
import "./registerPage.scss"
const AuthPage = ({ history }) => {
	const [registerCount, setRegisterCount] = useState(0)

	useEffect(() => {
		history.push("/register")
		if (registerCount === 1) {
			history.push("/login")
		}
	}, [registerCount])

	useEffect(() => {
		if (localStorage.getItem("authToken")) {
			history.push("/")
		}
	}, [history])

	return (
		<section className={registerCount === 0 ? "container" : "container signup--mode"}>
			<div className="forms--container">
				<div className="background--circle">
					{registerCount === 0 ? (
						<div className="background--register">
							<h2>Already have an account ?</h2>
							<p>Just click on the button below !</p>
							<button className="btn--sign" onClick={() => setRegisterCount(1)}>
								Sign in
							</button>
							<div className="background--image">
								<img src={SignupBackground} alt="signup background" />
							</div>
						</div>
					) : (
						<div className="background--register">
							<h2>You are new here ?</h2>
							<p>Click below and sign up !</p>
							<button className="btn--sign" onClick={() => setRegisterCount(0)}>
								Sign up
							</button>
							<div className="background--image">
								<img src={SigninBackground} alt="signin background" />
							</div>
						</div>
					)}
				</div>
				<div className="signin--signup">
					{registerCount === 0 ? <RegisterForm history={history} /> : <LoginForm history={history} />}
				</div>
			</div>
		</section>
	)
}

export default AuthPage
