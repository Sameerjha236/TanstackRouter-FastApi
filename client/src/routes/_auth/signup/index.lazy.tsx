import { createLazyFileRoute } from "@tanstack/react-router";
import { AuthPage } from "../../../components/auth/AuthPage";

export const Route = createLazyFileRoute("/_auth/signup/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <AuthPage initialMode="signup" />;
}
