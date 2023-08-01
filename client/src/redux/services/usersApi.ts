import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { LoginData, User } from "../../types"

export const usersApi = createApi({
	reducerPath: "usersApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:3001",
	}),
	tagTypes: ["Users"],
	endpoints: (builder) => ({
		getAllUsers: builder.query<User[], object[]>({
			query: () => "/users",
			providesTags: ["Users"]
		}),
		registerUser: builder.mutation<User, object>({
			query: (userData) => ({
				url: "/users/register",
				method: "POST",
				body: userData
			}),
			invalidatesTags: ["Users"]
		}),
		loginUser: builder.mutation<LoginData, object>({
			query: (userData) => ({
				url: "/users/login",
				method: "POST",
				body: userData,
			}),
		}),
	})
})

export const { useGetAllUsersQuery, useLoginUserMutation, useRegisterUserMutation } = usersApi