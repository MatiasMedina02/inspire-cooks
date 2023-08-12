import { useLocation } from "wouter"
import { useAppSelector } from "../redux/hooks"
import { useFav } from "../hooks/useFav"

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
	const userData = useAppSelector(state => state.persistedReducer.user.userData);
	const isRecipeInFavorites = userData?.user?.favorites.includes(id);
	const { handleAddFav, handleRemoveFav } = useFav();

	const addFav = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		if(!userData?.user?.email){
			setLocation("/login");
			return;
		}
		handleAddFav(id, userData?.user?._id);
	}

	const removeFav = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		handleRemoveFav(id, userData?.user?._id);
	}

	return (
		<div className="w-60 min-h-[100px] rounded-xl border m-4 flex flex-col justify-between cursor-pointer" onClick={() => setLocation(`/recipe/${id}`)}>
			<div className="relative">
				<img className="rounded-t-xl w-full h-40" src={image.url} alt={title} />
				{isRecipeInFavorites ? (
					<button className="absolute top-0 right-0 m-2" type="button" onClick={removeFav}>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 fill-orange-500">
							<path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
						</svg>
					</button>
				) : (
					<button className="absolute top-0 right-0 m-2" type="button" onClick={addFav}>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-8 h-8 stroke-2 stroke-orange-500">
							<path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
						</svg>
					</button>
				)}
			</div>

			<div className="w-full h-full p-2 flex flex-col justify-between">
				<h4 className="pb-2">{title}</h4>
			</div>
		</div>
	)
}

export default RecipeCard