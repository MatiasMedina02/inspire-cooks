import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ICreateRecipe, IRecipeWithId } from "../../types"

export const recipesApi = createApi({
	reducerPath: "recipesApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:3001",
	}),
	tagTypes: ["Recipes"],
	endpoints: (builder) => ({
		getAllRecipes: builder.query<IRecipeWithId[], null>({
			query: () => "/recipes",
			providesTags: ["Recipes"],
		}),
		getRecipeById: builder.query<IRecipeWithId, string>({
			query: (id: string) => `recipes/${id}`,
		}),
		postRecipe: builder.mutation<ICreateRecipe, object>({
			query: (recipe) => ({
				url: "/recipes",
				method: "POST",
				body: recipe,
			}),
			invalidatesTags: ["Recipes"]
		}),
	})
})

export const { useGetAllRecipesQuery, usePostRecipeMutation, useGetRecipeByIdQuery } = recipesApi