import HeroSection from "../components/modules/HeroSection";
import NavBar from "../components/modules/Navbar";
import Footer from "../components/modules/Footer";
import Chat from "./Chat";
import RecommendedRecipes from "../components/modules/RecommendedRecipes";
import RecipeRanking from "../components/modules/RecipeRanking";
import { useContext, useEffect, useState } from "react";
import { handleGetUser } from "../action/accountAction";
import Loading from "../components/modules/Loading";
import { UserContext } from "../context/userContext";

const Home = () => {
  const user = useContext(UserContext);

  console.log(user);

  const ButtonGroup = () => {
    return (
      <div className="button-group flex flex-rows items-center justify-between w-full p-4 space-x-20 text-gray-800 ">
        <button
          onClick={() => {
            /* Logic for "Đăng công thức" */
          }}
          className="btn w-1/4 bg-green-500 hover:bg-green-300 px-4 py-2.5 rounded-full"
        >
          Đăng công thức
        </button>
        <button
          onClick={() => {
            /* Logic for "Tổ chức bữa ăn" */
          }}
          className="btn w-1/4 bg-green-500 hover:bg-green-300 px-4 py-2.5 rounded-full"
        >
          Tổ chức bữa ăn
        </button>
        <button
          onClick={() => {
            /* Logic for "Tip và tricks" */
          }}
          className="btn w-1/4 bg-green-500 hover:bg-green-300 px-4 py-2.5 rounded-full"
        >
          Tip và tricks
        </button>
        <button
          onClick={() => {
            /* Logic for "Blog" */
          }}
          className="btn w-1/4 bg-green-500 hover:bg-green-300 px-4 py-2.5 rounded-full"
        >
          Blog
        </button>
      </div>
    );
  };

  return (
    <div className="home-wrapper h-screen overflow-y-auto">
      <NavBar />
      <HeroSection />
      <ButtonGroup />
      <RecommendedRecipes />
      <RecipeRanking />
      <Footer />
      <Chat />
    </div>
  );
};

export default Home;
