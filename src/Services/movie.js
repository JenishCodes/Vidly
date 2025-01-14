import { callApi } from "./util";

const MOVIE_ROUTE = "/movie";

export async function getMovie(id) {
  const data = await callApi(MOVIE_ROUTE + "/" + id, "GET");

  return data.movie;
}

export async function getSimilarMovies(movieId, count) {
  const route = `${MOVIE_ROUTE}/similar/${movieId}?limit=${count}`;
  const data = await callApi(route, "GET");

  return data.movies;
}

export async function getTrendingMovies(count = 10) {
  const route = `${MOVIE_ROUTE}/trending?limit=${count}`;
  const data = await callApi(route, "GET");

  return data.movies;
}

export async function searchMovies(query, count = 10) {
  const route = `${MOVIE_ROUTE}/search?query=${query}&limit=${count}`;
  const data = await callApi(route, "GET");

  return data.movies;
}

export async function getRelatedMovies(words, count = 10) {
  if (words.length < 3) return [];

  words = words.replaceAll(" ", ",");

  const route = `${MOVIE_ROUTE}/similar/search?query=${words}&limit=${count}`;
  const data = await callApi(route, "GET");

  return data.movies;
}

export async function updateMovieSearchScore(movieId, query) {
  const body = { movie_id: movieId, query };
  const data = await callApi(MOVIE_ROUTE + "/search/increment", "POST", body);

  return data.message;
}
