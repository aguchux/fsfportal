import React, {Component} from "react";
import Link from "next/link";

class WorkArea extends Component {
    render() {
        return (
            <div className="work-area">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <div className="section-title section-title-2">
                                <h6 className="subtitle subtitle-thumb">Best Banking Services</h6>
                                <h2 className="title">First Security Finance</h2>
                                <p>
                                    We offer you most secure internet banking services. Access your online banking account and transfer your money at ease.                           
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-3 col-md-6">
                            <div className="single-work mt-0 text-center">
                                <div className="work-icon">
                                    <img className="" src={'/assets/img/work/01.png'} alt="icon" />
                                </div>
                                <h5><Link className=" initiate-scripts" href={'/pages/aboout-us'}>About Us</Link></h5>
                                <p>Learn more about First Security Finance Bank. </p>
                                <Link className="angle-btn initiate-scripts" href={'/services'}><img src={'/assets/img/icon/angle-left-round.png'} alt="icon" /></Link>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="single-work mt-md-0 text-center">
                                <div className="work-icon">
                                    <img className="" src={'/assets/img/work/02.png'} alt="icon" />
                                </div>
                                <h5><Link className=" initiate-scripts" href={'/online'}>Online Banking</Link></h5>
                                <p>Get online and secure, anytime and anywhere banking</p>
                                <Link className="angle-btn initiate-scripts" href={'/online'}><img src={'/assets/img/icon/angle-left-round.png'} alt="icon" /></Link>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="single-work text-center">
                                <div className="work-icon">
                                    <img className="" src={'/assets/img/work/03.png'} alt="icon" />
                                </div>
                                <h5><Link className=" initiate-scripts" href={'/pages/loan'}>Instant Loan</Link></h5>
                                <p>We know how much your business needed funding.</p>
                                <Link className="angle-btn" href={'/pages/loan'}><img src={'/assets/img/icon/angle-left-round.png'} alt="icon" /></Link>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="single-work text-center">
                                <div className="work-icon">
                                    <img className="" src={'/assets/img/work/04.png'} alt="icon" />
                                </div>
                                <h5><Link className=" initiate-scripts" href={'/services'}>Get Support</Link></h5>
                                <p>Our advisory team will be available to assist you 24/7.</p>
                                <Link className="angle-btn initiate-scripts" href={'/services'}><img src={'/assets/img/icon/angle-left-round.png'} alt="icon" /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default WorkArea;