import { useState } from "react";

const SearchBar: React.FC = () => {
	const [isActive, setIsActive] = useState(false);

  return (
    <div className="w-3/4 h-32 p-6 bg-slate-100">
      <h3 className="pb-2">Search Recipe</h3>
      <div className="w-full flex">
        <div className="w-full relative mr-2">
          {!isActive ? (
						<svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            className="w-6 h-6 stroke-black absolute left-1 top-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
					) : null}
          <input className="w-full p-2 outline-none" type="text" onFocus={() => setIsActive(true)} onBlur={() => setIsActive(false)} />
        </div>
        <button className="px-4 py-2 bg-orange-500">
					<span className="text-white">Search</span>
				</button>
      </div>
    </div>
  );
};

export default SearchBar;
