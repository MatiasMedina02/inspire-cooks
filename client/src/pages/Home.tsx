import Landing from "../components/Landing";
import Recipes from "../components/Recipes";

const Home: React.FC = () => {
	return (
		<div className="w-full min-h-screen" id="Home">
			<Landing />
			<Recipes />
		</div>
	)
}

export default Home