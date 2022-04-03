import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slick from "react-slick";
import Movie from "../Movie";
import "./style.css";

export default function RecommandationSlider(props) {
  const [movies] = useState(props.movies);
  const [currentMovie, setCurrentMovie] = useState(props.movies[0]);

  return movies ? (
    <div className="main-content">
      <section id="iq-trending" className="s-margin">
        <div className="row">
          <div className="col-sm-12 overflow-hidden">
            <div className="iq-main-header d-flex align-items-center justify-content-between mb-3">
              <div className="bar"></div>
              <h4 className="main-title mt-2 flex-grow-1">
                Recommanded For You
              </h4>
              <Link to="/recommandations" className="iq-view-all">
                View All
              </Link>
            </div>
            {movies.length > 0 ? (
              <div className="trending-contens">
                <Slick
                  arrows
                  focusOnSelect
                  dots={false}
                  infinite={false}
                  centerPadding={0}
                  slidesToScroll={1}
                  slidesToShow={5}
                  className="list-inline p-0 mb-4 row align-items-center"
                  prevArrow={
                    <div className="slick-arrow slick-prev pointer">
                      <i className="fa fa-chevron-left"></i>
                    </div>
                  }
                  nextArrow={
                    <div className="slick-arrow slick-next pointer">
                      <i className="fa fa-chevron-right"></i>
                    </div>
                  }
                  beforeChange={(curr, next) => setCurrentMovie(movies[next])}
                  responsive={[
                    {
                      breakpoint: 1200,
                      settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                      },
                    },
                    {
                      breakpoint: 992,
                      settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                      },
                    },
                    {
                      breakpoint: 767,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                      },
                    },
                  ]}
                >
                  {movies
                    ? movies.map((movie) => (
                        <div
                          key={movie.id}
                          className="movie-slick position-relative pointer"
                        >
                          <img
                            src={movie.poster}
                            className="img-fluid m-auto"
                            alt=""
                          />
                        </div>
                      ))
                    : null}
                </Slick>
                {currentMovie ? <Movie data={currentMovie} /> : null}
              </div>
            ) : (
              <div className="text-center text-secondary">
                Start Watching Movies to Get Recommendations
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  ) : null;
}
