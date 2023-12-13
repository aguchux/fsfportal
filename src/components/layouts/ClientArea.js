import React, {Component} from "react";

class ClientArea extends Component {
    render() {
        return (
            <div className="client-area pd-bottom-70">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <div className="section-title">
                                <h6 className="subtitle subtitle-thumb">Valuable Stpeech</h6>
                                <h2 className="title">What Our Client Say?</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-12">
                            <div className="client-slider">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="client-slider-item">
                                            <div className="media">
                                                <img src={process.env.PUBLIC_URL + '/assets/img/client/1.png'} alt="client" />
                                                <div className="media-body">
                                                    <h6>Robert Spears</h6>
                                                    <p>CTO of Bank</p>
                                                </div>
                                            </div>
                                            <p className="client-content">Voluptatum nobis obcaecati perferendis dolor totam unde dolores quod maxime corporis officia et. Distinctio assumenda minima maiores.</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="client-slider-item">
                                            <div className="media">
                                                <img src={process.env.PUBLIC_URL + '/assets/img/client/2.png'} alt="client" />
                                                <div className="media-body">
                                                    <h6>Bruce Rogers</h6>
                                                    <p>CEO at Bank</p>
                                                </div>
                                            </div>
                                            <p className="client-content">Voluptatum nobis obcaecati perferendis dolor totam unde dolores quod maxime corporis officia et. Distinctio assumenda minima maiores.</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="client-slider-item">
                                            <div className="media">
                                                <img src={process.env.PUBLIC_URL + '/assets/img/client/3.png'} alt="client" />
                                                <div className="media-body">
                                                    <h6>Christine Aguilar</h6>
                                                    <p>Founder at Bank</p>
                                                </div>
                                            </div>
                                            <p className="client-content">Voluptatum nobis obcaecati perferendis dolor totam unde dolores quod maxime corporis officia et. Distinctio assumenda minima maiores.</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="client-slider-item">
                                            <div className="media">
                                                <img src={process.env.PUBLIC_URL + '/assets/img/client/2.png'} alt="client" />
                                                <div className="media-body">
                                                    <h6>Bruce Rogers</h6>
                                                    <p>CEO at Bank</p>
                                                </div>
                                            </div>
                                            <p className="client-content">Voluptatum nobis obcaecati perferendis dolor totam unde dolores quod maxime corporis officia et. Distinctio assumenda minima maiores.</p>
                                        </div>
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

export default ClientArea;