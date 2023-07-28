import { useLocation } from "wouter"

type imageProps = {
  public_id: string
	url: string
}

type Props = {
	id: string
	title: string
	image: imageProps
}

const RecipeCard: React.FC<Props> = ({ id, title, image }) => {
	const [_, setLocation] = useLocation();

	return (
		<div className="w-60 min-h-[100px] rounded-xl border m-4 flex flex-col justify-between">
			<img className="rounded-t-xl h-40 object-fill" src={image.url} alt={title} />
			<div className="w-full h-full p-2 flex flex-col justify-between">
				<h4 className="pb-2">{title}</h4>
				<button className="w-24 p-2 rounded-xl bg-orange-600" onClick={() => setLocation(`/recipe/${id}`)}>
					<span className="text-black">See recipe</span>
				</button>
			</div>
		</div>
	)
}

export default RecipeCard