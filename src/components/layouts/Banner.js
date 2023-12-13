import React, { Component } from "react";
import Link from "next/link";

class Banner extends Component {
  render() {
    return (
      <div
        className={"banner-area style-one"}
      >
        <div className="banner-slider owl-carousel">
          <div
            className={"item bg-one"}>
            <div className="container">
              <div className="row">
                <div className="col-xl-7 offset-xl-0 col-lg-6 offset-xl-1 offset-lg-1">
                  <div className="banner-inner-area">
                    <h5 className="subtitle">Welcome to First Security Fiance Online Banking</h5>
                    <h1 className="title">
                      Your Trusted Partner in Banking Services.
                    </h1>
                    <p className="brd-1">
                      First Security Finance Bank is fucosed on delivering the best fiancials services to you.</p>
                    
                    <Link
                      className="btn btn-blue initiate-scripts"
                      href={"/pages/about-us"}
                    >
                      Continue
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={"item bg-one"}
          >
            <div className="container">
              <div className="row">
                <div className="col-xl-7 offset-xl-0 col-lg-6 offset-xl-1 offset-lg-1">
                  <div className="banner-inner-area">
                    <h5 className="subtitle">Security First banking system for your business</h5>
                    <h1 className="title">
                      Banking and Loan services for your business.  
                    </h1>
                    <p className="brd-1">
                      Do you need a loan for your business? We are here to help you take your business to the next level.
                     </p>
                    
                    <Link
                      className="btn btn-blue initiate-scripts"
                      href={"/pages/about-us"}
                    >
                      Continue
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Banner;
