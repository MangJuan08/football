import React from "react";
import { Link } from "react-router-dom";
import "./custom.css";
const Homepage = () => {
  return (
    <div style={{ marginTop: "130px" }}>
      <div class="px-4 py-5 my-5 text-center">
        <h1 class="display-5 fw-bold">Esercitazione con Material UI e React</h1>
        <div class="col-lg-6 mx-auto">
          <p class="lead mb-4">
            Quickly design and customize responsive mobile-first sites with
            Bootstrap, the world’s most popular front-end open source toolkit,
            featuring Sass variables and mixins, responsive grid system,
            extensive prebuilt components, and powerful JavaScript plugins.
          </p>
          <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <button type="button" class="btn btn-outline-primary btn-lg px-4 gap-3">
              <Link to="/football" className="colorText">
                Football
              </Link>
            </button>
            <button type="button" class="btn btn-outline-primary btn-lg px-4">
              <Link to="/weather" className="colorText">
                Weather
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
