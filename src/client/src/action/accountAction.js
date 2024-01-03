import axios from "axios";
import { message } from "antd";

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
      message.success(result.data.message);
      return true;
    } else {
      message.error(result.data.error);
    }
  } catch (err) {
    console.log(err);
  }
  return false;
};

export const handleSubmitOTP = async (data) => {
  try {
    const result = await axios.post(
      "http://127.0.0.1:8000/account/register/verify",
      data
    );
    if (result.data.success == true) {
      message.success(result.data.message);
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

// login with google
export const handleLoginWithGoogle = async () => {
  window.open("http://127.0.0.1:8000/google", "_self");
  // const result = await axios
  //   .get("http://127.0.0.1:8000//auth/google/callback", {
  //     withCredentials: true,
  //   })
  //   .then((res) => {
  //     console.log("yes");
  //     console.log(res);
  //     return true;
  //   })
  //   .catch((err) => {
  //     console.log("no");
  //     console.log(err);
  //   });
};

export const handleLogout = (removeCookie) => {
  removeCookie("accessToken", { path: "/" });
};
