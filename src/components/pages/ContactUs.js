import React from "react";
import { config } from "@/config";
const ContactUs = () => {
  const [contactInfo, setContactInfo] = React.useState({});

  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log(contactInfo);
    return false;
  };

  return (
    <>
      <div className="blog_details mt-0 pt-0">
        <div className="contact-page-content-area mt-0 pt-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6">
                <div className="single-contact-info-box">
                  <div className="icon">
                    <i className="fa fa-map-marker" />
                  </div>
                  <div className="content">
                    <h5 className="title">Address:</h5>
                    <span className="details">
                     {config.siteAddress}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="single-contact-info-box">
                  <div className="icon">
                    <i className="fa fa-phone" />
                  </div>
                  <div className="content">
                    <h5 className="title">Phone & Fax</h5>
                    <span className="details">{config.siteMobile}</span>
                    <span className="details">{config.siteMobile}</span>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6">
                <div className="single-contact-info-box">
                  <div className="icon">
                    <i className="fa fa-envelope" />
                  </div>
                  <div className="content">
                    <h5 className="title">Email Address</h5>
                    <span className="details">{config.siteEmail}</span>
                    <span className="details">-</span>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>

        <section className="contact-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="contact-bottom-inner">
                  {/* contact bottom inner */}
                  <div className="row justify-content-center">
                    <div className="col-lg-8">
                      <div className="form-content-area">
                        {/* right content area */}
                        <h3 className="title text-center">Contact Us</h3>
                        <div className="contact-form-wrapper">
                          <form
                            method="POST"
                            id="contact_form"
                            className="contact-form"
                            onSubmit={handleContactSubmit}
                          >
                            <div className="row">
                              <div className="col-lg-6">
                                <div className="form-element ">
                                  <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={contactInfo.name}
                                    placeholder="Name"
                                    className="input-field borderd"
                                    onChange={(e) => setContactInfo({...contactInfo, name: e.target.value})}

                                  />
                                </div>
                                <div className="form-element ">
                                  <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={contactInfo.email}
                                    placeholder="Email"
                                    className="input-field borderd"
                                    onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}

                                  />
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-element ">
                                  <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    required
                                    value={contactInfo.company}
                                    placeholder="Company"
                                    className="input-field borderd"
                                    onChange={(e) => setContactInfo({...contactInfo, company: e.target.value})}

                                  />
                                </div>
                                <div className="form-element ">
                                  <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    required
                                    value={contactInfo.phone}
                                    placeholder="Phone Number"
                                    className="input-field borderd"
                                    onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}

                                  />
                                </div>
                              </div>
                              <div className="col-lg-12">
                                <textarea
                                  rows="10"
                                  cols="30"
                                  id="message"
                                  name="message"
                                  required
                                  value={contactInfo.message}
                                  placeholder="How can we help?"
                                  className="input-field borderd textarea"
                                  onChange={(e) => setContactInfo({...contactInfo, message: e.target.value})}
                                />
                              </div>
                            </div>
                            <input
                              type="submit"
                              className="btn btn-blue"
                              value="Send a Message"
                            />
                          </form>
                        </div>
                      </div>
                      {/* //.right content area */}
                    </div>
                  </div>
                </div>
                {/* contact bottom inner */}
              </div>
              {/* //.col-lg-12 */}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactUs;
