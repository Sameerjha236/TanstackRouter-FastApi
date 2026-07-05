import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="home-page">
      <div className="home-hero">
        <div className="home-badge">Task Management System</div>
        <h1 className="home-title">
          Organize your work,
          <br />
          <span className="home-title-accent">one task at a time.</span>
        </h1>
        <p className="home-description">
          A simple and elegant way to manage your daily tasks. Sign in to access
          your workspace or create a new account to get started.
        </p>
        <div className="home-actions">
          <Link to="/login" className="todo-button home-btn-primary">
            Sign In
          </Link>
          <Link to="/signup" className="home-btn-secondary">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
