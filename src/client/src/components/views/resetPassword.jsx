import { useState } from "react";
import { handleResetPassword } from "../../action/accountAction";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo-recipe.png";
import { message } from "antd";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
      verifyPassword: verifyPassword,
    };

    if (email === "" || password === "") {
      message.error("Please enter all required fields");
      return;
    }

    if (password.length < 6) {
      message.error("Password must be at least 6 characters");
      return;
    }

    if (password !== userData.verifyPassword) {
      message.error("Password must be match");
      return;
    }

    const user = {
      email: email,
      password: password,
    };

    if (handleResetPassword(user)) {
      navigate("/confirm-otp");
      // navigate("/login");
    }
  };

  return (
    <div className="flex items-center justify-center h-full bg-green-400">
      <div className="login-container flex relative flex-col items-center justify-around w-[500px] h-auto bg-green-300 rounded-3xl p-4">
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
              Email
            </div>
            <input
              type="text"
              name="your email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="border px-3 py-2 rounded-5 focus:outline-none focus:ring-2 focus:ring-cyan-300 w-[100%] bg-white text-center"
              placeholder="type here..."
            />
            <div className="bg-green-300 text-black text-lg font-semibold text-left p-2 px-4 my-1 mx-auto w-[max-content]">
              New Password
            </div>
            <input
              type="password"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="border px-3 py-2 rounded-5 focus:outline-none focus:ring-2 focus:ring-cyan-300 w-[100%] bg-white text-center"
              placeholder="type here..."
            />

            <div className="bg-green-300 text-black text-lg font-semibold text-left p-2 px-4 my-1 mx-auto w-[max-content]">
              Verify Password
            </div>
            <input
              type="password"
              name="password"
              onChange={(e) => {
                setVerifyPassword(e.target.value);
              }}
              className="border px-3 py-2 rounded-5 focus:outline-none focus:ring-2 focus:ring-cyan-300 w-[100%] bg-white text-center"
              placeholder="type here..."
            />
            <button
              className="btn w-[50%] py-2 rounded-full mt-4 text-black text-base text-center cursor-pointer mx-auto bg-red-400 hover:bg-red-500 hover:font-semibold hover:shadow-lg transition duration-300"
              onSubmit={onSubmit}
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
