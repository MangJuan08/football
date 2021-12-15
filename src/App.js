import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";
const Football = React.lazy(() => import("./pages/Football"));
const Homepage = React.lazy(() => import("./pages/Homepage"));
const Weather = React.lazy(() => import("./pages/Weather"));

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <React.Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/football" element={<Football />} />
            <Route path="/weather" element={<Weather />} />
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
