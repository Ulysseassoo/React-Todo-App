import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	username: "",
	email: "",
	pending: false,
	registerCount: false
}

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		update: (state, action) => {
			state.username = action.payload.username
			state.email = action.payload.email
		},
		loading: (state) => {
			state.pending = true
		},
		success: (state) => {
			state.pending = false
		},
		changeCount: (state) => {
			state.registerCount = !state.registerCount
		}
	}
})

export const { update, loading, success, changeCount } = userSlice.actions

export default userSlice.reducer
