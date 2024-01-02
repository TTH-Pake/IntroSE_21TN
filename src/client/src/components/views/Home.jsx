/* eslint-disable no-unused-vars */
import HeroSection from "../modules/HeroSection";
import NavBar from "../modules/Navbar";
import Footer from "../modules/Footer";
import Chat from "./Chat";
import RecommendedRecipes from "../modules/RecommendedRecipes";
import RecipeRanking from "../modules/RecipeRanking";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
const Home = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);

  const ButtonGroup = () => {
    return (
      <div className="button-group flex flex-rows items-center justify-between w-full p-4 space-x-20">
        <Link
          to="/create-recipe"
          className="btn w-1/4 bg-green-500 hover:bg-green-300 px-4 py-2.5 rounded-full font-medium"
        >
          Post Recipe
        </Link>
        <button
          onClick={() => {
            /* Logic for "Tổ chức bữa ăn" */
          }}
          className="btn w-1/4 bg-green-500 hover:bg-green-300 px-4 py-2.5 rounded-full font-medium"
        >
          Organize meals
        </button>
        <button
          onClick={() => {}}
          className="btn w-1/4 bg-green-500 hover:bg-green-300 px-4 py-2.5 rounded-full font-medium"
        >
          Tip and tricks
        </button>

        <Link
          to="/blog"
          className="btn w-1/4 bg-green-500 hover:bg-green-300 px-4 py-2.5 rounded-full font-medium"
        >
          Blog
        </Link>
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
