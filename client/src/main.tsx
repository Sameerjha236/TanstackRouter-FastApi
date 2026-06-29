import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createRouter, RouterProvider } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
    {/* <TanStackRouterDevtools initialIsOpen={false} /> */}
  </StrictMode>,
);
