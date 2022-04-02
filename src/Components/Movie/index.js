import React, { useContext, useRef } from "react";
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
            <div className="row flex-column-reverse flex-md-row ">
              <div className="col-xl-6 col-lg-6 col-md-7">
                <h1 className="slider-text big-title title text-uppercase">
                  {data.title}
                </h1>
                <div className="d-flex justify-content-between">
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
