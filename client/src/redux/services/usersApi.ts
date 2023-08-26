import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IFavRecipe, IRecipeWithAll, LoginData, User } from "../../types"

export const usersApi = createApi({
	reducerPath: "usersApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:3001",
		// baseUrl: "https://inspire-cooks.vercel.app",
	}),
	tagTypes: ["Users", "Favorites"],
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
		getAllFavorites: builder.query<IRecipeWithAll[], string>({
			query: (idUser) => `/favorites/${idUser}`,
			providesTags: ["Favorites"]
		}),
		addFavRecipe: builder.mutation<void, IFavRecipe>({
			query: ({ idRecipe, idUser }) => ({
				url: "/favorites",
				method: "POST",
				body: { idRecipe, idUser },
			}),
			invalidatesTags: ["Favorites"]
		}),
		removeFavRecipe: builder.mutation<void, IFavRecipe>({
			query: ({ idRecipe, idUser }) => ({
				url: "/favorites",
				method: "DELETE",
				body: { idRecipe, idUser },
			}),
			invalidatesTags: ["Favorites"]
		}),
	})
})

export const { 
	useGetAllUsersQuery, 
	useLoginUserMutation, 
	useRegisterUserMutation, 
	useAddFavRecipeMutation, 
	useRemoveFavRecipeMutation,
	useGetAllFavoritesQuery
} = usersApi