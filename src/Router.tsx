import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { routes } from "./routes";
import Layout from "./components/layout";
import ConditionalRoute from "./routes/ConditionalRoute";

interface Route {
  path: string;
  element: JSX.Element;
  isPrivate?: boolean;
}
const conditionalRoutes: Route[] = routes.map((route: Route) => {
  if (route.isPrivate) {
    route.element = (
      <ConditionalRoute
        redirectTo="/login"
      >
        {route.element}
      </ConditionalRoute>
    );
  }

  return route;
});

const router = createBrowserRouter([
  {
    element: <Layout />,
    path: "/",
    children: conditionalRoutes,

  },
  {
    path: "*",
    element: <Navigate to="/404" replace />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
