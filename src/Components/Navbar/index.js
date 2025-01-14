import React, { useContext, useEffect, useRef, useState } from "react";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { MovieContext } from "../../ProtectedRoute";
import "./style.css";

export default function Navbar() {
  const { setIsProfileOpen } = useContext(MovieContext);

  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");

  const uri = useLocation();

  const navigate = useNavigate();

  const searchBox = useRef(null);

  window.addEventListener("scroll", () => {
    if (window.scrollY >= 10) setScrolled(true);
    else setScrolled(false);
  });

  window.addEventListener("focusout", (e) => {
    if (e.currentTarget === searchBox.current) setQuery("");
  });

  useEffect(() => {
    let path = "/";

    if (query) path = "/search?q=" + query;

    navigate(path);
  }, [query, navigate]);

  return (
    <div
      className={scrolled ? "header main-header scroll" : "main-header header"}
    >
      <div className="d-flex aling-item-center w-100 navbar">
        <h1 className="navbar-title">Vidly</h1>
        <ul className="navbar-list d-flex m-0 p-0 align-item-center">
          <li className="nav-item ls-none">
            <Link
              className={uri.pathname === "/" ? "c-white fw-700" : "c-white"}
              to="/"
            >
              Home
            </Link>
          </li>
          <li className="nav-item ls-none">
            <Link
              className={
                uri.pathname === "/my-list" ? "c-white fw-700" : "c-white"
              }
              to="/my-list"
            >
              My List
            </Link>
          </li>
        </ul>
        <div className="navbar-btns d-flex aling-item-center justify-content-center position-absolute">
          <div className="l-hieght-1 nav-icon-item">
            <div className="search-bar d-flex aling-item-center c-white">
              <button
                onClick={() => searchBox.current.focus()}
                className="search-btn o-none b-none"
              >
                <SearchOutlined className="nav-icon" />
              </button>
              <div>
                <input
                  id="search-box"
                  ref={searchBox}
                  type="text"
                  className="search-box b-none c-white o-none bg-inherit"
                  placeholder="Titles, Keywords"
                  onChange={(e) => setQuery(e.currentTarget.value)}
                  value={query}
                />
              </div>
            </div>
          </div>
          <div className="l-height-1 c-white nav-icon-item">
            <UserOutlined
              className="nav-icon"
              onClick={() => setIsProfileOpen(true)}
            />
          </div>
        </div>
      </div>
      <div
        className={
          uri.pathname === "/my-list"
            ? "position-relative bg-dark"
            : "position-relative bg-dark d-none"
        }
      >
        <div className="sub-navbar position-absolute bg-inherit d-flex align-item-center w-100 top-0">
          <h1 className="c-white l-height-1 fw-400 sub-nav-item">My List</h1>
        </div>
      </div>
    </div>
  );
}
