import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import RegisterPage from "./components/auth/RegisterPage"
import LoginPage from "./components/auth/LoginPage"
import Homepage from "./components/home/Homepage"
import PrivateRoute from "./helpers/PrivateRoute"

function App() {
	return (
		<Router>
			<div className="App">
				<Switch>
					<PrivateRoute exact path="/" component={Homepage} />
					<Route exact path="/register" component={RegisterPage} />
					<Route exact path="/login" component={LoginPage} />
				</Switch>
			</div>
		</Router>
	)
}

export default App
