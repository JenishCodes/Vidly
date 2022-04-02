import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Card from "../Components/Card/index";
import Loader from "../Components/Loader";
import { getMovieRecommendations } from "../Services/movie";

export default function Keyword() {
  const [similarMovies, setSimilarMovies] = useState(null);
  const [loading, setLoading] = useState(true);
  const { search } = useLocation();

  useEffect(() => {
    const searchWords = search.replace("?words=", "");

    getMovieRecommendations("keywords", searchWords.toLowerCase())
      .then((data) => setSimilarMovies(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [search]);

  return loading ? (
    <Loader blur={false} />
  ) : (
    <div className="container">
      <h2 className="mt-4">Keywords Related Movies</h2>
      <hr />
      <div className="d-flex flex-wrap justify-content-around">
        {similarMovies ? (
          similarMovies.map((data) => (
            <Card data={data} key={data.id} show={true} />
          ))
        ) : (
          <h6 className="mt-5">No Related Movies</h6>
        )}
      </div>
    </div>
  );
}
