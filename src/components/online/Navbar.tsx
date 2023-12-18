"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { IMAGES, config, menus } from "@/config";
import Image from "next/image";
import { useAuth } from "@/hooks";

const Navbar = () => {
  const { logout, client } = useAuth();

  const doLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    logout("/auth");
  }
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
              <Image src={IMAGES.logo} alt="" />
            </Link>
          </div>
          <div className="nav-right-part nav-right-part-mobile">
            <Link className="btn btn-round" href={config.siteLoginUrl}>
              Internet Banking Login
            </Link>
          </div>
          <div className="collapse navbar-collapse" id="banlank_main_menu">
            <ul className="navbar-nav menu-open text-center">
              <li className="current-menu-item">
                <Link className="initiate-scripts" href={"/online"}>
                  <i className="fa fa-cog"></i>Dashboard
                </Link>
              </li>

              <li className="current-menu-item">
                <Link className="initiate-scripts" href={"/online/transactions"}>
                  <i className="fa fa-list"></i> Transactions
                </Link>
              </li>

              <li className="current-menu-item">
                <Link className="initiate-scripts" href={"/online/loans"}>
                  <i className="fa fa-cc"></i> Loans
                </Link>
              </li>

              <li className="current-menu-item">
                <Link className="initiate-scripts" href={"/online/profile"}>
                  <i className="fa fa-user"></i> Profile
                </Link>
              </li>

              {client?.isAdmin && (
                <>
                  <li className="current-menu-item">
                    <Link className="initiate-scripts text-green-600 hover:text-green-800" href={"/online/clients"}>
                      <i className="fa fa-user text-green-600"></i> Clients
                    </Link>
                  </li>
                  <li className="current-menu-item">
                    <Link className="initiate-scripts text-green-600 hover:text-green-800" href={"/online/clients-t"}>
                      <i className="fa fa-close"></i> Transactions
                    </Link>
                  </li>
                </>
              )}
              <li className="current-menu-item">
                <Link onClick={doLogout} className="initiate-scripts" href={"#"}>
                  <i className="fa fa-close"></i> Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
