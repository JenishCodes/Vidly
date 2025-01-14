import { callApi } from "./util";

const userApi = process.env.REACT_APP_API_URL + "/user";

export async function getUserInfo() {
  const data = await callApi(userApi + "/me", "GET");

  return data.user;
}

export async function getRecommendedMovies() {
  const data = await callApi(userApi + "/recommended", "GET");

  return data.movies;
}

export async function getWatchAgainMovies() {
  const data = await callApi(userApi + "/history", "GET");

  if (data.error) {
    throw new Error(data.error);
  }

  return data.movies;
}

export async function clearWatchHistory() {
  const data = await callApi(userApi + "/history", "PUT");

  return data.message;
}

export async function getWatchListMovies() {
  const data = await callApi(userApi + "/watchlist", "GET");

  return data.movies;
}

export async function markMovieWatched(movieId) {
  const data = await callApi(userApi + "/watch/" + movieId, "POST");

  return data.message;
}

export async function updateWatchList(movieId) {
  const data = await callApi(userApi + "/watchlist/" + movieId, "POST");

  if (data.error) {
    throw new Error(data.error);
  }

  return data;
}
