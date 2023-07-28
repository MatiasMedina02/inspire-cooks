import Landing from "../components/Landing";
import Recipes from "../components/Recipes";
import { ToastContainer } from "react-toastify"

const Home: React.FC = () => {

	return (
		<div className="w-full min-h-screen" id="Home">
			<ToastContainer />
			<Landing />
			<Recipes />
		</div>
	)
}

export default Home