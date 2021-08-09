import axios from "axios"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { update } from "../../redux/user/userSlice"
import jwtDecode from "jwt-decode"

const Homepage = ({ history }) => {
	const username = useSelector((state) => state.user.username)
	const dispatch = useDispatch()

	useEffect(() => {
		const token = localStorage.getItem("authToken")
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
		axios
			.get("http://localhost:5000/api/auth/privatedata", {
				headers: { authorization: token },
			})
			.then((response) => {
				if (username === "") {
					dispatch(update(response.data.userInfo))
				}
			})
			.catch((error) => {
				console.log(error)
			})
	}, [])
	return <div>Welcome On your todoApp! {username}</div>
}

export default Homepage
