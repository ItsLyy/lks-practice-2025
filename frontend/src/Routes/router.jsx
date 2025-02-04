import { createBrowserRouter } from "react-router";
import Login from "../Pages/Login";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
