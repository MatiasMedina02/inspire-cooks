import { ChangeEvent, FormEvent, useState } from "react";
import LogoApp from "../assets/logo-app.png";

const Footer = () => {
  const year: number = new Date().getFullYear();
	const [email, setEmail] = useState<string>("");

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	}

	const handleSuscribe = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			console.log(email);
		} catch (error) {
			console.error(error);
		}
	}

  return (
    <div className="w-full h-full">
      <div className="w-full flex p-4 border-b">
        <div className="w-1/6">
          <img className="w-40 pr-6" src={LogoApp} alt="Logo App" />
        </div>
        <div className="w-full flex flex-col">
          <h3>About Us</h3>
          <p>
            Inspire Cooks is your gateway to a delightful gastronomic
            experience, where you can explore, learn, and share your culinary
            discoveries with a passionate community of food enthusiasts. Embrace
            the world of flavors and culinary creativity with Inspire Cooks
            today!
          </p>
        </div>
        <div className="w-1/3">
          <h3>Ready to cook?</h3>
          <p>Sign up for our weekly newsletters!</p>
          <form onSubmit={handleSuscribe}>
            <input
              className="p-2 border"
              type="email"
              placeholder="Enter your email"
							onChange={handleChange}
            />
            <button className="p-2 bg-orange-500" type="submit">
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <div className="w-full px-10 py-4 flex justify-between">
        <span>&copy; {year} Inspire Cooks. All Rights Reserved</span>
        <div className="flex">
          <span className="px-2 border-r-2 border-black">Privacy Policy</span>
          <span className="px-2 border-r-2 border-black">Terms</span>
          <span className="px-2">Security</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
