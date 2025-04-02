import { Outlet } from "react-router-dom";
import MainNavigation from "../components/Navigation/MainNavigation";

const RootLayout = () => {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet /> {/* This renders the nested route content dynamically */}
      </main>
    </>
  );
};

export default RootLayout;
