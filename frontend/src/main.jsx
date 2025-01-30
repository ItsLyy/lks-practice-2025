import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import App from "./App.jsx";
import Login from "./Pages/Auth/Login.jsx";
import { AppContextProvider } from "./Context/AppContext.jsx";
import FormIndex from "./Pages/Form/Index.jsx";
import FormCreate from "./Pages/Form/Create.jsx";
import FormShow from "./Pages/Form/Show.jsx";

import "./app.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <FormIndex />,
      },
      {
        path: "add-form",
        element: <FormCreate />,
      },
      {
        path: "form/:slug",
        element: <FormShow />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

createRoot(document.getElementById("root")).render(
  <AppContextProvider>
    <RouterProvider router={router} />
  </AppContextProvider>,
);
