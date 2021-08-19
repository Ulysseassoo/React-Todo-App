// Importing the files we are going to need
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const process = require("process")

exports.protect = async (req, res, next) => {
	let token
	const { authorization } = req.headers

	// We check the header to see if there is a token existing
	if (authorization && authorization.startsWith("Bearer")) {
		token = authorization.split("Bearer")[1].trim()
	}

	if (!token) {
		return res.status(401).send({
			status: 401,
			message: "Not authorized to access this route",
		})
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET)

		const user = await User.findOne({
			where: {
				id: decoded.id,
			},
		})
		if (!user) {
			return res.status(404).send({
				status: 404,
				message: "No user found with this id",
			})
		}

		req.user = user

		next()
	} catch (error) {
		return res.status(401).send({
			status: 401,
			message: "Not authorized to access this route",
		})
	}
}
