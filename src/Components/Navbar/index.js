import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context";
import { logout } from "../../Services/auth";
import { getSuggestions, updateMovieScore } from "../../Services/movie";
import { deleteAccount, resetUser } from "../../Services/auth";
import "./style.css";

export default function Navbar() {
  const [search, setSearch] = useState(false);
  const { user } = useContext(AuthContext);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("Title");
  const [suggestion, setSuggestion] = useState(null);
  const input = useRef();

  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      setQuery("");

      if (type === "Title") {
        history("/search?query=" + query);
      } else {
        history("/keyword?words=" + query);
      }
    }
  };
  const handleChange = (e) => {
    setQuery(e.target.value);
    if (type === "Title" && e.target.value) {
      getSuggestions(e.target.value).then((data) => setSuggestion(data));
    }
  };

  return (
    <div className="nav-bar">
      <div className={search ? "container px-0 py-1" : "container"}>
        <div className="d-flex align-items-center justify-content-between">
          <Link
            className={`${
              search ? "d-none" : "d-block"
            } d-md-block nav-heading`}
            to="/"
          >
            <span className="d-md-none nav-title fs-1">Vidly</span>
            <span className="d-none d-md-block nav-title fs-2">Vidly</span>
          </Link>
          <form
            className={`${search ? "d-block" : "d-none"} d-md-block`}
            onSubmit={handleSubmit}
          >
            <div id="search-bar" className="searchbar-container">
              <div className="dropdown">
                <button
                  className="dropdown-toggle border-right px-2 py-2"
                  type="button"
                  id="dropdown1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {type + " Search"}
                </button>
                <ul className="dropdown-menu">
                  <li
                    onClick={() => setType("Title")}
                    className="dropdown-item"
                  >
                    Title Search
                  </li>
                  <li
                    onClick={() => setType("Keyword")}
                    className="dropdown-item"
                  >
                    Keyword Search
                  </li>
                </ul>
              </div>
              <div className="search">
                <input
                  type="text"
                  placeholder={
                    type === "Title"
                      ? "Search movie here"
                      : "Enter comma saparated keywords"
                  }
                  id="searchbox"
                  className="searchbar"
                  value={query}
                  ref={input}
                  autoComplete="off"
                  onChange={handleChange}
                />
                {type === "Title" ? (
                  query ? (
                    <div id="suggestions" className="suggestion-box">
                      <hr />
                      {suggestion
                        ? suggestion.map((movie) => (
                            <div key={movie.id}>
                              <div className="sug-movie d-flex">
                                <img
                                  style={{ width: "50px" }}
                                  src={movie.poster}
                                  alt="Movie Poster"
                                />
                                <div className="ps-3 movie-details">
                                  <Link
                                    to={"/movie/" + movie.id}
                                    onClick={() => {
                                      setQuery("");
                                      updateMovieScore(movie.id, query);
                                    }}
                                    className="sug-movie-title d-block fs-4"
                                  >
                                    {movie.title}
                                  </Link>
                                  <div className="d-flex fs-6 justify-content-between align-items-center">
                                    <div className="fs-7">{movie.year}</div>
                                    <span className="mx-2">•</span>
                                    <div className="flex-grow-1 sug-cast">
                                      {movie.cast}
                                    </div>
                                    <a
                                      href={"https://imdb.com/title/" + movie.id}
                                      style={{
                                        opacity: 1,
                                        transform: "scale(1)",
                                      }}
                                      className="card_button px-1"
                                      target="_blank"
                                    >
                                      {" "}
                                      IMDb{" "}
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <hr />
                            </div>
                          ))
                        : null}
                    </div>
                  ) : null
                ) : null}
              </div>
              <div className="btn d-md-none" onClick={() => setSearch(false)}>
                <i className="text-white fas fa-times"></i>
              </div>
            </div>
          </form>
          <div
            className={`${
              search ? "d-none" : "d-flex"
            } d-md-flex align-items-center`}
          >
            <div
              className="btn s-btn rounded-circle d-md-none"
              onClick={() => setSearch(true)}
            >
              <i className="fa fa-search"></i>
            </div>
            {user ? (
              <div>
                <div
                  id="dropdown2"
                  data-bs-toggle="dropdown"
                  className="dropdown-toggle rounded-circle btn s-btn"
                >
                  <i className="fa fa-user"></i>
                </div>
                <ul className="dropdown-menu" aria-labelledby="dropdown">
                  <hr className="my-1 bg-white" />
                  <li className="dropdown-item disabled">
                    <div className="d-flex align-items-center">
                      <div className="px-3 rounded-circle border me-3 fs-4 avatar-text">
                        {user.name ? user.name[0] : user.email[0]}
                      </div>
                      <div>
                        <div className="text-white fs-6">{user.name}</div>
                        <div className="email">{user.email}</div>
                      </div>
                    </div>
                  </li>
                  <hr className="my-1 bg-white" />
                  <li
                    className="dropdown-item py-2"
                    onClick={() => {
                      const ans = window.confirm(
                        "Are sure you want to reset your account?"
                      );
                      if (ans) {
                        resetUser().then(() => history("/"));
                      }
                    }}
                  >
                    Reset Account
                  </li>
                  <li
                    className="dropdown-item py-2"
                    onClick={() => {
                      const password = window.prompt("Enter your password");
                      if (password) {
                        deleteAccount(password).then(() => history("/"));
                      }
                    }}
                  >
                    Delete Account
                  </li>
                  <li onClick={() => logout()} className="dropdown-item py-2">
                    Logout
                  </li>
                  <hr className="my-1 bg-white" />
                </ul>
              </div>
            ) : (
              <button
                onClick={() => history("/login")}
                className="text-white rounded py-2 px-4"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
