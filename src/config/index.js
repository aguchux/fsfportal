import AboutUs from "@/components/pages/AboutUs";
import BankinLoans from "@/components/pages/BankinLoans";
import BankingServices from "@/components/pages/BankingServices";
import ContactUs from "@/components/pages/ContactUs";
import Credits from "@/components/pages/Credits";
import GoldReserve from "@/components/pages/GoldReserve";
import MonetaryPolicy from "@/components/pages/MonetaryPolicy";
import PrivacyPolicy from "@/components/pages/PrivacyPolicy";
import SecurityTrust from "@/components/pages/SecurityTrust";
import TermsCondition from "@/components/pages/TermsCondition";


export const IMAGES = {
  favicon: require("@assets/img/favicon.png"),
  logo: require("@assets/img/logo.png"),
  logo_2: require("@assets/img/logo-2.png"),
  phone_img : require("@assets/img/icon/phone.png"),
  clock_img : require("@assets/img/icon/clock.png"),
}

export const config = {
  siteTitle: "First Security Fianance",
  siteDescription: "First Security Fianance",
  siteUrl: "http://blueimp.github.com/jQuery-File-Upload/",
  demoUrl: "http://blueimp.github.com/jQuery-File-Upload/",
  siteAddress: "Grand Central Plaza 60 E 42nd St,New York, NY 10165, USA",
  siteEmail: "info@fsfbankonline.com",
  siteMobile: "+17402096907",
  siteOpenHours: "Mon-Fri (10 AM - 6 PM)",
  siteFooterAbout:
    "First Security Finance Bank has been at the forefront of providing reliable and innovative financial solutions to individuals, businesses, and communities across the United States.",
  siteLoginUrl: "/auth",
  siteRegisterUrl: "/auth",
  siteLogoutUrl: "/auth",
};

export const menus = [
  {
    id: "banking-loans",
    name: "Banking & Loans",
    tile: "Banking & Loans",
    slug: "banking-loans",
    component: BankinLoans,
    show: true,
    fullPage:false 
  },
  {
    id: "about",
    name: "About Us",
    tile: "About Us",
    slug: "about-us",
    component: AboutUs,
    show: true,
    fullPage:false 
  },
  {
    id: "banking",
    name: "Banking Services",
    tile: "Services",
    slug: "banking-services",
    component: BankingServices,
    show: true,
    fullPage:false 
  },
  {
    id: "securities",
    name: "Securities & Trust",
    tile: "Securities & Trust",
    slug: "securities-trust",
    component: SecurityTrust,
    show: true,
    fullPage:false 
  },
  {
    id: "credits",
    name: "Credits",
    tile: "Credits",
    slug: "credits",
    component: Credits,
    show: true,
    fullPage:false 
  },
  {
    id: "monetary",
    name: "Monetary policy",
    tile: "Monetary policy",
    slug: "monetary-policy",
    component: MonetaryPolicy,
    show: true,
    fullPage:false 
  },
  {
    id: "gold",
    name: "Gold",
    tile: "Gold Reserve",
    slug: "gold-reserve",
    component: GoldReserve,
    show: true,
    fullPage:false 
  },
  {
    id: "contact",
    name: "Contact Us",
    tile: "Contact Us",
    slug: "contact-us",
    component: ContactUs,
    show: true,
    fullPage:true 
  },
  {
    id: "faq",
    name: "FAQ",
    tile: "FAQ",
    slug: "faq",
    component: ContactUs,
    show: false,
    fullPage:false 
  },
  {
    id: "terms",
    name: "Terms & Conditions",
    tile: "Terms & Conditions",
    slug: "terms-conditions",
    component: TermsCondition,
    show: false,
    fullPage:false 
  },
  {
    id: "privacy",
    name: "Privacy Policy",
    tile: "Privacy Policy",
    slug: "privacy-policy",
    component: PrivacyPolicy,
    show: false,
  }
];
