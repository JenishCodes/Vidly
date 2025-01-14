import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Divider } from "antd";

import {
  getRelatedMovies,
  searchMovies,
  updateMovieSearchScore,
} from "../Services/movie";
import MovieCard from "../Components/Card";
import "./style.css";

export default function Search() {
  const uri = useLocation();

  const [query, setQuery] = useState("");
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  useEffect(() => {
    setQuery(new URLSearchParams(uri.search).get("q"));
  }, [uri.search]);

  useEffect(() => {
    if (!query) return;

    if (debounceTimeout) clearTimeout(debounceTimeout);

    setDebounceTimeout(
      setTimeout(() => {
        searchMovies(query, 5).then(setFoundMovies);
        getRelatedMovies(query, 10).then(setRelatedMovies);
      }, 1000)
    );
  }, [query]);

  return (
    <div className="search">
      <div>
        <div>
          <div className="search-header d-flex w-100  align-item-center">
            <h1 className="search-title l-height-1 c-white fw-400">
              Search results for "{query}"
            </h1>
          </div>
        </div>
        <div className="search-results d-flex justify-content-between">
          {foundMovies?.length > 0
            ? foundMovies.map((m, i) => (
                <MovieCard
                  key={i}
                  movie={m}
                  onClick={() => updateMovieSearchScore(m.id, query)}
                />
              ))
            : [...Array(5)].map((_, i) => <MovieCard key={i} />)}
        </div>
      </div>

      <div>
        <Divider className="c-white divider" orientation="center">
          Movies related to "{query}"
        </Divider>
        <div className="search-recommendations d-flex flex-wrap w-100 justify-content-between">
          {relatedMovies?.length > 0
            ? relatedMovies.map((m, i) => <MovieCard key={i} movie={m} />)
            : [...Array(5)].map((_, i) => <MovieCard key={i} />)}
        </div>
      </div>
    </div>
  );
}
