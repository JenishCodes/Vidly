import React, { useContext, useEffect, useRef, useState } from "react";
import "./style.css";
import { Carousel, Skeleton } from "antd";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CaretRightOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { MovieContext } from "../../ProtectedRoute";

export default function MovieCarousel({ movies }) {
  const { setMovie, updateCurrentPlaying } = useContext(MovieContext);

  const [currentMovie, setCurrentMovie] = useState(null);

  useEffect(() => {
    if (movies?.length > 0) setCurrentMovie(movies[0]);
    else setCurrentMovie(null);
  }, [movies]);

  return (
    <div className="carousel">
      <div className="side-overlay"></div>
      <div className="bottom-overlay"></div>
      <img className="w-100 h-100" src={currentMovie?.backdrop} />
      <div className="carousel-details">
        {currentMovie ? (
          <div>
            <h1 className="carousel-title">{currentMovie.title}</h1>
            <p className="carousel-desc">{currentMovie.description}</p>
            <div className="carousel-btns flex">
              <button
                className="carousel-btn carousel-play-btn"
                onClick={() =>
                  updateCurrentPlaying(
                    currentMovie.id,
                    currentMovie.title,
                    currentMovie.trailer
                  )
                }
              >
                <CaretRightOutlined className="carousel-play-btn-icon" />
                <span>Play</span>
              </button>
              <button
                className="carousel-btn carousel-info-btn c-pointer"
                onClick={() => setMovie(currentMovie)}
              >
                <InfoCircleOutlined className="carousel-info-btn-icon" />
                <span>More Info</span>
              </button>
            </div>
          </div>
        ) : (
          <Skeleton />
        )}
      </div>
      <Carousel
        className="carousel-slider w-100"
        slidesPerRow={5}
        arrows
        draggable
        centerMode
        nextArrow={
          <div className="arrow">
            <ArrowRightOutlined />
          </div>
        }
        prevArrow={
          <div className="arrow">
            <ArrowLeftOutlined />
          </div>
        }
        dotPosition="top"
        dots={{ className: "dots-top" }}
      >
        {movies?.length > 0
          ? movies.map((m, i) => (
              <div
                key={i}
                className="carousel-slide c-pointer"
                onClick={() => setCurrentMovie(movies[i])}
              >
                <img className="carousel-slide-img" src={m.backdrop} />
              </div>
            ))
          : [true, true, true, true, true].map((_, i) => (
              <Skeleton.Node key={i} className="carousel-slide-skeleton" />
            ))}
      </Carousel>
    </div>
  );
}
