// const api = process.env.REACT_APP_SERVER_API;
const api = "https://server-vidly.herokuapp.com"

export async function getMovieRecommendations(type, input) {
  try {
    var data;
    if (type === "keywords") {
      data = await fetch(
        api + "/recommendations/keywords?words=" + input
      );
    } else {
      data = await fetch(api + "/recommendations/id?movie_id=" + input);
    }

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

export async function updateMovieScore(id, key) {
  try {
    await fetch(api + "/suggestions", {
      method: "PATCH",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ id, key }),
    });
  } catch (err) {
    console.log(err);
  }
}

export async function getSuggestions(query, count = 5) {
  try {
    const data = await fetch(
      api + "/suggestions?key=" + query + "&count=" + count
    );
    
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

export async function getMovie(id) {
  try {
    const data = await fetch(api + "/movie?id=" + id);

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

export async function getMovies(ids) {
  try {
    const data = await fetch(api + "/movie", {
      method: "PATCH",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ movies: ids }),
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
