import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { checkAuth } from "../lib/auth";

export const Route = createFileRoute("/_auth")({
  beforeLoad: async () => {
    const isAuthenticated = await checkAuth();
    if (isAuthenticated) {
      throw redirect({ to: "/todos" });
    }
  },
  component: AuthLayout,
});

function AuthLayout() {
  return <Outlet />;
}
