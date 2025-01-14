import { signOut } from "./auth";

export const callApi = async (url, method, body = null) => {
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: body && JSON.stringify(body),
  });

  if (!res.ok && res.status === 401) signOut();

  return await res.json();
};

export const getAuthToken = () => localStorage.getItem("token");
