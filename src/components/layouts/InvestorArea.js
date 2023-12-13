import React, {Component} from "react";
import {Link} from "react-router-dom";

class InvestorArea extends Component {
    render() {
        return (
            <div className="envestor-area pd-100">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <div className={this.props.design === 'home_2' ? 'section-title section-title-3' : 'section-title'}>
                                <h6 className="subtitle subtitle-thumb">Envestor</h6>
                                <h2 className="title">Top Invester of E-Banking</h2>
                                <p>Bankdipscing elitr, sed diam nonumy eirmod et accusam et justo duo dolores et ea rebum. tet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-12">
                            <div className="envestor-slider owl-carousel">
                                <div className="item">
                                    <div className="single-envestor text-center">
                                        <img src={process.env.PUBLIC_URL + '/assets/img/envestor/01.png'} alt="img" />
                                        <h6 className="name">MD. Preston Rati</h6>
                                        <p>Top Invester</p>
                                        <ul className="social-area">
                                            <li><Link to={'/services'}><i className="fa fa-facebook initiate-scripts" /></Link></li>
                                            <li><Link to={'/services'}><i className="fa fa-twitter initiate-scripts" /></Link></li>
                                            <li><Link to={'/services'}><i className="fa fa-linkedin initiate-scripts" /></Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="single-envestor text-center">
                                        <img src={process.env.PUBLIC_URL + '/assets/img/envestor/02.png'} alt="img" />
                                        <h6 className="name">K.D Linux Maxon</h6>
                                        <p>Top Invester</p>
                                        <ul className="social-area">
                                            <li><Link to={'/services'}><i className="fa fa-facebook  initiate-scripts" /></Link></li>
                                            <li><Link to={'/services'}><i className="fa fa-twitter initiate-scripts" /></Link></li>
                                            <li><Link to={'/services'}><i className="fa fa-linkedin initiate-scripts" /></Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="single-envestor text-center">
                                        <img src={process.env.PUBLIC_URL + '/assets/img/envestor/03.png'} alt="img" />
                                        <h6 className="name">MD. Preston Rati</h6>
                                        <p>Top Invester</p>
                                        <ul className="social-area">
                                            <li><Link to={'/services'}><i className="fa fa-facebook initiate-scripts" /></Link></li>
                                            <li><Link to={'/services'}><i className="fa fa-twitter initiate-scripts" /></Link></li>
                                            <li><Link to={'/services'}><i className="fa fa-linkedin initiate-scripts" /></Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="single-envestor text-center">
                                        <img src={process.env.PUBLIC_URL + '/assets/img/envestor/04.png'} alt="img" />
                                        <h6 className="name">Man Mushiy</h6>
                                        <p>Top Invester</p>
                                        <ul className="social-area">
                                            <li><Link to={'/services'}><i className="fa fa-facebook initiate-scripts" /></Link></li>
                                            <li><Link to={'/services'}><i className="fa fa-twitter initiate-scripts" /></Link></li>
                                            <li><Link to={'/services'}><i className="fa fa-linkedin initiate-scripts" /></Link></li>
                                        </ul>
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

export default InvestorArea;