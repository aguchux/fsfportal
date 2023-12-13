import React, {Component} from "react";
import Link from 'next/link'

class MoneyOption extends Component {
    render() {
        return (
            <div className="money-option-area">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-3 col-md-6">
                            <div className="single-work mt-0 text-center">
                                <div className="work-icon">
                                    <img className="" src={'/assets/img/icon/arrow-down.png'} alt="icon" />
                                </div>
                                <h5><Link className="initiate-scripts" href={'/apply-loan'}>eBanking</Link></h5>
                                <p>
                                  Multi-channel eBanking platform that provides you with security 24/7.
                                </p>
                                <Link className="angle-btn initiate-scripts" href={'/apply-loan'}><img src={ '/assets/img/icon/angle-left-round.png'} alt="icon" /></Link>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="single-work mt-md-0 text-center">
                                <div className="work-icon">
                                    <img className="" src={'/assets/img/icon/arrow-right.png'} alt="icon" />
                                </div>
                                <h5><Link className="initiate-scripts" href={'/apply-loan'}>Instant Loans</Link></h5>
                                <p>
                                    Our loan services are flexible and easily accessible to every business.
                                </p>
                                <Link className="angle-btn initiate-scripts" href={'/apply-loan'}><img src={'/assets/img/icon/angle-left-round.png'} alt="icon" /></Link>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="single-work text-center">
                                <div className="work-icon">
                                    <img className="" src={'/assets/img/icon/card.png'} alt="icon" />
                                </div>
                                <h5><Link className="initiate-scripts" href={'/apply-loan'}>Credit Cards</Link></h5>
                                <p>
                                    We offer a wide range of credit cards to meet your financial needs.
                                </p>
                                <Link className="angle-btn initiate-scripts" href={'/apply-loan'}><img src={'/assets/img/icon/angle-left-round.png'} alt="icon" /></Link>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="single-work text-center">
                                <div className="work-icon">
                                    <img className="" src={'/assets/img/icon/exchange.png'} alt="icon" />
                                </div>
                                <h5><Link className="initiate-scripts" href={'/apply-loan'}>Exchange</Link></h5>
                                <p>
                                    Settle your fiscal exhanges right from the comfort of your homes. 
                                </p>
                                <Link className="angle-btn initiate-scripts" href={'/apply-loan'}><img src={'/assets/img/icon/angle-left-round.png'} alt="icon" /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MoneyOption;