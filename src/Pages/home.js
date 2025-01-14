import React, { useEffect, useRef, useState } from "react";
import MovieCarousel from "../Components/Carousel";
import Slide from "../Components/Slider";
import { getTrendingMovies } from "../Services/movie";
import { getRecommendedMovies, getWatchAgainMovies } from "../Services/user";

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [watchAgainMovies, setWatchAgainMovies] = useState([]);

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      getTrendingMovies().then(setTrendingMovies);
      getRecommendedMovies().then(setRecommendedMovies);
      getWatchAgainMovies().then(setWatchAgainMovies);
    }
  }, []);

  return (
    <div className="home">
      <MovieCarousel movies={trendingMovies} />
      <Slide title="Recommended For You" movies={recommendedMovies} />
      <Slide title="Watch Again" movies={watchAgainMovies} />
    </div>
  );
}
