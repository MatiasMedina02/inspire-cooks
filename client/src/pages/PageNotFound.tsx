import { useLocation } from "wouter";
import PageNotFoundImg from "../assets/pageNotFound.png";

const PageNotFound = () => {
	const [_, setLocation] = useLocation()

	return (
		<div className="w-full h-screen p-20 flex flex-col items-center">
				<img className="w-[400px] h-[400px]" src={PageNotFoundImg} alt="Page Not Found Image" />
				<h3>Sorry we couldn't find this page.</h3>
				<p>But dont worry, you can find plenty of other things on our homepage</p>
				<button className="p-2 bg-orange-500" type="button" onClick={() => setLocation("/")}>Home</button>
		</div>
	)
}

export default PageNotFound