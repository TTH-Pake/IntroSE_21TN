import axios from "axios";

// login with google
export const handleLoginWithGoogle = async () => {
  window.open("http://127.0.0.1:8000/oauth/google", "_self");
  const result = await axios
    .get("http://127.0.0.1:8000/oauth/login/success", {
      withCredentials: true,
    })
    .then((res) => {
      console.log("res: ", res);
    })
    .catch((err) => {
      console.log(err);
    });

  console.log("result login google: ", result);
};
