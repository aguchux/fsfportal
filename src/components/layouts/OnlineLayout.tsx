import Preloader from "./Preloader";
import Topbar from "./Topbar";
import Header from "./Header";
import Navbar from "../online/Navbar";
import Footer from "./Footer";
import Head from "next/head";

interface OnlineProps {
    children: React.ReactNode;
}

export const OnlineLayout = ({ children }: OnlineProps) => {
    return (
        <>
            <Head>
                <title>FSF Online</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="apple-touch-icon" sizes="57x57" href="/assets/icons/apple-icon-57x57.png" />
                <link rel="apple-touch-icon" sizes="60x60" href="/assets/icons/apple-icon-60x60.png" />
                <link rel="apple-touch-icon" sizes="72x72" href="/assets/icons/apple-icon-72x72.png" />
                <link rel="apple-touch-icon" sizes="76x76" href="/assets/icons/apple-icon-76x76.png" />
                <link rel="apple-touch-icon" sizes="114x114" href="/assets/icons/apple-icon-114x114.png" />
                <link rel="apple-touch-icon" sizes="120x120" href="/assets/icons/apple-icon-120x120.png" />
                <link rel="apple-touch-icon" sizes="144x144" href="/assets/icons/apple-icon-144x144.png" />
                <link rel="apple-touch-icon" sizes="152x152" href="/assets/icons/apple-icon-152x152.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/apple-icon-180x180.png" />
                <link rel="icon" type="image/png" sizes="192x192" href="/assets/icons/android-icon-192x192.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/assets/icons/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="96x96" href="/assets/icons/favicon-96x96.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/assets/icons/favicon-16x16.png" />
                <link rel="manifest" href="/assets/icons/manifest.json" />
                <meta name="msapplication-TileColor" content="#ffffff" />
                <meta name="msapplication-TileImage" content="/assets/icons/ms-icon-144x144.png" />
                <meta name="theme-color" content="#ffffff" />
            </Head>
            <Preloader />
            <Topbar />
            <Header />
            <Navbar />
            <section className="m-0 py-10 bg-gray-200">
                <div className="container ">{children}</div>
            </section>
            <Footer />
        </>
    );
};
