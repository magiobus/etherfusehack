import Head from "next/head";

import { LandingHeader } from "@/components/landing/LandingHeader";
import Landinglayout from "@/components/layouts/LandingLayout";
import { Hero } from "@/components/landing/Hero";
import { Schedule } from "@/components/landing/Schedule";
import { Speakers } from "@/components/landing/Speakers";
import { Sponsors } from "@/components/landing/Sponsors";
export default function Home() {
  return (
    <>
      <Landinglayout fixed={true}>
        <LandingHeader />
        <Hero />
        <Speakers />
        <Schedule />
        <Sponsors />
      </Landinglayout>
    </>
  );
}
