import React from "react";

const Signup = () => {
  return (
    <div id="accountForm" className="form_wrapper">
      <span className="subtitle">Best Offer </span>
      <h3 className="title"> Quickly Open Your Account</h3>
      <form>
        <div className="input_field">
          <span>
            <i aria-hidden="true" className="fa fa-user" />
          </span>
          <input
            type="text"
            name="nane"
            placeholder="Your Full Name"
            required
          />
        </div>
        <div className="input_field">
          <span>
            <i aria-hidden="true" className="fa fa-envelope" />
          </span>
          <input type="email" name="email" placeholder="Your Email" required />
        </div>
        <div className="row clearfix">
          <div className="col_half">
            <div className="input_field">
              <span>
                <i aria-hidden="true" className="fa fa-phone" />
              </span>
              <input type="text" name="phone" placeholder="Phone" />
            </div>
          </div>
          <div className="col_half">
            <div className="input_field">
              <span>
                <i aria-hidden="true" className="fa fa-map-marker" />
              </span>
              <input type="text" name="zip" placeholder="Zip Code" required />
            </div>
          </div>
        </div>
        <div className="input_field">
          <span>
            <i className="fa fa-cog" aria-hidden="true" />
          </span>
          <select className="select_option">
            <option>Account Type</option>
            <option>Option 1</option>
            <option>Option 2</option>
          </select>
        </div>
        <input className="button" type="submit" value="Submit" />
      </form>
    </div>
  );
};
export default Signup;
