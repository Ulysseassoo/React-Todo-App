import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	todoList: [],
	pending: false,
}

export const todoSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {
		fill: (state, action) => {
			state.todoList = action.payload
		},
		update: (state, action) => {
			// const id = state.todoList.length
			state.todoList = [...state.todoList, action.payload]
			return state
		},
		deleteTodo: (state, action) => {
			state.todoList = state.todoList.filter((item) => item.id !== action.payload)
			return state
		},
		completeTodo: (state, action) => {
			state.todoList.map((todo) => {
				if (todo.id === action.payload) {
					todo.complete = !todo.complete
				}
			})
			return state
		},
		loading: (state) => {
			state.pending = true
		},
		success: (state) => {
			state.pending = false
		},
	},
})

export const { fill, update, deleteTodo, completeTodo, loading, success } = todoSlice.actions

export default todoSlice.reducer
