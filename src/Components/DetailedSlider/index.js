import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slick from "react-slick";
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
                  className="list-inline p-0 mb-0 row align-items-center"
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
                  beforeChange={(curr, next)=>setCurrentMovie(movies[next])}
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
                    {
                      breakpoint: 424,
                      settings: {
                        slidesToShow: 1,
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
                {currentMovie ? (
                  <div className="tranding-block">
                    <div
                      className="tranding-background"
                      style={{
                        backgroundImage: `url(${currentMovie.backdrop})`,
                      }}
                    ></div>
                    <div className="trending-content">
                      <div
                        id="trending-data1"
                        className="overview-tab tab-pane fade active show"
                      >
                        <div className="trending-info align-items-center w-100 animated fadeInUp justify-content-between">
                          <h2 className="trending-text big-title text-uppercase">
                            {currentMovie.title}
                          </h2>
                          <div className="d-flex justify-content-between w-data align-items-center">
                            <div className="text-primary">
                              <h4 className="tool-tip-text">
                                {Math.round(currentMovie.score * 100)}%
                              </h4>
                            </div>
                            <div className="d-flex">
                              <i className="fa fa-star me-1"></i>
                              <h5>{currentMovie.rating}</h5>
                            </div>
                            <div>
                              <h5>{currentMovie.year}</h5>
                            </div>
                            <div>
                              <h5>{currentMovie.duration} min</h5>
                            </div>
                          </div>
                          <p className="trending-dec">
                            {currentMovie.description}
                          </p>
                          <div className="p-btns">
                            <div className="d-flex align-items-center p-0">
                              <Link
                                to={"/movie/" + currentMovie.id}
                                className="btn btn-hover me-2"
                                tabIndex="0"
                              >
                                <i className="fa fa-play me-2"></i> Watch
                                Trailer
                              </Link>
                            </div>
                          </div>
                          <div className="trending-list mt-4">
                            <div className="text-primary title">
                              Director:{" "}
                              <span className="text-body">
                                {currentMovie.director}
                              </span>
                            </div>
                            <div className="text-primary title">
                              Starring:{" "}
                              <span className="text-body">
                                {currentMovie.cast}
                              </span>
                            </div>
                            <div className="text-primary title">
                              Genres:{" "}
                              <span className="text-body">
                                {currentMovie.genres}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
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
