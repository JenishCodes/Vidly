import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context";
import { updateHistory } from "../../Services/user";
import "./style.css";

export default function Movie({ data }) {
  const { user, setUser } = useContext(AuthContext);
  const trailer = useRef();
  const video = useRef();

  return (
    <section>
      <div
        className="slide slick-bg s-bg-1"
        style={{ backgroundImage: `url(${data.backdrop})` }}
      >
        <div className="container position-relative h-100">
          <div className="slider-inner h-100">
            <div className="row">
              <h1 className="slider-text big-title title mb-4 text-uppercase">
                {data.title}
              </h1>
              <div className="col-xl-7 col-lg-8 col-md-9 col-sm-10 col-12">
                <div className="d-flex justify-content-between align-items-center">
                  {data.score ? (
                    <div className="text-primary">
                      <h4 className="tool-tip-text">
                        {Math.round(data.score * 100)}%
                      </h4>
                    </div>
                  ) : null}
                  <div className="d-flex">
                    <i className="fa fa-star me-1"></i>
                    <h5>{data.rating}</h5>
                  </div>
                  <div>
                    <h5>{data.year}</h5>
                  </div>
                  <div>
                    <h5>{data.duration} min</h5>
                  </div>
                </div>
                <p className="text-body">{data.description}</p>
                <div className="d-flex">
                  <h5 className="text-primary mb-2 d-flex fw-bold">
                    Director:
                  </h5>
                  <h6 className="text-body ms-2">{data.director}</h6>
                </div>
                <div className="d-flex">
                  <h5 className="text-primary mb-2 d-flex fw-bold">
                    Starring:
                  </h5>
                  <h6 className="text-body ms-2">{data.cast}</h6>
                </div>
                <div className="d-flex">
                  <h5 className="text-primary mb-2 d-flex fw-bold">Genres:</h5>
                  <h6 className="text-body ms-2">{data.genres}</h6>
                </div>
                <div
                  className="d-flex align-items-center r-mb-23 mt-4"
                  data-animation-in="fadeInUp"
                  data-delay-in="1.2"
                >
                  {data.score ? (
                    <div className="d-flex align-items-center p-0">
                      <Link
                        to={"/movie/" + data.id}
                        className="btn btn-hover me-2"
                        tabIndex="0"
                      >
                        <i className="fa fa-play me-2"></i> Watch Trailer
                      </Link>
                    </div>
                  ) : (
                      <div
                        onClick={() => {
                          if (user) {
                            updateHistory(data.id, user.history)
                              .then((history) => setUser({ ...user, history }))
                              .catch((err) => console.log(err));
                          }
                          trailer.current.style.display = "block";
                        }}
                        className="btn btn-hover iq-button"
                      >
                        <i className="fa fa-play me-3"></i>Play Now
                      </div>
                      
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="con" ref={trailer}>
        <div
          className="close"
          onClick={() => {
            video.current.src = data.trailer;
            trailer.current.style.display = "none";
          }}
        >
          <i className="fa fa-times"></i>
        </div>
        <div className="video">
          <iframe
            ref={video}
            title={data.title}
            src={data.trailer}
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}
