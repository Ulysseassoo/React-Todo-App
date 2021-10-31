import React, { useEffect } from "react"
import SignupBackground from "../../assets/img/signupbackground.png"
import SigninBackground from "../../assets/img/signinbackground.png"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"
import "./registerPage.scss"
import { useSelector, useDispatch } from "react-redux"
import { changeCount } from "../../redux/user/userSlice"
const AuthPage = ({ history }) => {
	const registerCount = useSelector((state) => state.user.registerCount)
	const dispatch = useDispatch()

	useEffect(() => {
		history.push("/register")
		if (registerCount === true) {
			history.push("/login")
		}
	}, [registerCount])

	useEffect(() => {
		if (localStorage.getItem("authToken")) {
			history.push("/")
		}
	}, [history])

	return (
		<section className={registerCount === false ? "container" : "container signup--mode"}>
			<div className="forms--container">
				<div className="background--circle">
					{registerCount === false ? (
						<div className="background--register">
							<h2>Already have an account ?</h2>
							<p>Just click on the button below !</p>
							<button className="btn--sign" data-cy="changeroute" onClick={() => dispatch(changeCount())}>
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
							<button className="btn--sign" data-cy="changeroute" onClick={() => dispatch(changeCount())}>
								Sign up
							</button>
							<div className="background--image">
								<img src={SigninBackground} alt="signin background" />
							</div>
						</div>
					)}
				</div>
				<div className="signin--signup">{registerCount === false ? <RegisterForm history={history} /> : <LoginForm history={history} />}</div>
			</div>
		</section>
	)
}

export default AuthPage
