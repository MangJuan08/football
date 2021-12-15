import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div style={{marginTop:"30px"}}>
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <Link to="/football" className="nav-link">
            Football
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/weather" className="nav-link">
            Weather
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Homepage;
