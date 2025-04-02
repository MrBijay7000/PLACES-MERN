import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UsersPage from "./users/pages/Users";
import NewPlacePage from "./places/pages/NewPlace";
import ErrorPage from "./shared/RootPage/Error";
import RootLayout from "./shared/RootPage/RootLayout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />, // Wrap everything inside RootLayout
      children: [
        { path: "/", element: <UsersPage /> },
        { path: "/places/new", element: <NewPlacePage /> },
      ],
      errorElement: <ErrorPage />, // Show the custom error page on errors
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
