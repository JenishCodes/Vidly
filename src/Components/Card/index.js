import React, { useContext, useEffect, useState } from "react";
import { notification, Skeleton } from "antd";
import {
  CheckOutlined,
  DownOutlined,
  PlayCircleFilled,
  PlusOutlined,
  StarFilled,
} from "@ant-design/icons";

import { MovieContext } from "../../ProtectedRoute";
import { updateWatchList } from "../../Services/user";
import "./style.css";

export default function MovieCard({ movie, onClick }) {
  const { setMovie, updateCurrentPlaying } = useContext(MovieContext);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  const handleUpdateWatchlist = () => {
    updateWatchList(movie.id)
      .then(() => setIsInWatchlist(!isInWatchlist))
      .catch((err) =>
        notification.error({
          message: err.message,
        })
      );
  };

  const handleMoreInfo = () => setMovie(movie);

  const handlePlay = () =>
    updateCurrentPlaying(movie.id, movie.title, movie.trailer);

  const handleClick = (clickAction) => {
    if (onClick) onClick();
    clickAction();
  };

  useEffect(() => setIsInWatchlist(movie?.is_in_watchlist), [movie]);

  return movie ? (
    <div className="card">
      <img className="card-img" alt="Movie Poster" src={movie.poster} />
      <div className="card-bg"></div>
      <div className="card-detail-container">
        <div className="card-detail">
          <div className="card-btns d-flex w-100 justify-content-end">
            <PlayCircleFilled
              className="card-play-btn"
              onClick={() => handleClick(handlePlay)}
            />
            {isInWatchlist ? (
              <CheckOutlined
                onClick={() => handleClick(handleUpdateWatchlist)}
                className="card-watchlist-btn"
              />
            ) : (
              <PlusOutlined
                onClick={() => handleClick(handleUpdateWatchlist)}
                className="card-watchlist-btn"
              />
            )}
            <DownOutlined
              onClick={() => handleClick(handleMoreInfo)}
              className="card-datail-btn"
            />
          </div>
          <div className="card-stats d-flex">
            <span className="card-duration">
              {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
            </span>
            <div className="d-flex">
              <StarFilled />
              <span className="card-rating-val">{movie.rating}</span>
            </div>
          </div>
          <div className="card-genres">
            <span>{movie.genres.join(" | ")}</span>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Skeleton.Node className="slider-slide-skeleton" />
  );
}
