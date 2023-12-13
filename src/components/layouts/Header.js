import React from "react";
import Link from "next/link";
import { config} from "@/config";

const Header = () => {
  return (
    <div className="header-area">
      <div className="container">
        <div className="row">
          <div className="col-md-3 align-self-center">
            <div className="logo d-lg-inline-block d-none">
              <Link className="initiate-scripts" href={"/"}>
                <img
                  src={"/assets/img/logo.png"}
                  alt="img"
                />
              </Link>
            </div>
          </div>
          <div className="col-lg-9 col-md-12 text-lg-right text-center">
            <div className="media d-sm-inline-flex m-0">
              <div className="media-left align-self-center">
                <img
                  src={"/assets/img/icon/phone.png"}
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
                <img
                  src={"/assets/img/icon/clock.png"}
                  alt="phone"
                />
              </div>
              <div className="media-body text-left">
                <p>Open Time: </p>
                <p>{config.siteOpenHours}</p>
              </div>
            </div>
            <Link href={config.siteLoginUrl}
              id="account"
              className={"btn btn-round d-lg-inline-block d-none"}
            >
              Internet Banking Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
