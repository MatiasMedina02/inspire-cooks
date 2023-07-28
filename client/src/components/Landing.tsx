import FondoLanding from "../assets/fondo-landing.jpg";
import SearchBar from "./SearchBar";

const Landing = () => {
  return (
    <div className="w-full h-[600px] bg-gradient-to-b from-10% from-slate-200 to-orange-100 flex items-center justify-between p-20">
      <div className="w-2/3 flex flex-col relative z-10">
        <div className="w-full">
				<h1 className="text-red-600 text-7xl">Good Food,</h1>
        <h1 className="text-red-600 text-7xl">Good Life</h1>
				</div>
				<h2 className="pt-2 pb-6">Helping you cook a variety of dishes from all over the world</h2>
				<SearchBar />
      </div>
        <img className="w-[550px] h-[550px] rounded-full absolute right-6 -bottom-6" src={FondoLanding} alt="Fondo Landing" />
    </div>
  );
};

export default Landing;
