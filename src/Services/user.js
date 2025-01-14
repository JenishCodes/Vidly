import { callApi } from "./util";

const USER_ROUTE = "/user";

export async function getUserInfo() {
  const data = await callApi(USER_ROUTE + "/me", "GET");

  return data.user;
}

export async function getRecommendedMovies() {
  const data = await callApi(USER_ROUTE + "/recommended", "GET");

  return data.movies;
}

export async function getWatchAgainMovies() {
  const data = await callApi(USER_ROUTE + "/history", "GET");

  if (data.error) throw new Error(data.error);

  return data.movies;
}

export async function clearWatchHistory() {
  const data = await callApi(USER_ROUTE + "/history", "PUT");

  return data.message;
}

export async function getWatchListMovies() {
  const data = await callApi(USER_ROUTE + "/watchlist", "GET");

  return data.movies;
}

export async function markMovieWatched(movieId) {
  const data = await callApi(USER_ROUTE + "/watch/" + movieId, "POST");

  return data.message;
}

export async function updateWatchList(movieId) {
  const data = await callApi(USER_ROUTE + "/watchlist/" + movieId, "POST");

  if (data.error) throw new Error(data.error);

  return data;
}
