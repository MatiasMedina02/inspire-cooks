import { useEffect } from "react";
import Spinner from "../components/Spinner";
import { useGetRecipeByIdQuery } from "../redux/services/recipesApi";
import PageNotFound from "./PageNotFound";

interface Props {
  id: string;
}

const PrintRecipe: React.FC<Props> = ({ id }) => {
  const { data, isLoading, isSuccess, isError } = useGetRecipeByIdQuery(id);
	
	useEffect(() => {
		if(isSuccess && data) {
			window.print();
		}
	}, [isSuccess, data])
	
	if(isLoading) return <Spinner />

	if(isError) return <PageNotFound />

  return (
    <div className="w-full min-h-screen bg-slate-100 absolute z-50">
      {data ? (
        <div className="w-full p-10">
          {/* Description */}
          <div className="bg-slate-200 mt-4 p-4 rounded-lg">
            <h1>{data.title}</h1>
            <div className="flex">
              <h3>
                {data.author.firstName} {data.author.lastName}
              </h3>
              <span>{data.author.email}</span>
            </div>
            <p>{data.description}</p>
          </div>
          <div className="bg-slate-200 mt-4 p-4 rounded-lg flex justify-between">
            <div className="">
              <h3>Prep Time:</h3>
              <span>{data.prepTime} min</span>
            </div>
            <div className="">
              <h3>Cook Time:</h3>
              <span>{data.cookTime} min</span>
            </div>
            <div className="">
              <h3>Servings:</h3>
              <span>{data.servings}</span>
            </div>
          </div>
          <div className="bg-slate-200 mt-4 p-4 rounded-lg">
            <h2 className="uppercase">Ingredients</h2>
            <ul className="list-disc ml-4">
              {data.ingredients.map((ingredient) => (
                <li key={ingredient.id}>
                  <span>{ingredient.type}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-200 mt-4 p-4 rounded-lg">
            <h2 className="uppercase">Instructions</h2>
            {data.instructions.map((instruction, index) => (
              <div className="" key={instruction.order}>
                <h3>Step {index + 1}</h3>
                <p>{instruction.step}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PrintRecipe;
