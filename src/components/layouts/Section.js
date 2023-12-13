import React from "react";
import Preloader from "./Preloader";
import Signin from "../auth/Signin";
import Signup from "../auth/Signup";
import Topbar from "./Topbar";
import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Head from "next/head";

export const Section = ({ children }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Preloader />
      <Signin />
      <Signup />
      <Topbar />
      <Header />
      <Navbar />
      {children}
      <Footer />

    </>
  );
};
