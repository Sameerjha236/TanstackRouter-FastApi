import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { checkAuth } from "../lib/auth";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ location }) => {
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
      throw redirect({
        to: "/login",
        search: { redirect: location.pathname },
      });
    }
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return <Outlet />;
}
