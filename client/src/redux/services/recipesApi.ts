import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IComment, ICreateRecipe, IPostComment, IRecipeWithAll } from "../../types"

export const recipesApi = createApi({
	reducerPath: "recipesApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:3001",
		// baseUrl: "https://inspire-cooks.vercel.app",
	}),
	tagTypes: ["Recipes", "RecipeWithId"],
	endpoints: (builder) => ({
		getAllRecipes: builder.query<IRecipeWithAll[], null>({
			query: () => "/recipes",
			providesTags: ["Recipes"],
		}),
		getAllRecipesCreated: builder.query<IRecipeWithAll[], string>({
			query: (idUser) => `/recipes/created/${idUser}`,
			providesTags: ["Recipes"],
		}),
		getRecipeById: builder.query<IRecipeWithAll, string>({
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
		deleteRecipe: builder.mutation<string, string>({
			query: (idRecipe) => ({
				url: `/recipes/${idRecipe}`,
				method: "DELETE",
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
		searchRecipe: builder.query<IRecipeWithAll[], string>({
			query: (title) => `/recipes?title=${title}`,
		}),
	})
})

export const { 
	useGetAllRecipesQuery, 
	useGetAllRecipesCreatedQuery,
	usePostRecipeMutation, 
	useGetRecipeByIdQuery, 
	useDeleteRecipeMutation,
	usePostCommentMutation, 
	useSearchRecipeQuery 
} = recipesApi