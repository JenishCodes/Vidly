import React from "react";
import { Link } from "react-router-dom";
import CircularProgress from "../CircularProgress";
import "./style.css";

export default function Card({ data, show, tip }) {
  return data ? (
    <div
      className="big-card"
      style={{
        backgroundImage: `url(${
          show ? data.poster : data.poster.replace("342", "185")
        })`,
        width: show ? "266px" : "195px",
        height: show ? "399px" : "290px",
      }}
    >
      <h4 className="card_title">
        <Link to={"/movie/" + data.id}>{data.title}</Link>
      </h4>

      {show && data.score && (
        <div className="card_genres">
          {data.genres.split("|").map((genre) => (
            <span key={genre} className="card_genre">
              {genre}
            </span>
          ))}
        </div>
      )}

      {data.score && (
        <div className="card_score">
          <CircularProgress
            progress={Math.round(data.score * 100)}
            size={100}
            tip={tip ? tip : "Similarity Score"}
          />
        </div>
      )}

      {show && !data.score && (
        <div className="card_infos">
          <div className={`card_duration`}>
            <span className="card_info_head">Duration</span>
            {data.duration}
          </div>
          <div className={`card_director`}>
            <span className="card_info_head">Director</span>
            {data.director}
          </div>
          <div className={`card_year`}>
            <span className="card_info_head">Year</span>
            {data.year}
          </div>
          <div className={`card_cast`}>
            <span className="card_info_head">Cast</span>
            {data.cast.split(", ").map((actor) => (
              <div className="mb-2" key={actor}>
                {actor}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card_imdb">
        <div className="card_rating">
          {data.rating} <i className="fa fa-star" />
        </div>
        <Link to={"https://imdb.com/title/" + data.id} className="card_button" target="blank">
          {" "}
          IMDb{" "}
        </Link>
      </div>
    </div>
  ) : null;
}
