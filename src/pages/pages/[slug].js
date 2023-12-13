import { Section } from "@/components/layouts/Section";
import BreadcrumbArea from "@/components/layouts/BreadcrumbArea";
import { useRouter } from "next/router";
import { menus } from "@/config";
import { useEffect, useMemo, useState } from "react";
import BlogSingle from "@/components/BlogSingle";
import Head from "next/head";
import { config } from "@/config";

export default function Home() {
  const { query , isReady} = useRouter();
  const [pageInfo, setPageInfo] = useState({
    title: "",
    description: "",
    slug: "",
    component: null,
    fullPage: false,
  });

  const {slug} = query;
  const page = useMemo(() => menus.find((menu) => menu.slug === slug), [slug]);

  useEffect(() => {
    if (isReady && page) {
      setPageInfo({
        title: page?.name,
        description: page?.description,
        slug: page?.slug,
        component: page?.component,
        fullPage: page?.fullPage,
      });
    }
  }
  , [isReady, page]);


  return (
    <Section>
      <Head>
        <title>
          {`${pageInfo.title} - ${config.siteTitle}`}
        </title>
        <meta name="description" content={pageInfo?.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BreadcrumbArea slug={pageInfo?.slug} title={pageInfo?.title} />
      <BlogSingle fullPage={pageInfo?.fullPage}>
        {pageInfo?.component && <pageInfo.component />}
      </BlogSingle>
    </Section>
  );
}
