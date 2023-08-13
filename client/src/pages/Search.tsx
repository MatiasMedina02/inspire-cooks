import { useState } from "react";
import { useLocation } from "wouter";
import { useSearchRecipeQuery } from "../redux/services/recipesApi";
import RecipeCard from "../components/RecipeCard";
import Spinner from "../components/Spinner";

const Search: React.FC = () => {
  const [recipeTitle, setRecipeTitle] = useState<string>("");
  const [_, setLocation] = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);
  const title = urlSearchParams.get("title");
  const { data, isSuccess, isLoading } = useSearchRecipeQuery(title || "");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecipeTitle(event.target.value);
  };

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if(!recipeTitle.length) return;
    setLocation(`/search?title=${recipeTitle}`);
    setRecipeTitle("");
  };

  return (
    <div className="w-full h-screen flex flex-col items-center pt-20">
      <form className="w-1/3 flex h-12" onSubmit={onSearch}>
        <input className="w-full p-2 mr-2 outline-none bg-slate-100" value={recipeTitle} placeholder="Find something delicious" onChange={handleChange} />
        <button className="px-4 py-2 bg-orange-500" type="submit">
          <span className="text-white">Search</span>
        </button>
      </form>
      {isLoading && <Spinner />}
      {isSuccess ? (
        <div className="w-full p-6 flex flex-col">
          <h2>Search Results</h2>
          {data.map((recipe) => (
            <RecipeCard
              key={recipe.title}
              id={recipe._id}
              title={recipe.title}
              image={recipe.image}
              category={recipe.category}
              totalTime={recipe.totalTime}
            />
          ))}
        </div>
      ) : (
        <div className="">
          <h2>0 results found for your search.</h2>
          <h3>Please try another search term</h3>
        </div>
      )}
    </div>
  )
}

export default Search