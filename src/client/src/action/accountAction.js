import axios from "axios";
import { message } from "antd";

//Login
export const handleLogin = async (userData, setCookie) => {
  try {
    const result = await axios.post(
      "http://127.0.0.1:8000/account/login",
      userData
    );

    if (result.data.success === true) {
      message.success("Login successful!");
      setCookie("accessToken", result.data.accessToken, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // Expires after 1week
        sameSite: true,
      });

      return result.data.accessToken;
    } else {
      message.error(result.data.error);
    }
  } catch (err) {
    console.log(err);
  }
};

//Register
export const handleRegister = async (userData) => {
  try {
    const result = await axios.post(
      "http://127.0.0.1:8000/account/register",
      userData
    );
    if (result.data.success == true) {
      message.success("Please check your email!");
      return true;
    } else {
      message.error(result.data.error);
    }
  } catch (err) {
    console.log(err);
  }
  return false;
};

//Reset Password
export const handleResetPassword = async (userData) => {
  try {
    const result = await axios.put(
      "http://127.0.0.1:8000/account/resetPassword",
      userData
    );
    if (result.data.success == true) {
      message.success("Please check your email!");
      return true;
    } else {
      message.error(result.data.error);
    }
  } catch (err) {
    console.log(err);
  }
  return false;
};


export const handleLoginWithGoogle = async () => {
  const respone = await axios.get("http://127.0.0.1:8000/auth/google");
  console.log(respone.data);

  // Wait for user to complete Google login before making GET request
  window.addEventListener('focus', handleGetAccessToken, { once: true });
};

export const handleGetAccessToken = async () => {
  try {
    const result = await axios.get("http://127.0.0.1:8000/auth/login/success", {
      withCredentials: true,
    });

    console.log("result",result);
    if(result.data.success === true){
      return result.data.accessToken;
    }
  } catch (error) {
    console.error("Error getting access token:", error);
  }
};

export const handleLogout = (removeCookie) => {
  removeCookie("accessToken", { path: "/" });
};
