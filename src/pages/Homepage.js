import React from "react";
import { Link } from "react-router-dom";
import "./custom.css";
const Homepage = () => {
  return (
    <div style={{ marginTop: "130px" }}>
      <div className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold">
          Esercitazione con Material UI e React
        </h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">BY: JOHN EDWARD BAUTISTA</p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <nav className="nav">
              <Link to="/football" className="colorText nav-link">
                Football
              </Link>
              <Link to="/weather" className="colorText nav-link">
                Weather
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
