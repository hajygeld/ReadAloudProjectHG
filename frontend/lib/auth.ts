import {
  getAuth,
  setPersistence,
  signInWithPopup,
  browserLocalPersistence,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { app } from "./firebase";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signIn = async () => {
  await setPersistence(auth, browserLocalPersistence);
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  return user;
};

export const signOutFromApp = async () => {
  await signOut(auth);
};
