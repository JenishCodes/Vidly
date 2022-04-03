import { store, auth } from "./firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

// const api = process.env.REACT_APP_SERVER_API;
const api = "https://server-vidly.herokuapp.com"

export async function updateHistory(id, history) {
  try {
    const userDoc = doc(store, "users", auth.currentUser.uid);

    var newHistory = history.filter((h) => h !== id);

    newHistory.push(id);

    await updateDoc(userDoc, { history: newHistory });

    return newHistory;
  } catch (e) {
    console.log(e);
  }
}

export async function getHistory(uid) {
  try {
    const userDoc = doc(store, "users", uid);

    const res = await getDoc(userDoc);

    const user = res.data();

    return user ? user["history"] : [];
  } catch (err) {
    console.log(err);
  }
}

export async function getUserInterest(history) {
  try {
    const data = await fetch(api + "/user/interest", {
      method: "PATCH",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ history }),
    });

    const res = await data.json();

    if (res.success) {
      return res.data;
    } else {
      throw new Error(res.error);
    }
  } catch (err) {
    console.log(err);
  }
}
