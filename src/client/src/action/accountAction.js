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

// try {
//   const result = await axios.get("http://127.0.0.1:8000/auth/login/success", {
//     withCredentials: true,
//   });
//   console.log(result);
// } catch (err) {
//   console.log(err);
// }
// login with google
// export const handleLoginWithGoogle = async () => {
//   try {
//     const data = await signInWithPopup(auth, googleprovider);
//     console.log("result user: ", data.user);
//     const { displayName, email, metadata, photoURL } = data.user;
//     const loggedInUser = {
//       name: displayName,
//       email: email,
//       image: photoURL,
//       lastLoginTime: metadata.lastSignInTime,
//     };
// login with google
export const handleLoginWithGoogle = async () => {
  // Open Google OAuth in a new window
  window.open("http://127.0.0.1:8000/auth/google", "_blank","popup=true");

  // Poll your server to check if login is successful
  let result;
  while (!result) {
    try {
      result = await axios.get("http://127.0.0.1:8000/auth/login/success",{
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("result",result);
      if (result.data.success === true) {
        message.success("Login successful!");
        return result.data.accessToken;
      }
    } catch (error) {
      console.error(error);
      // Wait for 2 seconds before trying again
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
};

// export const handleLoginWithGoogle = async () => {
//   try {
//     const data = await signInWithPopup(auth, googleprovider);
//     const { displayName, email, metadata, photoURL } = data.user;
//     const loggedInUser = {
//       name: displayName,
//       email: email,
//       image: photoURL,
//       lastLoginTime: metadata.lastSignInTime,
//     };

//     const result = await axios.post(
//       "http://127.0.0.1:8000/account/google/login",
//       loggedInUser
//     );

//     return true;
//   } catch (error) {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.log(error);
//     // The email of the user's account used.
//     const errorCollection = {
//       errorCode,
//       errorMessage,
//     };
//     // eslint-disable-next-line no-undef
//     setError(errorCollection);
//   }
//   return false;
// };

export const handleLogout = (removeCookie) => {
  removeCookie("accessToken", { path: "/" });
};
