import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import LandingPage from "./LandingPage";
import ActivitiesPage from "./components/ActivitiesPage";
import { Route, Routes } from "react-router-dom";
import DetailedActivity from "./components/DetailedActivity";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/activities/:id" element={<DetailedActivity />} />
      </Routes>
    </div>
  );
}

export default App;
