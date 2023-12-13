import React, {Component} from "react";

class PartnerArea extends Component {
    render() {
        return (
            <div className="partner-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="partner-slider owl-carousel">
                                <div className="item">
                                    <div className="thumb">
                                        <img src={'/assets/img/partner/01.png'} alt="logo" />
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="thumb">
                                        <img src={'/assets/img/partner/02.png'} alt="logo" />
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="thumb">
                                        <img src={'/assets/img/partner/03.png'} alt="logo" />
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="thumb">
                                        <img src={'/assets/img/partner/04.png'} alt="logo" />
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

export default PartnerArea;