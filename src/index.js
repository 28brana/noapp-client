import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PaginatedData from "./pages/PaginatedData";
import UploadCSV from "./pages/UploadCSV";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<UploadCSV />} />
        <Route exact path="/show" element={<PaginatedData />} />
      </Routes>
    </Router>
    <ToastContainer />
  </React.StrictMode>
);
