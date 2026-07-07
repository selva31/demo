import React, { useRef, useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import "../styles/signup.css";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";
import { handleGoogleLogin, handlegithublogin } from "../config";

function Signup() {
  const [active, setActive] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const emailref = useRef(null);
  const passwordref = useRef(null);
  const usernameref = useRef(null);
  const confirmref = useRef(null);

  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [confirmFocused, setConfirmFocused] = useState(false);

  const handlesubmit = async () => {
    setError("");
    setLoading(true);

    const email = emailref.current?.value || "";
    const password = passwordref.current?.value || "";
    const username = usernameref.current?.value || "";
    const confirm = confirmref.current?.value || "";

    // Validation
    if (!email || !password) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    if (active) {
      if (!username) {
        setError("Please enter a username");
        setLoading(false);
        return;
      }
      if (password !== confirm) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }
      if (password.length < 8) {
        setError("Password must be at least 8 characters");
        setLoading(false);
        return;
      }
    }

    const data = active
      ? {
          username: username,
          email: email,
          password: password,
        }
      : {
          email: email,
          password: password,
        };

    const url = active
      ? `${process.env.REACT_APP_url}/v1/register`
      : `${process.env.REACT_APP_url}/v1/login`;

    try {
      const response = await axios.post(url, data);
      console.log(response.data);

      if (!active) {
        localStorage.setItem("usertoken", response.data.token);
        setSuccess(true);
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1500);
      } else {
        setSuccess(true);
        setTimeout(() => {
          setActive(false);
          setSuccess(false);
        }, 2000);
      }

      // Clear fields
      emailref.current.value = "";
      passwordref.current.value = "";
      if (usernameref.current) usernameref.current.value = "";
      if (confirmref.current) confirmref.current.value = "";
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.message ||
          "Authentication failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      {/* Background Decorations */}
      <div className="auth-bg">
        <div className="bg-orb orb-1"></div>
        <div className="bg-orb orb-2"></div>
        <div className="bg-orb orb-3"></div>
        <div className="bg-grid"></div>
      </div>

      <div className="auth-container">
        <div className={`auth-card ${active ? "flipped" : ""}`}>
          {/* Left Panel - Form */}
          <div className="auth-left">
            <div className="auth-form">
              {/* Brand */}
              <div className="brand-section">
                <div className="brand-logo">
                  <div className="logo-icon">◆</div>
                  <span className="brand-name">Apex</span>
                </div>
                <div className="brand-status">
                  <span className="status-dot"></span>
                  <span className="status-text">Secure</span>
                </div>
              </div>

              {/* Header */}
              <div className="form-header">
                <h1 className="form-title">
                  {active ? "Create Account" : "Welcome Back"}
                </h1>
                <p className="form-subtitle">
                  {active
                    ? "Join thousands of professionals using Apex"
                    : "Sign in to access your dashboard"}
                </p>
              </div>

              {/* Social Login */}
              <div className="social-login">
                <p className="social-label">Continue with</p>
                <div className="social-icons">
                  <button
                    className="social-icon-btn google"
                    onClick={handleGoogleLogin}
                  >
                    <GoogleIcon />
                  </button>
                  <button
                    className="social-icon-btn github"
                    onClick={handlegithublogin}
                  >
                    <GitHubIcon />
                  </button>
                  <button className="social-icon-btn facebook">
                    <FacebookIcon />
                  </button>
                  <button className="social-icon-btn linkedin">
                    <LinkedInIcon />
                  </button>
                </div>
                <div className="divider-line">
                  <span>or use email</span>
                </div>
              </div>

              {/* Form Fields */}
              <div className="form-fields">
                {active && (
                  <div className="field-group">
                    <label className="field-label">Username</label>
                    <div
                      className={`field-wrapper ${usernameFocused ? "focused" : ""}`}
                    >
                      <PersonIcon className="field-icon" />
                      <input
                        type="text"
                        ref={usernameref}
                        placeholder="Choose a username"
                        onFocus={() => setUsernameFocused(true)}
                        onBlur={() => setUsernameFocused(false)}
                        className="field-input"
                      />
                    </div>
                  </div>
                )}

                <div className="field-group">
                  <label className="field-label">Email Address</label>
                  <div
                    className={`field-wrapper ${emailFocused ? "focused" : ""}`}
                  >
                    <EmailIcon className="field-icon" />
                    <input
                      type="email"
                      ref={emailref}
                      placeholder="you@company.com"
                      onFocus={() => setEmailFocused(true)}
                      onBlur={() => setEmailFocused(false)}
                      className="field-input"
                    />
                  </div>
                </div>

                <div className="field-group">
                  <label className="field-label">Password</label>
                  <div
                    className={`field-wrapper ${passwordFocused ? "focused" : ""}`}
                  >
                    <LockIcon className="field-icon" />
                    <input
                      type={showPassword ? "text" : "password"}
                      ref={passwordref}
                      placeholder={
                        active
                          ? "Create strong password"
                          : "Enter your password"
                      }
                      onFocus={() => setPasswordFocused(true)}
                      onBlur={() => setPasswordFocused(false)}
                      className="field-input"
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </button>
                  </div>
                  {active && (
                    <div className="password-hint">
                      <span>Must be at least 8 characters</span>
                    </div>
                  )}
                </div>

                {active && (
                  <div className="field-group">
                    <label className="field-label">Confirm Password</label>
                    <div
                      className={`field-wrapper ${confirmFocused ? "focused" : ""}`}
                    >
                      <CheckCircleIcon className="field-icon" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        ref={confirmref}
                        placeholder="Confirm your password"
                        onFocus={() => setConfirmFocused(true)}
                        onBlur={() => setConfirmFocused(false)}
                        className="field-input"
                      />
                      <button
                        type="button"
                        className="toggle-password"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {!active && (
                  <div className="forgot-link">
                    <a href="/forgot-password" className="link">
                      Forgot password?
                    </a>
                  </div>
                )}

                {error && (
                  <div className="error-message">
                    <span>⚠️ {error}</span>
                  </div>
                )}

                {success && (
                  <div className="success-message">
                    <span>
                      ✅{" "}
                      {active
                        ? "Account created successfully!"
                        : "Login successful! Redirecting..."}
                    </span>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                className={`submit-button ${active ? "signup" : "signin"} ${loading ? "loading" : ""}`}
                onClick={handlesubmit}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    {active ? "Creating Account..." : "Signing In..."}
                  </>
                ) : (
                  <>
                    {active ? <PersonAddIcon /> : <LoginIcon />}
                    {active ? "Create Account" : "Sign In"}
                    <ArrowForwardIcon className="arrow-icon" />
                  </>
                )}
              </button>

              {/* Footer */}
              <div className="form-footer">
                <p>
                  {active
                    ? "Already have an account?"
                    : "Don't have an account?"}
                  <button
                    className="switch-action"
                    onClick={() => {
                      setActive(!active);
                      setError("");
                      setSuccess(false);
                    }}
                  >
                    {active ? "Sign In" : "Sign Up"}
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel - Info */}
          <div className="auth-right">
            <div className="info-panel">
              <div className="info-content">
                <div className="info-badge">
                  <span className="badge-dot"></span>
                  <span className="badge-text">
                    {active ? "Join the community" : "Welcome back"}
                  </span>
                </div>

                <h2 className="info-title">
                  {active ? "Start Your Journey" : "Great to See You!"}
                </h2>
                <p className="info-description">
                  {active
                    ? "Create your account and unlock premium features"
                    : "Access your dashboard, projects, and analytics"}
                </p>

                <div className="feature-grid">
                  <div className="feature-card">
                    <div className="feature-icon-wrapper">
                      <PersonAddIcon className="feature-icon" />
                    </div>
                    <div>
                      <h4>Free Account</h4>
                      <p>No credit card required</p>
                    </div>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon-wrapper">
                      <LockIcon className="feature-icon" />
                    </div>
                    <div>
                      <h4>Secure Access</h4>
                      <p>Enterprise-grade security</p>
                    </div>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon-wrapper">
                      <CheckCircleIcon className="feature-icon" />
                    </div>
                    <div>
                      <h4>Premium Support</h4>
                      <p>24/7 dedicated team</p>
                    </div>
                  </div>
                </div>

                <div className="testimonial">
                  <div className="testimonial-avatars">
                    <div className="avatar">JD</div>
                    <div className="avatar">SK</div>
                    <div className="avatar">ML</div>
                    <div className="avatar-more">+12</div>
                  </div>
                  <div className="testimonial-text">
                    <div className="stars">★★★★★</div>
                    <p>"Best platform we've ever used"</p>
                    <span className="testimonial-author">
                      — Sarah Chen, CTO
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
