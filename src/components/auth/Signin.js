import React from "react";
import Link from "next/link";

const Signin = ()=> {
        return (
            <>
                <div className="body-overlay" id="body-overlay" />
                <div className="signin-signup-popup">
                    <span className="cross-icon ti-close" />
                    <div className="signin-signup-part signin-part">
                        <h4>Sing in</h4>
                        <p>Is we miles ready he might going. Own books built put civil fully blind fanny.</p>
                        <form action="#" className="form-style-02">
                            <span className="input-title">Email</span>
                            <input type="email" placeholder="Your email address" />
                            <Link href={'/'} className="forget-password-link initiate-scripts">Forget password?</Link>
                            <span className="input-title">Password</span>
                            <input type="password" placeholder="Password" />
                            <button type="submit" value="Submit" className="template-large-button">Sing in</button>
                            <div className="form-popup-bottom">You are new user <span className="when-click-change-signup-inner">Sing up</span></div>
                        </form>
                    </div>
                </div>
            </>
        );
    }

export default Signin;