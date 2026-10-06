import { useEffect } from "react";
import initLegacyScript from "../legacyScript.js";

// script.js was originally included with <script src="script.js"> on every
// page and relied on `if (element)` guards to only wire up the parts that
// exist on the current page (see legacyScript.js, which is that same file
// untouched). This hook just re-runs it once the page's real DOM exists,
// which is the React equivalent of the browser executing the <script> tag
// after the HTML has been parsed.
export default function useLegacyScript() {
  useEffect(() => {
    initLegacyScript();
  }, []);
}
