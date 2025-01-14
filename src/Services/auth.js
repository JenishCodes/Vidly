import { callApi } from "./util";

const AUTH_ROUTE = "/auth";

export async function signIn(email, password) {
  const body = { email, password };

  const data = await callApi(AUTH_ROUTE + "/signin", "POST", body);

  if (data?.error) throw new Error(data.error);

  localStorage.setItem("token", data.token);
}

export function signOut() {
  localStorage.removeItem("token");
}

export async function signUp(name, email, password) {
  const body = { name, email, password };

  const data = await callApi(AUTH_ROUTE + "/signup", "POST", body);

  if (data?.error) throw new Error(data.error);

  localStorage.setItem("token", data.token);
}

export async function sendMailOTP(email) {
  const body = { email };

  const data = await callApi(AUTH_ROUTE + "/otp", "POST", body);

  if (data?.error) throw new Error(data.error);
}

export async function changePassword(email, OTP, password) {
  const body = { email, OTP, password };

  const data = await callApi(AUTH_ROUTE + "/password", "POST", body);

  if (data?.error) throw new Error(data.error);
}
