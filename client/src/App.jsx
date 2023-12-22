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


// const HandleLoginStatus = ({ children, cookies }) => {
//   const [user, setUser] = useState(null);
//   const [accessToken, setAccessToken] = useState(null);
//   const location = useLocation();

//   useEffect(() => {
//     const fetchAccount = async () => {
//       const accessToken = cookies.accessToken;
//       console.log("accessToken", accessToken);
//       if (!accessToken) {
//         return;
//       }
//       setAccessToken(accessToken);
//     };
//     fetchAccount();
//   }, [location]); // Add location to the dependency array

//   return (
//     <AccessTokenContext.Provider value={accessToken}>
//       {children}
//     </AccessTokenContext.Provider>
//   );
// };

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
              <Route path="create-recipe" element={<CreateRecipe />} />
              <Route path="login" element={<Login />} />
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
