import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Movie from "../Components/Movie";
import SmallSlider from "../Components/SmallSlider";
import { getMovie, getMovieRecommendations } from "../Services/movie";
import Loader from "../Components/Loader";

export default function Title() {
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    getMovie(id)
      .then((data) => setMovie(data))
      .then(() =>
        getMovieRecommendations("title", id).then((res) => {
          setSimilarMovies(res);
        })
      )
      .finally(() => setLoading(false));
  }, [id]);

  return loading ? (
    <Loader blur={false} />
  ) : (
    <div>
      {movie ? <Movie data={movie} /> : null}
      {similarMovies ? (
        <SmallSlider movies={similarMovies} title="Similar Movies" />
      ) : null}
    </div>
  );
}
