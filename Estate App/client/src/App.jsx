import Navbar from "./components/Navbar/Navbar";
import "./layout.scss";
import HomePage from "./routes/HomePage/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListPage from "./routes/ListPage/ListPage";
import  {Layout,RequireAuth } from "./routes/layout/Layout";
import SinglePage from "./routes/SinglePage/SinglePage";
import ProfilePage from "./routes/ProfilePage/ProfilePage";
import Login from "./routes/Login/Login";
import Register from "./routes/Register/Register";
import ProfileUpdatePage from "./routes/ProfileUpdatePage/ProfileUpdatePage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/list",
          element: <ListPage />,
        },
        {
          path: "/:id",
          element: <SinglePage />,
        },

        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/profile",
          element: <ProfilePage />,
        },
        {
          path: "/profile/update",
          element: <ProfileUpdatePage />,
        }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
