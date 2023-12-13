import React, { useState } from "react";

const BlogSidebarArea = () =>{
    const [email, setEmail] = useState('');
    const handleSFS = (e)=>{
        e.preventDefault();
        return;
    }
        return (
            <div className="blog_right_sidebar">


                <aside className="single_sidebar_widget newsletter_widget">
                    <h4 className="widget_title">FSFB Newsletter</h4>

                    <form onSubmit={handleSFS}>
                        <div className="form-group">
                            <input type="email" value={email} className="form-control" placeholder='Enter email' required onChange={
                                (e) => setEmail(e.target.value)   
                            } />
                        </div>
                        <button
                            className="btn btn-blue button rounded-0 primary-bg text-white w-100 btn_1 boxed-btn"
                            type="submit">Subscribe to FSFB
                        </button>
                    </form>
                </aside>
            </div>
        );
    }

export default BlogSidebarArea;