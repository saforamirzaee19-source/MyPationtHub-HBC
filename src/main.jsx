import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Chart.js and Leaflet used to be loaded from a CDN with <script> tags on
// dashboard.html / find-doctor.html / find-clinic.html, which put `Chart`
// and `L` on the global window object. legacyScript.js (the untouched
// original script.js) expects those same globals, so we recreate that here
// instead of touching any of the original logic.
import Chart from "chart.js/auto";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

window.Chart = Chart;
window.L = L;

import "./style.css";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
