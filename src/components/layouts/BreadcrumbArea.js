import React, {Component} from "react";
import Link from 'next/link';

const BreadcrumbArea = ({slug='',title=''})=> {
        return (
            <div className="breadcrumb_area">
                <div className="breadcrumb_inner d-flex align-items-center">
                    <div className="container">
                        <div className="breadcrumb_content">
                            <h2>{title}</h2>
                            <div className="page_link">
                                <Link className="initiate-scripts" href={'/'}>Home</Link>
                                <Link className="initiate-scripts" href={'/'}>{slug}</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

export default BreadcrumbArea;