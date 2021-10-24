import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	actualTodo: {},
	openModal: false,
	openEditForm: false,
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
		showEditForm: (state, action) => {
			state.openEditForm = action.payload
		},
	},
})

export const { changeTodo, showModal, showEditForm } = modalSlice.actions

export default modalSlice.reducer
