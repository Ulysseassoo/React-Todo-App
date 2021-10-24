import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	todoList: [],
	filteredTodoList: [],
	pending: false
}

export const todoSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {
		fill: (state, action) => {
			state.todoList = action.payload
		},
		update: (state, action) => {
			state.todoList = [...state.todoList, action.payload]
			return state
		},
		filter: (state, action) => {
			state.filteredTodoList = state.todoList.filter((item) => item.name.includes(action.payload))
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
		updateTodo: (state, action) => {
			state.todoList.map((todo) => {
				if (todo.id === action.payload.id) {
					todo.name = action.payload.name
					todo.description = action.payload.description
				}
			})
			return state
		},
		loading: (state) => {
			state.pending = true
		},
		success: (state) => {
			state.pending = false
		}
	}
})

export const { fill, filter, update, deleteTodo, completeTodo, updateTodo, loading, success } = todoSlice.actions

export default todoSlice.reducer
