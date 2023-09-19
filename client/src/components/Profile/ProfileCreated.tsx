import { useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";
import { useDeleteRecipeMutation, useGetAllRecipesCreatedQuery } from "../../redux/services/recipesApi";
import { toast } from "react-toastify";
import Spinner from "../Spinner";

const ProfileCreated: React.FC = () => {
  const userData = useAppSelector((state) => state.persistedReducer.user.userData);
  const { data: recipesCreated, isLoading } = useGetAllRecipesCreatedQuery(userData?.user?._id);
  const [deleteRecipe, { data, isSuccess }] = useDeleteRecipeMutation();
  console.log(recipesCreated);


  const handleEditRecipe = (idRecipe: string) => {

  }

  useEffect(() => {
    if (isSuccess) {
      toast.success(data, {
        autoClose: 3000
      });
    }
  }, [isSuccess])

  if (isLoading) return <Spinner />

  if (!recipesCreated?.length) {
    return <h2 className="text-center">There are no recipes created yet</h2>
  }

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Your Recipes Created</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-orange-600">
            <tr>
              <th className="px-6 py-3 text-left">Image</th>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Description</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {recipesCreated?.map(recipe => (
              <tr key={recipe._id}>
                <td className="px-6 py-4">
                  <img className="w-40 h-auto" src={recipe.image.url} alt={recipe.title} />
                </td>
                <td className="px-6 py-4">{recipe.title}</td>
                <td className="px-6 py-4">{recipe.description}</td>
                <td className="px-6 py-4">{recipe.category}</td>
                <td className="text-center space-x-2">
                  <button
                    onClick={() => deleteRecipe(recipe._id)}
                    className="p-2 bg-red-100 hover:bg-red-200 rounded-md transition duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 stroke-2 stroke-red-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleEditRecipe(recipe._id)}
                    className="p-2 bg-blue-100 hover:bg-blue-200 rounded-md transition duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 stroke-2 stroke-blue-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ProfileCreated