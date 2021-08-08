const sequelize = require("./config/database")

const User = require("./models/User")
const Todo = require("./models/Todo")

User.hasMany(Todo)
Todo.belongsTo(User)

sequelize.sync({ alter: true })
