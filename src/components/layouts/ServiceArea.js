import React, { Component } from "react";
import Link from "next/link";

class ServiceArea extends Component {
  render() {
    return (
      <div className={"service-area default-pd"}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className={"section-title"}>
                <h6 className="subtitle subtitle-thumb">Best Services</h6>
                <h2 className="title">
                  Presenting Banking Plan & Services That are Right For You
                </h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6">
              <div className="single-service">
                <div className="thumb">
                  <img src={"/assets/img/service/01.png"} alt="img" />
                </div>
                <div className="service-details">
                  <h5>
                    <Link className="initiate-scripts" href={"/services"}>
                      Online Banking
                    </Link>
                  </h5>
                  <p>
                      We offer you most secure internet banking services. Access your online banking account and transfer your money at ease.
                  </p>
                  <Link
                    className="angle-btn initiate-scripts"
                    href={"/services"}
                  >
                    <img
                      src={"/assets/img/icon/angle-left-round.png"}
                      alt="icon"
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-service">
                <div className="thumb">
                  <img src={"/assets/img/service/02.png"} alt="img" />
                </div>
                <div className="service-details">
                  <h5>
                    <Link className="initiate-scripts" href={"/services"}>
                      Business Plan/Support
                    </Link>
                  </h5>
                  <p>
                    FSF Bank offers a wide range of banking services to meet your financial needs. Our aim is to help you achieve your business goals.
                  </p>
                  <Link
                    className="angle-btn initiate-scripts"
                    href={"/services"}
                  >
                    <img
                      src={"/assets/img/icon/angle-left-round.png"}
                      alt="icon"
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-service">
                <div className="thumb">
                  <img src={"/assets/img/service/03.png"} alt="img" />
                </div>
                <div className="service-details">
                  <h5>
                    <Link className="initiate-scripts" href={"/services"}>
                      Mobile Banking
                    </Link>
                  </h5>
                  <p>
                    We invite you to take your banking on the go with our mobile banking solutions. No down-time or delays,with 100% SSL security.
                  </p>
                  <Link
                    className="angle-btn initiate-scripts"
                    href={"/services"}
                  >
                    <img
                      src={"/assets/img/icon/angle-left-round.png"}
                      alt="icon"
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-service">
                <div className="thumb">
                  <img src={"/assets/img/service/04.png"} alt="img" />
                </div>
                <div className="service-details">
                  <h5>
                    <Link className="initiate-scripts" href={"/services"}>
                      Anywhere Deposit
                    </Link>
                  </h5>
                  <p>
                    FSFAnywhere Deposit is a secure and convenient way to deposit checks into your FSF Bank accounts anytime, anywhere.
                  </p>
                  <Link
                    className="angle-btn initiate-scripts"
                    href={"/services"}
                  >
                    <img
                      src={"/assets/img/icon/angle-left-round.png"}
                      alt="icon"
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-service">
                <div className="thumb">
                  <img src={"/assets/img/service/05.png"} alt="img" />
                </div>
                <div className="service-details">
                  <h5>
                    <Link className="initiate-scripts" href={"/services"}>
                      Credit & Virtual Cards
                    </Link>
                  </h5>
                  <p>
                    We offer a wide range of credit cards to meet your financial needs. Our credit cards offer you the flexibility and freedom to make purchases.
                  </p>
                  <Link
                    className="angle-btn initiate-scripts"
                    href={"/services"}
                  >
                    <img
                      src={"/assets/img/icon/angle-left-round.png"}
                      alt="icon"
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-service">
                <div className="thumb">
                  <img src={"/assets/img/service/06.png"} alt="img" />
                </div>
                <div className="service-details">
                  <h5>
                    <Link className="initiate-scripts" href={"/services"}>
                      Transaction Monitoring
                    </Link>
                  </h5>
                  <p>
                    Our system ensure you never miss any transactions. We can monitor your transactions and keep you updated at all time on all your devices.
                  </p>
                  <Link
                    className="angle-btn initiate-scripts"
                    href={"/services"}
                  >
                    <img
                      src={"/assets/img/icon/angle-left-round.png"}
                      alt="icon"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ServiceArea;
