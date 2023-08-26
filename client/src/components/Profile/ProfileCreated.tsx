import { useAppSelector } from "../../redux/hooks";
import { useDeleteRecipeMutation, useGetAllRecipesCreatedQuery } from "../../redux/services/recipesApi";

const ProfileCreated: React.FC = () => {
  const userData = useAppSelector((state) => state.persistedReducer.user.userData);
  const { data: recipesCreated } = useGetAllRecipesCreatedQuery(userData?.user?._id);
  const [deleteRecipe, response] = useDeleteRecipeMutation();
  console.log(response);
  

  const handleEditRecipe = (idRecipe: string) => {

  }

  if(!recipesCreated?.length){
    return <h2 className="text-center">There are no recipes created yet</h2>
  }

  return (
    <div>
      <h2>Your Recipes Created</h2>
      {recipesCreated?.map(recipe => (
        <div className="" key={recipe._id}>
          <img className="w-40" src={recipe.image.url} alt={recipe.title} />
          <h3>{recipe.title}</h3>
          <button onClick={() => deleteRecipe(recipe._id)}>Delete</button>
          <button onClick={() => handleEditRecipe(recipe._id)}>Edit</button>
        </div>
      ))}
    </div>
  )
}

export default ProfileCreated