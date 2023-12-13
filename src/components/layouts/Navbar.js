import React, { useMemo } from "react";
import Link from "next/link";
import { config, menus } from "@/config";

const Navbar = () => {
  // filter menu where show==true
  const allMenus = useMemo(() => {
    return menus.filter((menu) => menu.show);
  }, []);
  return (
    <div className="navbar-area bg-one">
      
      <nav className="navbar navbar-area navbar-expand-lg">
        <div className="container nav-container">
          <div className="responsive-mobile-menu">
            <button
              className="menu toggle-btn d-block d-lg-none"
              data-target="#banlank_main_menu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="icon-left" />
              <span className="icon-right" />
            </button>
          </div>
          <div className="logo d-block d-lg-none">
            <Link className="initiate-scripts" href={"/"}>
              <img src={"/assets/img/logo.png"} alt="img" />
            </Link>
          </div>
          <div className="nav-right-part nav-right-part-mobile">
            <Link className="btn btn-round" href={config.siteLoginUrl}>
              Internet Banking Login
            </Link>
          </div>
          <div className="collapse navbar-collapse" id="banlank_main_menu">
            <ul className="navbar-nav menu-open">
              <li className="current-menu-item">
                <Link className="initiate-scripts" href={"/"}>
                  Home
                </Link>
              </li>
              {allMenus.map((menu, index) => (
                <li key={index}>
                  <Link
                    className="initiate-scripts"
                    href={`/pages/${menu.slug}`}
                  >
                    {menu.name}
                  </Link>
                </li>
             ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
