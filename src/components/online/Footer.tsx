"use client";

import React from "react";
import Link from 'next/link';
import { config } from "@/config";
import Image from "next/image";
import { IMAGES } from "@/config";

const Footer = () => {
    return (
        <>
            {/* footer area start */}
            <footer className="footer-area mt-0 pt-5">
                <div className="container">
                    <div className="footer-inner">
                        <div className="row">
                            <div className="col-lg-3 col-md-6">
                                <div className="widget widget-address">
                                    <Link className="widget-title initiate-scripts" href={'/'}>
                                        <Image src={IMAGES.logo_2} alt="logo" />
                                    </Link>
                                    <p>{config.siteFooterAbout}</p>
                                </div>
                            </div>
                            <div className="col-xl-2 col-lg-3 col-md-6 offset-lg-1">
                                <div className="widget widget-links">
                                    <h4 className="widget-title">Links.</h4>
                                    <ul className="widget-list">
                                        <li><Link className="initiate-scripts" href={'/'}>Home</Link></li>
                                        <li><Link className="initiate-scripts" href={'/pages/banking-loans'}>Loans</Link></li>
                                        <li><Link className="initiate-scripts" href={'/pages/about-us'}>About Us</Link></li>
                                        <li><Link className="initiate-scripts" href={'/pages/banking-services'}>Services</Link></li>
                                        <li><Link className="initiate-scripts" href={'/pages/securities-trust'}>Securities</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-2 col-lg-3 col-md-6">
                                <div className="widget widget-about">
                                    <h4 className="widget-title">Orther Links</h4>
                                    <ul className="widget-list">
                                        <li><Link className="initiate-scripts" href={'/pages/credits'}>Credits</Link></li>
                                        <li><Link className="initiate-scripts" href={'/pages/monetary-policy'}>Monetary Policy</Link></li>
                                        <li><Link className="initiate-scripts" href={'/pages/gold-reserve '}>Gold Reserve</Link></li>
                                        <li><Link className="initiate-scripts" href={'/pages/contact-us'}>Sign in</Link></li>
                                        <li><Link className="initiate-scripts" href={config.siteLoginUrl}>Internet Banking</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="widget widget-contact">
                                    <h4 className="widget-title">Contact Us.</h4>
                                    <ul className="widget-list">
                                        <li>{config.siteAddress}</li>
                                        <li>{config.siteEmail}</li>
                                        <li>{config.siteMobile}</li>
                                    </ul>

                                    <ul className="social-area">
                                        <li><Link className="initiate-scripts" href={'/'}><i className="fa fa-facebook" /></Link></li>
                                        <li><Link className="initiate-scripts" href={'/'}><i className="fa fa-twitter" /></Link></li>
                                        <li><Link className="initiate-scripts" href={'/'}><i className="fa fa-linkedin" /></Link></li>
                                        <li><Link className="initiate-scripts" href={'/'}><i className="fa fa-pinterest" /></Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <div className="footer-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 align-self-center">
                            <div className="text-lg-left text-center">
                                <ul>
                                    <li><Link className="initiate-scripts" href={'/pages/terms-conditions'}>Terms & Conditions</Link></li>
                                    <li><Link className="initiate-scripts" href={'/pages/privacy-policy'}>Privacy Policy</Link></li>
                                    <li><Link className="initiate-scripts" href={config.siteLoginUrl}>Internet Login</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6 align-self-center">
                            <div className="copy-right text-lg-right text-center">
                                @ 2020, First Security Finance - all right reserved.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* footer area end */}

            {/* back to top area start */}
            <div className={'back-to-top'}>
                <span className="back-top"><i className="fa fa-angle-double-up" /></span>
            </div>
            {/* back to top area end */}
        </>
    );
}

export default Footer;