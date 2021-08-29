import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	actualTodo: {},
	openModal: false,
}

export const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		changeTodo: (state, action) => {
			state.actualTodo = action.payload
		},
		showModal: (state, action) => {
			state.openModal = action.payload
		},
	},
})

export const { changeTodo, showModal } = modalSlice.actions

export default modalSlice.reducer
