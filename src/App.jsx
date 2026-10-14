import { Routes, Route } from "react-router-dom";
import { useEffect, useRef } from "react";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import FindDoctor from "./pages/FindDoctor.jsx";
import FindClinic from "./pages/FindClinic.jsx";
import FindMarketplaces from "./pages/FindMarketPlace.jsx";
import FindPharmacy from "./pages/FindPharmacy.jsx";
import MyDependents from "./pages/Mydependets.jsx";
import Appointment from "./pages/Appointment.jsx";
import Chat from "./pages/Chat.jsx";
import MyAccount from "./pages/MyAccount.jsx";
import Sitting from "./pages/Sitting.jsx";

function CursorEffect() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const canUseCursorEffect =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canUseCursorEffect) return undefined;

    const cursor = cursorRef.current;
    let frameId = 0;
    let pointerX = 0;
    let pointerY = 0;
    const interactiveSelector =
      "a, button, input, select, textarea, [role='button'], label";

    const updateCursor = (event) => {
      if (event.pointerType !== "mouse") return;

      pointerX = event.clientX;
      pointerY = event.clientY;
      cursor.classList.add("is-visible");
      cursor.classList.toggle(
        "is-interactive",
        event.target instanceof Element &&
          Boolean(event.target.closest(interactiveSelector)),
      );

      if (frameId) return;
      frameId = window.requestAnimationFrame(() => {
        cursor.style.setProperty("--cursor-x", `${pointerX}px`);
        cursor.style.setProperty("--cursor-y", `${pointerY}px`);
        frameId = 0;
      });
    };

    const hideCursor = () => {
      cursor.classList.remove("is-visible", "is-pressed");
    };
    const pressCursor = () => cursor.classList.add("is-pressed");
    const releaseCursor = () => cursor.classList.remove("is-pressed");

    window.addEventListener("pointermove", updateCursor, { passive: true });
    window.addEventListener("pointerdown", pressCursor);
    window.addEventListener("pointerup", releaseCursor);
    window.addEventListener("pointercancel", releaseCursor);
    document.documentElement.addEventListener("pointerleave", hideCursor);

    return () => {
      window.removeEventListener("pointermove", updateCursor);
      window.removeEventListener("pointerdown", pressCursor);
      window.removeEventListener("pointerup", releaseCursor);
      window.removeEventListener("pointercancel", releaseCursor);
      document.documentElement.removeEventListener("pointerleave", hideCursor);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="cursor-effect" ref={cursorRef} aria-hidden="true">
      <span className="cursor-effect__aura" />
      <span className="cursor-effect__ring" />
    </div>
  );
}

export default function App() {
  return (
    <>
      <CursorEffect />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/find-doctor" element={<FindDoctor />} />
        <Route path="/find-clinic" element={<FindClinic />} />
        <Route path="/find-marketplace" element={<FindMarketplaces />} />
        <Route path="/find-pharmacy" element={<FindPharmacy />} />
        <Route path="/my-dependents" element={<MyDependents />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/sitting" element={<Sitting />} />
      </Routes>
    </>
  );
}
