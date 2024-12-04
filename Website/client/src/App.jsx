import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import FraudPrediction from "./components/FraudPrediction";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/predict-fraud" element={<FraudPrediction />} />{" "}
      </Routes>
    </Router>
  );
}

export default App;
