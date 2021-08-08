const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const Todo = sequelize.define("Todo", {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	description: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	complete: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
	},
})

module.exports = Todo
