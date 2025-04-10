import { useCallback, useState, useEffect } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UsersPage from "./users/pages/Users";
import NewPlacePage from "./places/pages/NewPlace";
import ErrorPage from "./shared/RootPage/Error";
import RootLayout from "./shared/RootPage/RootLayout";
import UserPlacesPage from "./places/pages/UserPlaces";
import UpdatePlacePage from "./places/pages/UpdatePlace";
import AuthPage from "./users/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";

function App() {
  const { token, login, logout, userId } = useAuth();

  const routes = [
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { path: "/", element: <UsersPage /> },
        ...(token
          ? [
              { path: "/places/new", element: <NewPlacePage /> },
              { path: "/places/:placeId", element: <UpdatePlacePage /> },
              { path: "/:userId/places", element: <UserPlacesPage /> },
            ]
          : [
              { path: "/:userId/places", element: <UserPlacesPage /> },

              { path: "/auth", element: <AuthPage /> },
              { path: "*", element: <AuthPage /> },
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
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token, login, logout, userId }}
    >
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}

export default App;
