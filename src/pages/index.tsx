import { Section } from "@/components/layouts/Section";
import Banner from "@/components/layouts/Banner";
import MoneyOption from "@/components/layouts/MoneyOption";
import AboutArea from "@/components/layouts/AboutArea";
import ServiceArea from "@/components/layouts/ServiceArea";
import WorkArea from "@/components/layouts/WorkArea";
import { config } from "@/config";
import Head from "next/head";

export default function Home() {
  return (
    <Section>
      <Head>
        <title>{`Home - ${config.siteTitle}`}</title>
        <meta name="description" content="Home" />
      </Head>
      <Banner />
      <MoneyOption />
      <AboutArea />
      <ServiceArea />
      <WorkArea />
    </Section>
  );
}
