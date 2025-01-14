import React, { useContext, useEffect, useRef, useState } from "react";
import "./style.css";
import { CloseOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MovieContext } from "../../ProtectedRoute";

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
  }, [query]);

  return (
    <div
      className={scrolled ? "header main-header scroll" : "main-header header"}
    >
      <div className="flex aling-item-center w-100 navbar">
        <h1 className="navbar-title">Vidly</h1>
        <ul className="navbar-list flex m-0 p-0 align-item-center">
          <li className="ls-none" style={{ marginLeft: "20px" }}>
            <Link
              className={uri.pathname === "/" ? "c-white fw-700" : "c-white"}
              to="/"
            >
              Home
            </Link>
          </li>
          <li className="ls-none" style={{ marginLeft: "20px" }}>
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
        <div className="navbar-btns flex aling-item-center justify-content-center position-absolute">
          <div className="l-hieght-1" style={{ marginRight: "15px" }}>
            <div className="search-bar flex aling-item-center c-white">
              <button
                onClick={() => searchBox.current.focus()}
                className="search-btn o-none b-none"
              >
                <SearchOutlined style={{ fontSize: "24px" }} />
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
          <div
            className="l-height-1"
            style={{ marginRight: "15px", color: "white" }}
          >
            <UserOutlined
              onClick={() => setIsProfileOpen(true)}
              style={{ fontSize: "24px" }}
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
        <div
          className="position-absolute bg-inherit flex align-item-center w-100 top-0"
          style={{
            height: "68px",
            zIndex: 2,
          }}
        >
          <h1
            className="c-white l-height-1 fw-400"
            style={{
              marginRight: "25px",
              margin: "0px 25px 0px 0px",
            }}
          >
            My List
          </h1>
        </div>
      </div>
    </div>
  );
}
