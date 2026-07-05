import { createLazyFileRoute, useSearch } from "@tanstack/react-router";
import { AuthPage } from "../../../components/auth/AuthPage";

export const Route = createLazyFileRoute("/_auth/login/")({
  component: RouteComponent,
});

function RouteComponent() {
  const search = useSearch({ strict: false }) as { redirect?: string };
  const redirectTo = search.redirect ?? "/todos";

  return <AuthPage initialMode="login" redirectTo={redirectTo} />;
}
