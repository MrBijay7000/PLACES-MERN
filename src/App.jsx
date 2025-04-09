import { useCallback, useState } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UsersPage from "./users/pages/Users";
import NewPlacePage from "./places/pages/NewPlace";
import ErrorPage from "./shared/RootPage/Error";
import RootLayout from "./shared/RootPage/RootLayout";
import UserPlacesPage from "./places/pages/UserPlaces";
import UpdatePlacePage from "./places/pages/UpdatePlace";
import AuthPage from "./users/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  // let routes;

  // if (isLoggedIn) {
  //   routes = ();
  // } else {
  // }

  const routes = [
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { path: "/", element: <UsersPage /> },
        ...(isLoggedIn
          ? [
              { path: "/places/new", element: <NewPlacePage /> },
              { path: "/places/:placeId", element: <UpdatePlacePage /> },
              { path: "/:userId/places", element: <UserPlacesPage /> },
            ]
          : [
              { path: "/:userId/places", element: <UserPlacesPage /> },

              { path: "/auth", element: <AuthPage /> },
              { path: "*", element: <AuthPage /> }, // Redirect all other routes to login
            ]),
      ],
    },
  ];

  const router = createBrowserRouter(routes);

  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <RootLayout />, // Wrap everything inside RootLayout
  //     children: [
  //       { path: "/", element: <UsersPage /> },
  //       { path: "/:userId/places", element: <UserPlacesPage /> },
  //       { path: "/places/new", element: <NewPlacePage /> },
  //       { path: "/places/:placeId", element: <UpdatePlacePage /> },
  //       { path: "/auth", element: <AuthPage /> },
  //     ],
  //     errorElement: <ErrorPage />, // Show the custom error page on errors
  //   },
  // ]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userId }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}

export default App;
