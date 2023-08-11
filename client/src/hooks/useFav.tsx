import { useAddFavRecipeMutation, useRemoveFavRecipeMutation } from "../redux/services/usersApi"
import { login } from "../redux/features/authSlice"
import { useEffect } from "react"
import { useAppDispatch } from "../redux/hooks";

export const useFav = () => {
  const [addFav, { data: userAddFav, isSuccess: isAddFav, reset: resetAddFav }] = useAddFavRecipeMutation();
	const [removeFav, { data: userRemoveFav, isSuccess: isRemoveFav, reset: resetRemoveFav}] = useRemoveFavRecipeMutation();
	const dispatch = useAppDispatch();

  const handleAddFav = async (idRecipe: string, idUser: string) => {
		try {
			await addFav({ idRecipe, idUser });
		} catch (error) {
      console.error(error);
		}
	};

	const handleRemoveFav = async (idRecipe: string, idUser: string) => {
    try {
      await removeFav({ idRecipe, idUser });
		} catch (error) {
      console.error(error);
		}
	};
  
	useEffect(() => {
    if(isRemoveFav){
      dispatch(login({ user: userRemoveFav }));
      resetRemoveFav();
		}
		if (isAddFav) {
      dispatch(login({ user: userAddFav }));
      resetAddFav();
		}
	}, [isAddFav, isRemoveFav]);

  return { handleAddFav, handleRemoveFav };
}