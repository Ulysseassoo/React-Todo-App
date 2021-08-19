import { configureStore } from "@reduxjs/toolkit"
import todoSlice from "./todo/todoSlice"
import userSlice from "./user/userSlice"

export const store = configureStore({
	reducer: {
		user: userSlice,
		todos: todoSlice,
	},
})
