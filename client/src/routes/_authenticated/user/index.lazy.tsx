import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authenticated/user/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="todo-container">
      <div className="todo-header">
        <h1 className="todo-title">Profile</h1>
        <p style={{ color: "var(--text-secondary)", marginTop: "0.5rem" }}>
          Your account settings will appear here.
        </p>
      </div>
    </div>
  );
}
