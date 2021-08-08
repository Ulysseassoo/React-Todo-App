const { Sequelize } = require("sequelize")
const process = require("process")

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.USER, process.env.PASSWORD, {
	host: process.env.HOST,
	dialect: process.env.DIALECT,
	logging: false,
})

sequelize.sync({ alter: true })

module.exports = sequelize
