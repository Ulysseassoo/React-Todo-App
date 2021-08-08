const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const User = sequelize.define(
	"User",
	// Model attributes are defined here
	{
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: {
					args: 6,
					msg: "Password must be more than 6 characters",
				},
			},
		},
		resetPasswordToken: {
			type: DataTypes.STRING,
		},
		resetPasswordExpire: {
			type: DataTypes.DATE,
		},
	}
)

module.exports = User
