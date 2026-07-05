import { useState } from "react";
import { useSignup } from "../../hooks/useAuth";

type SignupFormProps = {
  onSignupSuccess: () => void;
};

export function SignupForm({ onSignupSuccess }: SignupFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const signupMutation = useSignup(onSignupSuccess);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }

    signupMutation.mutate(
      { username: username.trim(), password },
      {
        onError: (err: unknown) => {
          const message =
            typeof err === "object" && err !== null && "detail" in err
              ? String((err as { detail: string }).detail)
              : "Signup failed. Please try again.";
          setError(message);
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {error && <div className="auth-error">{error}</div>}

      <div className="auth-field">
        <label htmlFor="signup-username">Username</label>
        <input
          id="signup-username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Choose a username"
          className="todo-input"
          autoComplete="username"
        />
      </div>

      <div className="auth-field">
        <label htmlFor="signup-password">Password</label>
        <input
          id="signup-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a password"
          className="todo-input"
          autoComplete="new-password"
        />
      </div>

      <div className="auth-field">
        <label htmlFor="signup-confirm">Confirm Password</label>
        <input
          id="signup-confirm"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          className="todo-input"
          autoComplete="new-password"
        />
      </div>

      <button
        type="submit"
        className="todo-button auth-submit"
        disabled={signupMutation.isPending}
      >
        {signupMutation.isPending ? "Creating account..." : "Create Account"}
      </button>
    </form>
  );
}
