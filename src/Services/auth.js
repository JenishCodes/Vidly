import { auth, store } from "./firebase";
import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  deleteUser,
  sendPasswordResetEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";

export const login = async (email, password) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);

    return {
      uid: user.user.uid,
      email: user.user.email,
      name: user.user.displayName,
    };
  } catch (err) {
    throw err;
  }
};

export async function resetUser() {
  try {
    const userDoc = doc(store, "users", auth.currentUser.uid);

    await updateDoc(userDoc, { history: [] });

    return null;
  } catch (err) {
    console.log(err);
  }
}

export async function resetPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err) {
    throw err;
  }
}

export async function deleteAccount(password) {
  try {
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      password
    );

    await reauthenticateWithCredential(auth.currentUser, credential);

    const userDoc = doc(store, "users", auth.currentUser.uid);

    await deleteDoc(userDoc);

    await deleteUser(auth.currentUser);

    return null;
  } catch (err) {
    console.log(err);
  }
}

export async function registerUser(name, email, password) {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(user.user, { displayName: name });

    const userRef = doc(store, "users", user.user.uid);

    await setDoc(userRef, { history: [] });

    return null;
  } catch (err) {
    throw err;
  }
}

export const logout = async () => {
  try {
    await auth.signOut();
  } catch (err) {
    console.log(err);
  }
};
