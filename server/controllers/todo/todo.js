const express = require("express")
const router = express.Router()

const { protect } = require("../../middleware/auth")
const Todo = require("../../models/Todo")

// -------------------------------------------------------------------------- ROUTES -------------------------------------------------------------
router.get("/todos", protect, (req, res) => {
	const { dataValues } = req.user
	const { id } = dataValues

	Todo.findAll({
		where: {
			UserId: id,
		},
	})
		.then((todos) => {
			const filteredTodos = todos.map((todo) => {
				delete todo.UserId
				return todo
			})
			res.status(200).send({
				status: 200,
				todos: filteredTodos,
			})
			return
		})
		.catch((error) => {
			res.status(401).send({
				status: 401,
				message: error,
			})
			return
		})
})

router.post("/todos", protect, (req, res) => {
	const { name, description } = req.body
	const { dataValues } = req.user
	const { id } = dataValues

	Todo.create({
		name,
		description,
		complete: false,
		UserId: id,
	}).then((todo) => {
		const name = "UserId"
		delete todo[name]
		res.status(201).send({ status: 201, data: todo })
	})
})

router.delete("/todos/:id(\\d+)", protect, (req, res) => {
	const { dataValues } = req.user
	const { id } = dataValues
	Todo.findOne({
		where: {
			id: req.params.id,
			UserId: id,
		},
	})
		.then((todo) => {
			Todo.destroy({
				where: {
					id: todo.id,
				},
			}).then(() => {
				res.status(200).send({ status: 200, data: "L'item a bien été supprimé" })
				return
			})
		})
		.catch((error) => res.status(404).send({ status: 404, data: error }))
})

router.put("/todos/:id(\\d+)", protect, (req, res) => {
	const { dataValues } = req.user
	const { id } = dataValues
	const { complete, description, name } = req.body

	Todo.findOne({
		where: {
			id: req.params.id,
			UserId: id,
		},
	}).then((todo) => {
		if (!todo) {
			res.status(404).send({ status: 404, data: "La tâche n'existe pas !!!" })
			return
		}
		todo
			.update({
				complete: complete,
				description: description,
				name: name,
			})
			.then((todo) => {
				const name = "UserId"
				delete todo[name]
				res.json({ status: 200, data: todo })
			})
		return
	})
})

module.exports = router
