import { useState } from "react";
import { useLocation } from "wouter";

const SearchBar: React.FC = () => {
  const [recipeTitle, setRecipeTitle] = useState<string>("");
  const [_, setLocation] = useLocation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecipeTitle(event.target.value);
  };

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if(!recipeTitle.length) return;
    setLocation(`/search?title=${recipeTitle}`);
  };

  return (
    <div className="w-3/4 h-32 p-6 bg-slate-100">
      <h3 className="pb-2">Search Recipe</h3>
      <form className="w-full flex" onSubmit={onSearch}>
        <input className="w-full p-2 mr-2 outline-none" value={recipeTitle} placeholder="Find something delicious" onChange={handleChange} />
        <button className="px-4 py-2 bg-orange-500" type="submit">
          <span className="text-white">Search</span>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
