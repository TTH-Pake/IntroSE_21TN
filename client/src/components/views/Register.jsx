import { useContext, useState } from "react";
import { handleRegister } from "../../action/accountAction";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/logo-recipe.png";
import { message } from "antd";
import { useCookies } from "react-cookie";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  const navigate = useNavigate();
  const location = useLocation();
  if (cookies.accessToken) {
    navigate(location.state?.from || "/home");
  }
  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name: name,
      email: email,
      password: password,
    };
    if (email === "" || password === "" || name === "") {
      message.warning("Please fill all the fields!");
      return;
    }

    if (password.length < 6) {
      message.warning("Password must be at least 6 characters!");
      return;
    }

    if (handleRegister(userData)) {
      navigate("/login");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-green-400">
      <div className="login-container flex relative flex-col items-center justify-around w-[500px] h-auto p-4 bg-green-300 rounded-3xl">
        <img
          className="w-24 h-24 rounded-full object-cover"
          src={Logo}
          alt="Logo"
        />
        <div className="login-form w-[350px] py-1">
          <form
            className="flex flex-col justify-around w-full"
            onSubmit={onSubmit}
          >
            <div className="bg-green-300 text-black text-lg font-semibold text-left p-2 px-4 my-1 mx-auto w-[max-content]">
              User name
            </div>
            <input
              type="text"
              name="ten nguoi dung"
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="border px-3 py-2 rounded-5 focus:outline-none focus:ring-2 focus:ring-cyan-300 w-[100%] bg-white text-center"
              placeholder="Insert here..."
            />
            <div className="bg-green-300 text-black text-lg font-semibold text-left p-2 px-4 my-1 mx-auto w-[max-content]">
              Your email
            </div>
            <input
              type="text"
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="border px-3 py-2 rounded-5 focus:outline-none focus:ring-2 focus:ring-cyan-300 w-[100%] bg-white text-center"
              placeholder="Insert here..."
            />
            <div className="bg-green-300 text-black text-lg font-semibold text-left p-2 px-4 my-1 mx-auto w-[max-content]">
              Password
            </div>
            <input
              type="password"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="border px-3 py-2 rounded-5 focus:outline-none focus:ring-2 focus:ring-cyan-300 w-full text-center"
              placeholder="Insert here..."
            />
            <button className="btn w-[50%] py-2 rounded-full mt-4 text-black text-base text-center cursor-pointer mx-auto bg-red-400 hover:bg-red-500 hover:font-semibold hover:shadow-lg transition duration-300">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
