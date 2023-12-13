import React, { Component } from "react";
import Link from "next/link";

const AboutArea = () => {
  const [btnBg, setBtnBg] = React.useState("bg-white");
  const stopVideo = (e) => {
    e.preventDefault();
    toggleVideoBtnBg();
    return false;
  };

  const toggleVideoBtnBg = () => {
    if (btnBg === "bg-white") {
      setBtnBg("bg-primary");
    } else {
      setBtnBg("bg-white");
    }
  };

  return (
    <div className="about-us-area pd-0">
      <div className="container">
        <div className="row">
          {/*video-area start*/}
          <div className="col-lg-5 col-md-8 align-self-center">
            <div className="about-us-video">
              <img
                className="thumb"
                src={"/assets/img/video/1.png"}
                alt="img"
              />
              <Link
                className={`play-btn ${btnBg}`}
                href={"#"}
                onClick={stopVideo}
                data-effect="mfp-zoom-in"
              >
                <img src={"/assets/img/video/play-btn.png"} alt="img" />
              </Link>
            </div>
          </div>
          {/*video-area end*/}
          <div className="col-lg-6 offset-lg-1">
            <div className="about-us-details">
              <div className="section-title">
                <h6 className={"subtitle"}>About First Security Finance</h6>
                <h2 className="title">
                  Nothing is impossible.{" "}
                  <strong className="text-success">
                    First Security Finance
                  </strong>{" "}
                  can help you achieve your goals!
                </h2>

                <p>
                  Our Online banking can save you a lot of time and effort, you
                  can undertake most transactions from the comforts of your
                  home.
                </p>
              </div>
              <div className="media media-1">
                <div className={"media-left"}>
                  <img src={"/assets/img/about/01.png"} alt="img" />
                </div>
                <div className="media-body">
                  <p>
                    Bespoke Banking services for your business. We offer a wide
                    range of banking services to meet your financial needs.
                  </p>
                </div>
              </div>
              <div className="media media-2">
                <div className="media-left">
                  <img src={"/assets/img/about/02.png"} alt="img" />
                </div>
                <div className="media-body">
                  <p>
                    We value our customers and we are committed to providing the
                    best customer experience.
                  </p>
                </div>
              </div>
              <Link
                className={"btn btn-blue initiate-scripts"}
                href={"/pages/about-us"}
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutArea;
