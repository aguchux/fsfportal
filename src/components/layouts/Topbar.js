import React from "react";
import { config } from "@/config";
import Link from "next/link";

import { useAuth } from "@/hooks";
const Topbar = () => {
    const { isAuth, logout } = useAuth();
    const logMeOut = () =>{
        logout(config.siteLogoutUrl);
    }
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
                        <div className="topbar-right gap-2">
                            {isAuth ?
                                <>
                                    <Link className="text-white mx-2" href={config.siteLogoutUrl} onClick={logMeOut}><i className="fa fa-sign-out" />Logout</Link>
                                </>
                                :
                                <>
                                    <Link className="text-white mx-2" href={config.siteLoginUrl}> <i className="fa fa-user" />Login</Link>
                                    <Link className="text-white mx-2" href={config.siteRegisterUrl}><i className="fa fa-user-plus" />Register</Link>
                                </>
                            }
                            <Link className="text-white mx-1" href={'/pages/contact-us'}><i className="fa fa-phone" />Contact</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Topbar;