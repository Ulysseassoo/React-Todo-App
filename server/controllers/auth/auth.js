const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
// const crypto = require("crypto")
// const { Op } = require("sequelize")
const process = require("process")
const bcrypt = require("bcryptjs")

const User = require("../../models/User")
const { protect } = require("../../middleware/auth")

// -------------------------------------------------------------------------- FUNCTIONS -------------------------------------------------------------
const isValid = (email) => {
	let regEmail = /^w+[+.w-]*@([w-]+.)*w+[w-]*.([a-z]{2,4}|d+)$/i
	if (regEmail.test(email)) {
		return true
	}
	return false
}

const generateSignedToken = (user) => {
	return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	})
}

const sendToken = (user, statusCode, res) => {
	const token = generateSignedToken(user)
	res.status(statusCode).json({
		status: statusCode,
		token: `Bearer ${token}`,
		userInfo: {
			email: user.email,
			username: user.username,
		},
	})
}

// -------------------------------------------------------------------------- ROUTES -------------------------------------------------------------
router.post("/register", (req, res) => {
	const { username, email, password } = req.body
	if (!username || !email || !password) {
		res.status(401).send({
			status: 401,
			message: "Please provide an email, password and username",
		})
		return
	}
	console.log(req.body)
	const salt = bcrypt.genSaltSync(6)
	let passwordEncrypted = bcrypt.hashSync(password, salt)
	User.create({
		username,
		email: isValid ? email : null,
		password: passwordEncrypted,
	})
		.then((user) => {
			sendToken(user, 201, res)
		})
		.catch((error) => {
			res.status(401).send({
				status: 401,
				message: error.errors[0].message,
			})
			return
		})
})

router.post("/login", async (req, res) => {
	const { email, password } = req.body
	if (!email || !password) {
		res.status(400).send("Please provide an email and Password")
		return
	}
	User.findOne({
		where: {
			email: email,
		},
	})
		.then((user) => {
			if (!user) {
				res.status(401).send({
					status: 401,
					message: "Invalid credentials",
				})
				return
			}

			const isMatch = bcrypt.compareSync(password, user.password)
			if (!isMatch) {
				res.status(401).send({
					status: 401,
					message: "Invalid credentials",
				})
				return
			}
			sendToken(user, 200, res)
			return
		})
		.catch(() => {
			res.status(401).send({
				status: 401,
				message: "Your credentials might be incorrect",
			})
			return
		})
})

router.get("/privatedata", protect, (req, res) => {
	const { dataValues } = req.user
	res.status(200).json({
		status: 200,
		userInfo: dataValues,
	})
})

module.exports = router
