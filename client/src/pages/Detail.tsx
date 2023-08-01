import { ChangeEvent, FormEvent, useState } from "react";
import Spinner from "../components/Spinner";
import { useAppSelector } from "../redux/hooks";
import { useGetRecipeByIdQuery } from "../redux/services/recipesApi";
import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  PinterestShareButton,
  PinterestIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";
import { useLocation } from "wouter";
import { toast, ToastContainer } from "react-toastify";

type Props = {
  id: string;
};

const Detail: React.FC<Props> = ({ id }) => {
  const { data, isLoading, isError } = useGetRecipeByIdQuery(id);
  const userData = useAppSelector(
    (state) => state.persistedReducer.user.userData
  );
  const url = window.location.href;
  const [_, setLocation] = useLocation();
  const [comment, setComment] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!userData) {
        setLocation("/login");
      }
      if (!comment.length) {
        toast.dismiss();
        toast.error("The comment field cannot be empty", {
          autoClose: 3000,
        });
        return;
      }
      console.log(comment);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      {data ? (
        <div className="w-full flex space-x-4 min-h-screen p-20">
          <ToastContainer />
          <div className="w-2/3">
            <img
              className="w-full h-[500px] rounded-lg"
              src={data.image.url}
              alt={data.title}
            />
            {/* Description */}
            <div className="bg-slate-200 mt-4 p-4 rounded-lg">
              <h1>{data.title}</h1>
              <div className="flex">
                <img
                  className="w-8 rounded-full"
                  src={data.author.image.url}
                  alt={data.author.firstName}
                />
                <h3>
                  {data.author.firstName} {data.author.lastName}
                </h3>
                <span>{data.author.email}</span>
              </div>
              <p>{data.description}</p>
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
              {data.instructions.map((instruction) => (
                <div className="" key={instruction.order}>
                  <h3>Step {instruction.order}</h3>
                  <p>{instruction.step}</p>
                </div>
              ))}
            </div>
            <div className="bg-slate-200 mt-4 p-4 rounded-lg">
              <h3 className="uppercase">Comments</h3>
              <form
                className="w-full flex items-center my-2"
                onSubmit={handleSubmit}
              >
                {userData?.user?.image ? (
                  <img
                    className="w-10 rounded-full"
                    src={userData?.user?.image.url}
                    alt={userData?.user?.email}
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="w-7 h-7 stroke-slate-600 stroke-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                    />
                  </svg>
                )}
                <div className="w-full flex items-center relative">
                  <input
                    className="w-full mx-2 p-2 rounded-xl focus:outline-none"
                    placeholder="Add a comment"
                    onChange={handleChange}
                    type="text"
                  />
                  <button className="absolute right-3" type="submit">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className={`w-6 h-6 stroke-slate-500 stroke-1`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Links */}
          <div className="w-1/3 relative">
            <div className="fixed flex flex-col">
              <h2 className="uppercase">Share</h2>
              <div className="flex">
                <WhatsappShareButton title={data.title} url={url}>
                  <WhatsappIcon round={true} size={40} />
                </WhatsappShareButton>
                <FacebookShareButton title={data.title} url={url}>
                  <FacebookIcon round={true} size={40} />
                </FacebookShareButton>
                <LinkedinShareButton title={data.title} url={url}>
                  <LinkedinIcon round={true} size={40} />
                </LinkedinShareButton>
                <PinterestShareButton
                  title={data.title}
                  url={url}
                  media={data.image.url}
                >
                  <PinterestIcon round={true} size={40} />
                </PinterestShareButton>
                <TelegramShareButton title={data.title} url={url}>
                  <TelegramIcon round={true} size={40} />
                </TelegramShareButton>
              </div>
              <button className="mt-2 p-2 rounded-lg bg-orange-500" type="button">
                <span>Save</span>
              </button>
              <button className="mt-2 p-2 rounded-lg bg-orange-500" type="button" onClick={() => window.print()}>
                <span>Print</span>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Detail;