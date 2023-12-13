import React, {Component} from "react";
import {Link} from "react-router-dom";

class ApplyLoanArea extends Component {
    render() {
        return (
            <>
                {/*service-area start*/}
                <div className="service-area default-pd">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8 text-center">
                                <div className="section-title">
                                    <h6 className="subtitle subtitle-thumb">How it Works</h6>
                                    <h2 className="title">We provide online instant cash loans with quick approval that suit your term</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-md-6">
                                <div className="single-service">
                                    <div className="thumb">
                                        <img src={process.env.PUBLIC_URL + '/assets/img/service/03.png'} alt="img" />
                                    </div>
                                    <div className="service-details">
                                        <h5><Link className="initiate-scripts" to={'apply-loan'}>Apply for loan</Link></h5>
                                        <p>Lorem ipsum dolor sit ametcteturs adipiscing elieiusi ncididunt ut labore et dol oremagna.</p>
                                        <Link className="angle-btn initiate-scripts" to={'/apply-loan'}><img src={process.env.PUBLIC_URL + '/assets/img/icon/angle-left-round.png'} alt="icon" /></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="single-service">
                                    <div className="thumb">
                                        <img src={process.env.PUBLIC_URL + '/assets/img/service/01.png'} alt="img" />
                                    </div>
                                    <div className="service-details">
                                        <h5><Link className="initiate-scripts" to={'/apply-loan'}>Application review</Link></h5>
                                        <p>Lorem ipsum dolor sit ametcteturs adipiscing elieiusi ncididunt ut labore et dol oremagna.</p>
                                        <Link className="angle-btn initiate-scripts" to={'/apply-loan'}><img src={process.env.PUBLIC_URL + '/assets/img/icon/angle-left-round.png'} alt="icon" /></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="single-service">
                                    <div className="thumb">
                                        <img src={process.env.PUBLIC_URL + '/assets/img/service/06.png'} alt="img" />
                                    </div>
                                    <div className="service-details">
                                        <h5><Link className="initiate-scripts" to={'/apply-loan'}>Get funding fast</Link></h5>
                                        <p>Lorem ipsum dolor sit ametcteturs adipiscing elieiusi ncididunt ut labore et dol oremagna.</p>
                                        <Link className="angle-btn initiate-scripts" to={'/apply-loan'}><img src={process.env.PUBLIC_URL + '/assets/img/icon/angle-left-round.png'} alt="icon" /></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*service-area end*/}

                {/* apply_loan_start  */}
                <div className="apply_loan">
                    <div className="overlay" />
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-lg-8 col-md-10">
                                <div className="loan_text wow fadeInLeft text-lg-left text-center" data-wow-duration="1s" data-wow-delay=".3s">
                                    <h3>Apply for a Loan for your startup, education or company</h3>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="loan_btn text-lg-right text-center wow fadeInUp" data-wow-duration="1.2s" data-wow-delay=".4s">
                                    <Link to={'apply-loan'} className="btn btn-blue initiate-scripts">Apply Now</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* apply_loan_end  */}
            </>
        );
    }
}

export default ApplyLoanArea;