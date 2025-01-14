import { callApi } from "./util";

const authApi = process.env.REACT_APP_API_URL + "/auth";

export async function signIn(email, password) {
  const data = await callApi(authApi + "/signin", "POST", { email, password });

  if (data?.error) {
    throw new Error(data.error);
  }

  localStorage.setItem("token", data.token);
}

export function signOut() {
  localStorage.removeItem("token");
}

export async function signUp(name, email, password) {
  const data = await callApi(authApi + "/signup", "POST", {
    name,
    email,
    password,
  });

  if (data?.error) {
    throw new Error(data.error);
  }

  localStorage.setItem("token", data.token);
}
