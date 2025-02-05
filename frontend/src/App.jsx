import { createBrowserRouter, RouterProvider } from "react-router";
import AppContextProvider from "./Contexts/AppContext";
import DefaultLayout from "./Layouts/DefaultLayout";
import JournalistLayout from "./Layouts/JournalistLayout";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Home from "./Pages/Home";
import News from "./Pages/News";
import NewsDetail from "./Pages/News/show";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "news",
        element: <News />,
      },
      {
        path: "news/:id",
        element: <NewsDetail />,
      },
    ],
  },
  {
    path: "/journalist",
    element: <JournalistLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/journalist/news",
        element: <News />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function App() {
  return (
    <AppContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </AppContextProvider>
  );
}

export default App;
