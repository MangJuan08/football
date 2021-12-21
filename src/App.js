import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Appbar from "./components/Appbar/Appbar";
import Loading from "./components/LazyLoading/Loading";
const Football = React.lazy(() => import("./pages/Football"));
const Homepage = React.lazy(() => import("./pages/Homepage"));
const Weather = React.lazy(() => import("./pages/Weather"));

function App() {
  return (<React.Fragment>
    <Appbar/>
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
    </React.Fragment>
  );
}

export default App;
