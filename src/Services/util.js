import { signOut } from "./auth";

const API_URL = process.env.REACT_APP_API_URL;

export const callApi = async (route, method, body = null) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const request = {
    method,
    headers,
    body: body && JSON.stringify(body),
  };

  const res = await fetch(API_URL + route, request);

  if (!res.ok && res.status === 401) signOut();

  return await res.json();
};
