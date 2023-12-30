import { useContext, useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { handleLogin } from "../../action/accountAction";
import { handleLoginWithGoogle } from "../../action/authAction";
// import GoogleLogin from "react-google-login";

import Logo from "../../assets/logo-recipe.png";
import GoogleIcon from "../../assets/google.png";
import FacebookIcon from "../../assets/facebook.png";
import { message } from "antd";
import { useCookies } from "react-cookie";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
  if (cookies.accessToken) {
    navigate(location.state?.from || "/home");
  }
}, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    const userData = {
      email: email,
      password: password,
    };
    if (email === "" || password === "") {
      message.warning("Vui lòng điền đầy đủ thông tin");
      return;
    }
    const userId = await handleLogin(userData, setCookie);
    if (userId) {
      navigate(location.state?.from || "/home");
    } else {
      message.error("Đã xảy ra lỗi");
    }
  };

  const onLoginWithGoogle = async () => {
    const isLoggedIn = await handleLoginWithGoogle();
    if (isLoggedIn) {
      navigate(location.state?.from || "/home");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-green-400">
      <div className="login-container flex relative flex-col items-center justify-around w-[500px] h-[550px] bg-green-300 rounded-3xl">
        <div
          className="login-logo w-24 h-24 rounded-full mb-[-4rem]"
          style={{
            backgroundImage: `url(${Logo})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></div>
        <div className="login-form w-[350px] py-1">
          <form
            className="flex flex-col justify-around w-full"
            onSubmit={onSubmit}
          >
            <div className="bg-green-300 text-black text-lg font-semibold text-left p-2 px-4 my-1 mx-auto w-[max-content]">
              Your Email
            </div>
            <input
              type="text"
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="border py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-300 w-full bg-white text-center"
              placeholder="your email"
            />

            <div className="bg-green-250 text-black text-lg font-semibold text-left p-2 px-2 my-1 mx-auto w-[max-content]">
              Password
            </div>
            <input
              type="password"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="border py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-300 w-full bg-white text-center"
              placeholder="password"
            />

            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  className="ml-1"
                />
                <label
                  htmlFor="rememberMe"
                  className="text-gray-700 text-sm ml-1"
                >
                  Remember me
                </label>
              </div>

              <Link
                to="/reset-password"
                className="text-gray-700 font-semibold text-sm"
              >
                Forgot your password?
              </Link>
            </div>

            <button className="btn w-[50%] py-1.5 rounded-full mt-2.5 text-black text-base text-center cursor-pointer mx-auto bg-red-400 hover:bg-red-500 hover:font-semibold hover:shadow-lg transition duration-300">
              Login
            </button>

            <div className="bg-green-300 text-black text-base font-semibold text-left mt-2 mx-auto w-[max-content]">
              -- or --
            </div>

            <div className="flex justify-center space-x-4">
              <Link
                className="btn w-[50%] py-1.5 rounded-full mt-2 text-black text-base text-center cursor-pointer bg-white hover:font-semibold hover:shadow-lg transition duration-300 flex items-center justify-center"
                onClick={onLoginWithGoogle}
              >
                <img src={GoogleIcon} alt="Google Icon" className="w-6 h-6" />
                <span className="ml-2">Google</span>
              </Link>
              <button className="btn w-[50%] py-1.5 rounded-full mt-2 text-black text-base text-center cursor-pointer bg-white hover:font-semibold hover:shadow-lg transition duration-300 flex items-center justify-center">
                <img
                  src={FacebookIcon}
                  alt="Facebook Icon"
                  className="w-6 h-6"
                />
                <span className="ml-2">Facebook</span>
              </button>
            </div>

            <Link
              to="/register"
              className="text-gray-700 hover:font-bold mt-3 mx-auto"
            >
              Don't have an account? Register
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
