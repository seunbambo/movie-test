import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow-sm p-3 mb-5 bg-white rounded">
      <Link className="navbar-brand" to="/">
        Movies
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav mx-auto">
          <NavLink className="nav-item nav-link mx-auto" to="/movies">
            Movies
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
