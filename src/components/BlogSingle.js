import React from "react";
import BlogSidebarArea from "./layouts/BlogSidebarArea";

const BlogSingle = ({ children, fullPage }) => {
  return (
    <section className="blog_area single-post-area section-padding mt-0 pt-0">
      <div className="container">
        <div className="row">
          <div
            className={
              fullPage ? `col-lg-12 posts-list` : `col-lg-8 posts-list`
            }
          >
            <div className="single-post">{children}</div>
          </div>

          {!fullPage && (
            <div className="col-lg-4 posts-list">
              <BlogSidebarArea />
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default BlogSingle;
