"use client";

import React from "react";
import Link from "next/link";
import { config, IMAGES } from "@/config";
import Image from "next/image";
import { useAuth } from "@/hooks";

const Header = () => {
  const { isAuth } = useAuth();
  return (
    <div className="header-area">
      <div className="container">
        <div className="row">
          <div className="col-md-3 align-self-center">
            <div className="logo d-lg-inline-block d-none">
              <Link className="initiate-scripts" href={"/online"}>
                <Image
                  src={IMAGES.logo}
                  height={60}
                  alt="img"
                />
              </Link>
            </div>
          </div>
          <div className="col-lg-9 col-md-12 text-lg-right text-center">
            <div className="media d-sm-inline-flex m-0">
              <div className="media-left align-self-center">
                <Image
                  src={IMAGES.phone_img}
                  alt="phone"
                />
              </div>
              <div className="media-body text-left">
                <p>Free Call To Us:</p>
                <p>{config.siteMobile}</p>
              </div>
            </div>
            <div className="media d-sm-inline-flex">
              <div className="media-left align-self-center">
                <Image
                  src={IMAGES.clock_img}
                  alt="phone"
                />
              </div>
              <div className="media-body text-left">
                <p>Open Time: </p>
                <p>{config.siteOpenHours}</p>
              </div>
            </div>
            {
              isAuth ? <Link href={"/online"} className={"btn btn-round d-lg-inline-block d-none"}>Banking Dashboard</Link>
                :
                <Link href={config.siteLoginUrl}
                  className={"btn btn-round d-lg-inline-block d-none"}
                >
                  Internet Banking Login
                </Link>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
