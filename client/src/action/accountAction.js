import axios from "axios";
import { message } from "antd";
import {
  auth,
  googleprovider,
} from "../components/Firebase/firebase.initialize";
import { signInWithPopup, signOut } from "firebase/auth";
import { Cookies } from "react-cookie";

//Login
export const handleLogin = async (userData, setCookie) => {
  try {
    const result = await axios.post(
      "http://127.0.0.1:8000/api/login",
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
export const handleLoginWithGoogle1 = async () => {
  window.open("http://127.0.0.1:8000/auth/google", "_self");
  const result = await axios
    .get("http://127.0.0.1:8000/auth/login/success", {
      withCredentials: true,
    })
    .then((res) => {
      console.log("res: ", res);
    })
    .catch((err) => {
      console.log(err);
    });

  console.log("result11: ", result);
};

// try {
//   const result = await axios.get("http://127.0.0.1:8000/auth/login/success", {
//     withCredentials: true,
//   });
//   console.log(result);
// } catch (err) {
//   console.log(err);
// }
// login with google
export const handleLoginWithGoogle = async () => {
  try {
    const data = await signInWithPopup(auth, googleprovider);
    console.log("result user: ", data.user);
    const { displayName, email, metadata, photoURL } = data.user;
    const loggedInUser = {
      name: displayName,
      email: email,
      image: photoURL,
      lastLoginTime: metadata.lastSignInTime,
    };

    const result = await axios.post(
      "http://127.0.0.1:8000/api/google/login",
      loggedInUser
    );

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

export const handleLogout = (removeCookie) => {
  removeCookie("accessToken", { path: "/" });
};

export function checkAuth(accessToken) {
  if (accessToken) {
    return true;
  }
}
