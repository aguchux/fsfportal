"use client";

import React from "react";
import { config } from "@/config";
import Link from "next/link";
import { getCookie } from "cookies-next";

const Topbar = () => {
    const token = getCookie('token');
    return (
        <div className={'topbar-area'}>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 align-self-center">
                        <div className="topbar-left text-md-left text-center">
                            <p><i className="fa fa-map-marker" />{config.siteAddress}</p>
                        </div>
                    </div>
                    <div className="col-md-6 text-md-right text-center">
                        <div className="topbar-right gap-3">
                            {token && <Link className="text-white mx-2" href={config.siteLogoutUrl}><i className="fa fa-sign-out" />Logout</Link>}
                            {/* <Link className="text-white mx-2" href={config.siteLoginUrl}> <i className="fa fa-user" />Login</Link>
                            <Link className="text-white mx-2" href={config.siteRegisterUrl}><i className="fa fa-user-plus" />Register</Link> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Topbar;