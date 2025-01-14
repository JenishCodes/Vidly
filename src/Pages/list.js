import React, { useEffect, useRef, useState } from "react";

import MovieCard from "../Components/Card";
import { getWatchListMovies } from "../Services/user";
import "./style.css";

export default function List() {
  const [watchList, setWatchList] = useState([]);
  const [watchListLoading, setWatchListLoading] = useState(true);

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      getWatchListMovies()
        .then(setWatchList)
        .finally(() => setWatchListLoading(false));
    }
  }, []);

  return (
    <div className="list">
      <div className="position-relative d-flex">
        {watchListLoading ? (
          [...Array(5)].map((_, i) => <MovieCard key={i} />)
        ) : watchList?.length > 0 ? (
          watchList.map((m, i) => <MovieCard key={i} movie={m} />)
        ) : (
          <div className="empty-list">
            You haven't added any movies to your watchlist.
          </div>
        )}
      </div>
    </div>
  );
}
