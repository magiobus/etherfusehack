import Head from "next/head";

import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Newsletter } from "@/components/landing/Newsletter";
import { Schedule } from "@/components/landing/Schedule";
import { Speakers } from "@/components/landing/Speakers";
import { Sponsors } from "@/components/landing/Sponsors";

export default function Home() {
  return (
    <>
      <Head>
        <title>DeceptiConf - A community-driven design conference</title>
        <meta
          name="description"
          content="At DeceptiConf you’ll learn about the latest dark patterns being developed to trick even the smartest visitors, and you’ll learn how to deploy them without ever being detected."
        />
      </Head>
      <Header />
      <main>
        <Hero />
        <Speakers />
        <Schedule />
        <Sponsors />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
