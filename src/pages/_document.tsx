import { Html, Head, Main, NextScript } from 'next/document'
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script src="/assets/js/vendor.js" strategy="beforeInteractive" />
        <Script
          src="/assets/js/jquery.nice-select.min.js"
          strategy="lazyOnload"
        />
        <Script
          src="/assets/js/jquery.magnific-popup.min.js"
          strategy="lazyOnload"
        />
        <Script src="/assets/js/counter.js" strategy="lazyOnload" />
        <Script src="/assets/js/main.js" strategy="lazyOnload" />
        <Script src="/assets/js/jquery.waypoints.js" strategy="afterInteractive" />

      </body>
    </Html>
  )
}
