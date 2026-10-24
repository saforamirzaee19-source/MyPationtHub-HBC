import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import initLegacyScript from "../legacyScript.js";

export default function useLegacyScript() {
  const navigate = useNavigate();

  useEffect(() => {
    initLegacyScript(navigate);
  }, [navigate]);
}
