import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { routes } from "./routes";
import Layout from "./components/layout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    path: "/",
    children: routes,
  },
  {
    path: "*",
    element: <Navigate to="/404" replace />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
