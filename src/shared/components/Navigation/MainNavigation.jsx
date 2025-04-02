import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import "./MainNavigation.css";
import NavLinks from "./NavLinks";

export default function MainNavigation() {
  return (
    <MainHeader>
      <button className="main-navigation__menu-btn">
        <span />
        <span />
        <span />
      </button>
      <h1 className="main-navigation__title">
        <Link to="/">Your Places</Link>
      </h1>
      <nav>
        <NavLinks />
      </nav>
    </MainHeader>
  );
}

// import React, { useState } from "react";
// import "./MainNavigation.css";

// const MainNavigation = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   const toggleMenuHandler = () => {
//     setMenuOpen((prev) => !prev);
//   };

//   return (
//     <header className="main-navigation">
//       <button
//         className={`main-navigation__menu-btn ${menuOpen ? "open" : ""}`}
//         onClick={toggleMenuHandler}
//       >
//         <span></span>
//         <span></span>
//         <span></span>
//       </button>
//       <h1 className="main-navigation__title">
//         <a href="/">MyWebsite</a>
//       </h1>
//       <nav className={`main-navigation__header-nav ${menuOpen ? "show" : ""}`}>
//         <ul>
//           <li>
//             <a href="/">Home</a>
//           </li>
//           <li>
//             <a href="/about">About</a>
//           </li>
//         </ul>
//       </nav>
//     </header>
//   );
// };

// export default MainNavigation;
