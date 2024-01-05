import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import AboutUs from "./components/views/AboutUs";
import Blog from "./components/views/Blog";
import Login from "./components/views/Login";
import Home from "./components/views/Home";
import Register from "./components/views/Register";
import Profile from "./components/views/Profile";
import ResetPassword from "./components/views/resetPassword";
import Others from "./components/views/Others";
import RecipeDetail from "./components/views/RecipeDetail";
import Search from "./components/views/search";
import Admin from "./components/views/Admin";
import FeedBack from "./components/views/FeedBack";
import RecipeManager from "./components/views/RecipeManager";
import { useEffect, useState } from "react";
import { handleGetCurrentUser } from "./action/userAction";
import CreateRecipe from "./components/views/CreateRecipe";
import { CookiesProvider, useCookies } from "react-cookie";
import NoPage from "./components/views/NoPage";
import BlogManager from "./components/views/BlogManager";
import UpdateRecipe from "./components/views/EditRecipe";
import FavouriteRecipes from "./components/views/Favourites";
import OtpAuth from "./components/views/OTPConfirm";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  return (
    <div className="h-screen w-screen overflow-auto">
      <CookiesProvider>
        <BrowserRouter>
          {/* <HandleLoginStatus cookies={cookies}> */}
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/home/:token" element={<NoPage />} />
              <Route path="create-recipe" element={<CreateRecipe />} />
              <Route path="/edit-recipe/:recipeid" element={<UpdateRecipe />} />
              <Route path="login" element={<Login />} />
              <Route path="confirm-otp" element={<OtpAuth />} />
              <Route path="register" element={<Register />} />
              <Route path="about-us" element={<AboutUs />} />
              <Route path="blog" element={<Blog />} />
              <Route path="reset-password" element={<ResetPassword />} />
              <Route path="users/profile" element={<Profile />} />
              <Route path="others" element={<Others />} />
              <Route path="recipes/:recipeId" element={<RecipeDetail />} />
              <Route path="recipes/" element={<RecipeDetail />} />
              <Route path="details" element={<RecipeDetail />} />
              <Route path="search" element={<Search />} />
              <Route path="users/admin" element={<Admin />} />
              <Route path="users/recipe-manager" element={<RecipeManager />} />
              <Route path="/feedback" element={<FeedBack />} />
              <Route path="users/blogManager" element={<BlogManager />} />
              <Route path="users/favourites" element={<FavouriteRecipes />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
          {/* </HandleLoginStatus> */}
        </BrowserRouter>
      </CookiesProvider>
    </div>
  );
}
export default App;
