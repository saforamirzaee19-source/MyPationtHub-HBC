import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useLegacyScript from "../hooks/useLegacyScript.js";

export default function Signup() {
  const [feedback, setFeedback] = useState("");
  useLegacyScript();

  useEffect(() => {
    document.body.classList.add("login-page");
    return () => document.body.classList.remove("login-page");
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const username = form.elements.username.value;
    const password = form.elements.password.value;
    const confirmPassword = form.elements.confirmPassword.value;

    if (!/^[A-Za-z0-9._-]{3,}$/.test(username)) {
      setFeedback(
        "Username must contain at least 3 letters, numbers, dots, underscores, or hyphens.",
      );
      return;
    }

    if (password !== confirmPassword) {
      setFeedback("The passwords do not match.");
      return;
    }

    setFeedback("Your account has been created Successfully ✅");
  };

  return (
    <>
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
        <h1>Join MyPatientHUB</h1>
        <p>Create an account to access your healthcare services.</p>
      </header>

      <main className="login-card signup-card">
        <h2>Create your account</h2>
        <p className="signup-intro">
          All fields are required except phone number.
        </p>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="signup-form-grid">
            <label className="signup-field">
              First name
              <input
                type="text"
                name="firstName"
                autoComplete="given-name"
                required
              />
            </label>

            <label className="signup-field">
              Last name
              <input
                type="text"
                name="lastName"
                autoComplete="family-name"
                required
              />
            </label>

            <label className="signup-field">
              Username
              <input
                type="text"
                name="username"
                autoComplete="username"
                minLength={3}
                required
              />
            </label>

            <label className="signup-field">
              Email
              <input
                type="email"
                name="email"
                autoComplete="email"
                autoCapitalize="none"
                required
              />
            </label>

            <label className="signup-field signup-field-full">
              Phone number <span>(optional)</span>
              <input
                type="tel"
                name="phone"
                autoComplete="tel"
                inputMode="tel"
              />
            </label>

            <label className="signup-field signup-field-full">
              Password
              <input
                type="password"
                name="password"
                autoComplete="new-password"
                minLength={8}
                required
              />
            </label>

            <label className="signup-field signup-field-full">
              Confirm password
              <input
                type="password"
                name="confirmPassword"
                autoComplete="new-password"
                minLength={8}
                required
              />
            </label>
          </div>

          <label className="signup-consent">
            <input type="checkbox" name="consent" required />
            <span>I agree to the terms and privacy policy.</span>
          </label>

          {feedback && (
            <p className="signup-feedback" role="alert">
              {feedback}
            </p>
          )}

          <button type="submit" className="btn btn-signin">
            CREATE ACCOUNT
          </button>
        </form>

        <p className="signup-login-link">
          Already have an account? <Link to="/">Sign in</Link>
        </p>
      </main>

      <footer className="login-footer">
        <a href="#">About MyPatientHUB</a>
        <a href="#">About Us</a>
        <a href="#">Our Blog</a>
      </footer>
    </>
  );
}
