import React, {Component} from "react";

class SignupArea extends Component {
    render() {
        return (
            <div className="container">
                <div className={'sign-up-area'}>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="media align-items-center">
                                <div className="media-left">
                                    <i className="fa fa-envelope-o" />
                                </div>
                                <div className="media-body">
                                    <h5>SignUp For Newsletter</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <form className="d-md-inline-flex">
                                <div className="form-group">
                                    <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Your mail here" />
                                </div>
                                <button type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignupArea;