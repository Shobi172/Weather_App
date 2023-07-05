import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WeatherForecast from "./components/WeatherForecast";
import GoogleSignIn from "./components/GoogleSignIn";
import Navbar from "./components/navbar";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <Routes>
          <Route path="/" element={<GoogleSignIn />} />
          <Route path="/weather" element={<WeatherForecast />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
