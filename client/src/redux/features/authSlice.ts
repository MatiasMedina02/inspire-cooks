import { createSlice } from "@reduxjs/toolkit";
import { UserData } from "../../types";

const initialState = {
	userData: {} as UserData
}

const authSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		login: (state, action) => {
			state.userData = action.payload;
		},
		logout: (state) => {
			state.userData = {} as UserData
		}
	}
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer