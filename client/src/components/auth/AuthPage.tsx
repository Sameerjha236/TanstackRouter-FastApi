import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";

type AuthMode = "login" | "signup";

type AuthPageProps = {
  initialMode?: AuthMode;
  redirectTo?: string;
};

export function AuthPage({
  initialMode = "login",
  redirectTo = "/todos",
}: AuthPageProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [loginMessage, setLoginMessage] = useState("");
  const navigate = useNavigate();

  const switchMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    if (nextMode === "signup") {
      setLoginMessage("");
    }
    navigate({
      to: nextMode === "login" ? "/login" : "/signup",
      replace: true,
    });
  };

  return (
    <div className="auth-page">
      <div className="auth-background">
        <div className="auth-orb auth-orb-1" />
        <div className="auth-orb auth-orb-2" />
        <div className="auth-orb auth-orb-3" />
      </div>

      <div className="auth-container">
        <Link to="/" className="auth-back-link">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to home
        </Link>

        <div className="auth-card">
          <div className="auth-card-header">
            <div className="auth-logo">TODO</div>
            <h1 className="auth-title">
              {mode === "login" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="auth-subtitle">
              {mode === "login"
                ? "Sign in to manage your tasks and stay organized."
                : "Join us and start tracking your tasks effortlessly."}
            </p>
          </div>

          <div className="auth-tabs">
            <button
              type="button"
              className={`auth-tab ${mode === "login" ? "active" : ""}`}
              onClick={() => switchMode("login")}
            >
              Sign In
            </button>
            <button
              type="button"
              className={`auth-tab ${mode === "signup" ? "active" : ""}`}
              onClick={() => switchMode("signup")}
            >
              Sign Up
            </button>
            <div
              className="auth-tab-indicator"
              style={{
                transform:
                  mode === "login" ? "translateX(0)" : "translateX(100%)",
              }}
            />
          </div>

          <div className="auth-form-panel">
            {mode === "login" ? (
              <LoginForm
                redirectTo={redirectTo}
                successMessage={loginMessage}
              />
            ) : (
              <SignupForm
                onSignupSuccess={() => {
                  setLoginMessage(
                    "Account created! Please sign in with your credentials.",
                  );
                  setMode("login");
                  navigate({ to: "/login", replace: true });
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
