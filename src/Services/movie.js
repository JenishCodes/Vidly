import { callApi } from "./util";

const movieApi = process.env.REACT_APP_API_URL + "/movie";

export async function getMovie(id) {
  const data = await callApi(movieApi + "/" + id, "GET");

  return data.movie;
}

export async function getSimilarMovies(movieId, count) {
  const data = await callApi(
    movieApi + "/similar/" + movieId + "?limit=" + count,
    "GET"
  );

  return data.movies;
}

export async function getTrendingMovies(count = 10) {
  const data = await callApi(movieApi + "/trending?limit=" + count, "GET");

  return data.movies;
}

export async function searchMovies(query, count = 10) {
  const data = await callApi(
    movieApi + "/search?query=" + query + "&limit=" + count,
    "GET"
  );

  return data.movies;
}

export async function getRelatedMovies(words, count = 10) {
  if (words.length < 3) return [];

  const data = await callApi(
    movieApi +
      "/similar/search?query=" +
      words.replaceAll(" ", ",") +
      "&limit=" +
      count,
    "GET"
  );

  return data.movies;
}

export async function updateMovieSearchScore(movieId, query) {
  const data = await callApi(movieApi + "/search/increment", "POST", {
    movie_id: movieId,
    query,
  });

  return data.message;
}
