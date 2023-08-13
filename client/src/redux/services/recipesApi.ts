import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IComment, ICreateRecipe, IPostComment, IRecipeWithId } from "../../types"

export const recipesApi = createApi({
	reducerPath: "recipesApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:3001",
	}),
	tagTypes: ["Recipes", "RecipeWithId"],
	endpoints: (builder) => ({
		getAllRecipes: builder.query<IRecipeWithId[], null>({
			query: () => "/recipes",
			providesTags: ["Recipes"],
		}),
		getRecipeById: builder.query<IRecipeWithId, string>({
			query: (id: string) => `/recipes/${id}`,
			providesTags: ["RecipeWithId"],
		}),
		postRecipe: builder.mutation<ICreateRecipe, object>({
			query: (recipe) => ({
				url: "/recipes",
				method: "POST",
				body: recipe,
			}),
			invalidatesTags: ["Recipes"]
		}),
		postComment: builder.mutation<IComment, IPostComment>({
			query: ({ idRecipe, comment }) => ({
				url: `/comments/${idRecipe}`,
				method: "POST",
				body: comment
			}),
			invalidatesTags: ["RecipeWithId"]
		}),
		searchRecipe: builder.query<IRecipeWithId[], string>({
			query: (title) => `/recipes?title=${title}`,
		}),
	})
})

export const { useGetAllRecipesQuery, usePostRecipeMutation, useGetRecipeByIdQuery, usePostCommentMutation, useSearchRecipeQuery } = recipesApi