import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { Divider, Modal, notification, Skeleton } from "antd";
import MovieCard from "../Card";
import {
  CaretRightOutlined,
  CheckOutlined,
  PlusOutlined,
  StarFilled,
} from "@ant-design/icons";
import { getSimilarMovies } from "../../Services/movie";
import { updateWatchList } from "../../Services/user";
import { MovieContext } from "../../ProtectedRoute";

export default function MovieModal({ movie, setMovie }) {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [similarMovies, setSimilarMovies] = useState([]);

  const { updateCurrentPlaying } = useContext(MovieContext);

  const handleUpdateWatchlist = () => {
    updateWatchList(movie.id)
      .then(() => setIsInWatchlist(!isInWatchlist))
      .catch((err) =>
        notification.error({
          message: err.message,
        })
      );
  };

  useEffect(() => {    
    setSimilarMovies([]);
    if (!movie) return;

    getSimilarMovies(movie.id, 6).then(setSimilarMovies);

    setIsInWatchlist(movie?.is_in_watchlist);
  }, [movie]);

  return movie ? (
    <div className="modal">
      <Modal
        className="modal-content"
        open={movie !== null}
        onCancel={() => setMovie(null)}
        footer={<div />}
        width={"850px"}
        cancelButtonProps={{ className: "cancle-btn" }}
      >
        <div className="position-relative">
          <div className="img-wrapper">
            <img className="modal-img w-100" alt="Movie Backdrop" src={movie.backdrop} />
          </div>
          <div className="img-overlay">
            <div className="img-detail">
              <div className="modal-title-container">
                <h1 className="modal-title m-0 c-white">{movie.title}</h1>
              </div>
              <div className="img-btns">
                <button
                  className="modal-play-btn flex justify-content-between align-item-center b-none c-pointer"
                  onClick={() =>
                    updateCurrentPlaying(movie.id, movie.title, movie.trailer)
                  }
                >
                  <CaretRightOutlined className="modal-play-btn-icon" />
                  <span>Play</span>
                </button>
                <button className="modal-watchlist-btn b-round bg-transparent c-pointer b-none">
                  {isInWatchlist ? (
                    <CheckOutlined
                      onClick={handleUpdateWatchlist}
                      className="modal-watchlist-btn-icon b-round c-white"
                    />
                  ) : (
                    <PlusOutlined
                      onClick={handleUpdateWatchlist}
                      className="modal-watchlist-btn-icon b-round c-white"
                    />
                  )}
                </button>
              </div>
              <div className="modal-space" />
            </div>
          </div>
        </div>
        <div className="modal-detail-container">
          <div className="modal-details flex">
            <div className="w-65">
              <div className="modal-vals flex align-item-center">
                <div className="modal-val flex align-item-center">
                  <StarFilled />
                  <span className="card-rating-val">{movie.rating}</span>
                </div>
                <span className="modal-val">{movie.year}</span>
                <span className="modal-val">
                  {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                </span>
                <button className="modal-imdb modal-val fw-500 b-none c-pointer">
                  <a
                    className="modal-imdb-link td-none c-black"
                    href={movie.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Imdb
                  </a>
                </button>
              </div>
              <p className="modal-desc c-white">{movie.description}</p>
            </div>
            <div className="w-35">
              <div className="modal-property">
                Director: <span className="c-white">{movie.director}</span>
              </div>
              <div className="modal-property">
                Cast: <span className="c-white">{movie.cast.join(", ")}</span>
              </div>
              <div className="modal-property">
                Genres:{" "}
                <span className="c-white">{movie.genres.join(" | ")}</span>
              </div>
            </div>
          </div>
          <Divider
            className="divider c-white modal-divider"
            orientation="center"
          >
            More Like This
          </Divider>

          <div className="modal-similar">
            <div className="modal-similar-grid flex flex-wrap justify-content-between">
              {similarMovies?.length > 0
                ? similarMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))
                : [true, true, true].map((_, i) => (
                    <Skeleton.Node key={i} className="card-skeleton" active />
                  ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  ) : (
    <></>
  );
}
