import { useAppSelector } from "../../redux/hooks";
import { useGetAllFavoritesQuery } from "../../redux/services/usersApi";
import RecipeCard from "../RecipeCard";

const ProfileSaved: React.FC = () => {
  const userData = useAppSelector((state) => state.persistedReducer.user.userData);
  const { data: favoritesRecipes } = useGetAllFavoritesQuery(userData?.user?._id);

  if (!favoritesRecipes?.length) {
    return <h2 className="text-center">There are no saved recipes yet</h2>
  }

  return (
    <div>
      <h2>Your Saved Recipes</h2>
      <div className="flex">
        {favoritesRecipes?.map(recipe => (
          <RecipeCard
            id={recipe._id}
            title={recipe.title}
            image={recipe.image}
            category={recipe.category}
            totalTime={recipe.totalTime}
          />
        ))}
      </div>
    </div>
  )
}

export default ProfileSaved