import { useEffect } from "react";
import { Link } from "react-router-dom";
import useLegacyScript from "../hooks/useLegacyScript.js";

export default function Login() {
  useLegacyScript();
  useEffect(() => {
    document.body.classList.add("login-page");
    return () => document.body.classList.remove("login-page");
  }, []);

  return (
    <>
      {/* Top colorful banner */}
      <header className="login-hero">
        <div className="theme-toggle-wrap">
          <button
            className="theme-toggle"
            type="button"
            aria-label="Toggle dark mode"
          >
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
          <button className="social-btn facebook" title="Sign in with Facebook">
            f
          </button>
          <button className="social-btn google" title="Sign in with Google">
            G
          </button>
        </div>

        {/* Error message box, hidden until JS shows it */}
        <p id="errorMsg" className="error-msg" role="alert"></p>

        <form id="loginForm">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Email or Phone number"
            autoComplete="username"
            autoCapitalize="none"
            spellCheck="false"
            aria-describedby="errorMsg"
            required
          />
          <div className="password-field">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Please enter your password"
              autoComplete="current-password"
              aria-describedby="errorMsg"
              required
            />
            <button
              type="button"
              id="togglePassword"
              className="password-toggle"
              aria-label="Show password"
              title="Show password"
            >
              👁
            </button>
          </div>

          <button type="submit" className="btn btn-signin">
            SIGN IN
          </button>

          <div className="options-row">
            <a href="#">Forgot password?</a>
            <label>
              <input type="checkbox" id="rememberMe" />
              Remember me
            </label>
          </div>

          <div className="divider">or</div>

          <Link to="/signup" className="btn btn-signup">
            SIGN UP
          </Link>
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
