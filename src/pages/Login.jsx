import { useEffect } from "react";
import useLegacyScript from "../hooks/useLegacyScript.js";

export default function Login() {
  useLegacyScript();

  // Original index.html had <body class="login-page">. React only renders
  // into #root, so we add/remove that class on the real <body> to match.
  useEffect(() => {
    document.body.classList.add("login-page");
    return () => document.body.classList.remove("login-page");
  }, []);

  return (
    <>
      {/* Top colorful banner */}
      <header className="login-hero">
        <div className="theme-toggle-wrap">
          <button className="theme-toggle" type="button" aria-label="Toggle dark mode">
            <span className="toggle-icon">🌙</span>
            <span className="toggle-text">Dark</span>
          </button>
        </div>
        <h1>Welcome to MyPatientHUB!</h1>
        <p>We provide smart healthcare services in your hands.</p>
      </header>

      {/* Sign in card */}
      <main className="login-card">
        <h2>Sign in to MyPatientHUB</h2>

        {/* Social login buttons (just for show) */}
        <div className="social-row">
          <button className="social-btn facebook" title="Sign in with Facebook">f</button>
          <button className="social-btn google" title="Sign in with Google">G</button>
        </div>

        {/* Error message box, hidden until JS shows it */}
        <p id="errorMsg" className="error-msg"></p>

        <form id="loginForm">
          <input type="email" id="username" placeholder="Email or Phone number" required />
          <div className="password-field">
            <input type="password" id="password" placeholder="Please enter your password" required />
            <button type="button" id="togglePassword" className="password-toggle" aria-label="Show password" title="Show password">👁</button>
          </div>

          <button type="submit" className="btn btn-signin">SIGN IN</button>

          <div className="options-row">
            <a href="#">Forgot password?</a>
            <label>
              <input type="checkbox" id="rememberMe" />
              Remember me
            </label>
          </div>

          <div className="divider">or</div>

          <button type="button" className="btn btn-signup" onClick={() => alert("Sign up page not built yet!")}>SIGN UP</button>
        </form>
      </main>

      {/* Bottom footer links */}
      <footer className="login-footer">
        <a href="#">Google Play Store APP</a>
        <a href="#">App Store APP</a>
        <a href="#">About MyPatientHUB</a>
        <a href="#">About Us</a>
        <a href="#">Our Blog</a>
      </footer>
    </>
  );
}
