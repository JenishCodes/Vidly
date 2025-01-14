import React, { useEffect, useState } from "react";
import MovieCard from "../Components/Card";
import { Divider } from "antd";
import {
  getRelatedMovies,
  searchMovies,
  updateMovieSearchScore,
} from "../Services/movie";
import { useLocation } from "react-router-dom";

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
    <div className="search" style={{ padding: "0 60px" }}>
      <div style={{ marginBottom: "4rem" }}>
        <div>
          <div
            className="flex w-100  align-item-center"
            style={{
              height: "68px",
            }}
          >
            <h1
              className="l-height-1 c-white fw-400"
              style={{
                marginRight: "25px",
                margin: "0px 25px 0px 0px",
              }}
            >
              Search results for "{query}"
            </h1>
          </div>
        </div>
        <div
          className="search-results flex justify-content-between"
          style={{ gap: "2em" }}
        >
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
        <Divider
          className="c-white"
          orientation="center"
          style={{
            borderColor: "rgba(179,179,179,0.2)",
            fontSize: "28px",
          }}
        >
          Movies related to "{query}"
        </Divider>
        <div
          className="search-recommendations flex flex-wrap w-100 justify-content-between"
          style={{
            gap: "2.5em",
          }}
        >
          {relatedMovies?.length > 0
            ? relatedMovies.map((m, i) => <MovieCard key={i} movie={m} />)
            : [...Array(5)].map((_, i) => <MovieCard key={i} />)}
        </div>
      </div>
    </div>
  );
}
