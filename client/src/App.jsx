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
import RecipeManager from "./components/views/RecipeManager";
import { useEffect, useState } from "react";
import { handleGetUser } from "./action/accountAction";
import { UserContext } from "./context/userContext";
import CreateRecipe from "./components/views/CreateRecipe";
import { CookiesProvider, useCookies } from "react-cookie";

// eslint-disable-next-line react/prop-types
const HandleLoginStatus = ({ children }) => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const [cookies, setCookie] = useCookies(["user"]);

  useEffect(() => {
    const fetchAccount = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        return;
      }
      setUser(await handleGetUser());
    };
    fetchAccount();
  }, [location]); // Add location to the dependency array

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

function App() {
  return (
    <div className="h-screen w-screen overflow-auto">
      <BrowserRouter>
        <HandleLoginStatus>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/home/:username" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about-us" element={<About_us />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
            <Route path="/users/profile" element={<Profile />} />
            <Route path="/others" element={<Others />} />
            <Route path="/recipes/:recipeId" element={<RecipeDetail />} />
            <Route path="/recipes/" element={<RecipeDetail />} />
            <Route path="/details" element={<RecipeDetail />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </HandleLoginStatus>
      </BrowserRouter>
    </div>
  );
}
export default App;
