import { useState } from "react";
import { useLogin } from "../../hooks/useAuth";

type LoginFormProps = {
  redirectTo?: string;
  successMessage?: string;
};

export function LoginForm({ redirectTo = "/todos", successMessage }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginMutation = useLogin(redirectTo);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }

    loginMutation.mutate(
      { username: username.trim(), password },
      {
        onError: (err: unknown) => {
          const message =
            typeof err === "object" && err !== null && "detail" in err
              ? String((err as { detail: string }).detail)
              : "Login failed. Please try again.";
          setError(message);
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {successMessage && <div className="auth-success">{successMessage}</div>}
      {error && <div className="auth-error">{error}</div>}

      <div className="auth-field">
        <label htmlFor="login-username">Username</label>
        <input
          id="login-username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          className="todo-input"
          autoComplete="username"
        />
      </div>

      <div className="auth-field">
        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="todo-input"
          autoComplete="current-password"
        />
      </div>

      <button
        type="submit"
        className="todo-button auth-submit"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
