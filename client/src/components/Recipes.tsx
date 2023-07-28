import { useGetAllRecipesQuery } from "../redux/services/recipesApi";
import RecipeCard from "./RecipeCard";
import Spinner from "./Spinner";

const Recipes: React.FC = () => {
	const { data, isError, isLoading } = useGetAllRecipesQuery(null);

  if(isLoading){
    return <Spinner />
  }
  if(isError) return <p>Error</p>
  
  return (
    <div className="w-full min-h-screen pt-20 px-10" id="Recipes">
      <h2 className="text-4xl mb-4">Recipes</h2>
      <div className="flex flex-wrap">
        {data?.map((recipe) => (
          <RecipeCard
            key={recipe.title}
            id={recipe._id}
            title={recipe.title}
            image={recipe.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Recipes;
