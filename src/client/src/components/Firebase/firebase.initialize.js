import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { firebaseConfig } from "./firebase.config";
// import  from "./firebase.config";

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleprovider = new GoogleAuthProvider();
export const facebookprovider = new FacebookAuthProvider();


