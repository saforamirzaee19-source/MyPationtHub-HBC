import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import FindDoctor from "./pages/FindDoctor.jsx";
import FindClinic from "./pages/FindClinic.jsx";
import FindMarketplaces from "./pages/FindMarketPlace.jsx";
import FindPharmacy from "./pages/FindPharmacy.jsx";
import Mydependets from "./pages/Mydependets.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/find-doctor" element={<FindDoctor />} />
      <Route path="/find-clinic" element={<FindClinic />} />
      <Route path="/find-marketplace" element={<FindMarketplaces />} />
      <Route path="/find-pharmacy" element={<FindPharmacy />} />
      <Route path="/my-dependets" element={<Mydependets />} />
    </Routes>
  );
}
