import React from "react";
import { Carousel, Skeleton } from "antd";
import MovieCard from "../Card";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import "./style.css";

export default function Slide({ title, movies }) {
  return (
    movies?.length > 0 && (
      <div className="slider">
        <h2 className="slider-title c-white">{title}</h2>
        <Carousel
          className="h-100"
          slidesPerRow={5}
          adaptiveHeight
          centerMode
          draggable
          arrows
          dots={{ className: "dots" }}
          dotPosition="bottom"
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
        >
          {movies?.length > 0
            ? movies.map((m, i) => (
                <div className="slide" key={i}>
                  <MovieCard movie={m} />
                </div>
              ))
            : [...Array(5)].map((_, i) => (
                <div className="slide" key={i}>
                  <MovieCard />
                </div>
              ))}
        </Carousel>
      </div>
    )
  );
}
