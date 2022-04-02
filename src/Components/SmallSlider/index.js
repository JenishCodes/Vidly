import React from "react";
import { Link } from "react-router-dom";
import Slick from "react-slick";
import Card from "../Card";
import "./style.css";

export default function SmallSlider({ movies, title, url }) {
  return movies ? (
    <div className="main-content container">
      <section id="iq-favorites">
        <div className="row">
          <div className="col-sm-12 overflow-hidden">
            <div
              className="
                  iq-main-header
                  d-flex
                  align-items-center
                  justify-content-between
                "
            >
              <div className="bar"></div>
              <h4 className="main-title flex-grow-1 mt-2">
                {title}
              </h4>
              {url ? (
                <Link to={url} className="iq-view-all">
                  View All
                </Link>
              ) : null}
            </div>
            <div className="favorite-contens">
              <Slick
                dots={false}
                arrow={true}
                infinite={false}
                speed={300}
                autoplay={false}
                slidesToShow={5}
                slidesToScroll={1}
                className="favorites-slider list-inline row p-0 mb-0"
                nextArrow={
                  <div className="slick-arrow slick-next pointer">
                    <i className="fa fa-chevron-right"></i>
                  </div>
                }
                prevArrow={
                  <div className="slick-arrow slick-prev pointer">
                    <i className="fa fa-chevron-left"></i>
                  </div>
                }
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
                      <div id={movie.id} key={movie.id}>
                        <Card show={false} data={movie} />
                      </div>
                    ))
                  : null}
              </Slick>
            </div>
          </div>
        </div>
      </section>
    </div>
  ) : null;
}
