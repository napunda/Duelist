import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import Layout from "./components/layout";

const router = createBrowserRouter([
  { element: <Layout />, path: "/", children: routes },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
