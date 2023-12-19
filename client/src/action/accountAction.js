import axios from "axios";
import { message } from "antd";
import {
  auth,
  googleprovider,
} from "../components/Firebase/firebase.initialize";
import { signInWithPopup, signOut } from "firebase/auth";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

//Login
export const handleLogin = async (userData) => {
  try {
    const result = await axios.post(
      "http://127.0.0.1:8000/api/login",
      userData
    );

    if (result.data.success === true) {
      message.success("Login successful!");
      localStorage.setItem("accessToken", result.data.accessToken);
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
      "http://127.0.0.1:8000/api/register",
      userData
    );
    if (result.data.success == true) {
      message.success("Register successful!");
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
      "http://127.0.0.1:8000/api/resetPassword",
      userData
    );
    if (result.data.success == true) {
      message.success("Reset password successful!");
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
  try {
    const result = await signInWithPopup(auth, googleprovider);

    const { displayName, email, metadata, photoURL } = result.user;
    const loggedInUser = {
      name: displayName,
      email: email,
      image: photoURL,
      lastLoginTime: metadata.lastSignInTime,
    };
    localStorage.setItem("google-user", JSON.stringify(loggedInUser));

    return true;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error);
    // The email of the user's account used.
    const errorCollection = {
      errorCode,
      errorMessage,
    };
    // eslint-disable-next-line no-undef
    setError(errorCollection);
  }
  return false;
};

// Get user
export const handleGetUser = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    const result = await axios.get("http://127.0.0.1:8000/users/profile", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    if (result.data.success === true) {
      return result.data.user;
    } else {
      message.error(result.data.error);
    }
  } catch (err) {
    console.log(err);
  }
  return false;
};

export const handleLogout = () => {
  signOut(auth)
    .then(() => {
      // clear data from UI
      message.success("logout successful!");
    })
    .catch((error) => console.log(error));

  // clear data from localStorage
  let getGoogleUser = localStorage.getItem("google-user");

  if (getGoogleUser) {
    localStorage.removeItem("google-user");
  }
};

export function checkAuth() {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken;
}
