import Image from "next/future/image";

import { Container } from "@/components/landing/Container";
import logoEtherfuse from "@/public/landingimages/logos/etherfuse.png";
import logoSolana from "@/public/landingimages/logos/solanalogo.png";
import hellomoonblack from "@/public/landingimages/logos/hellomoonblack.png";
import itesm from "@/public/landingimages/logos/itesm.png";
import superteamlogo from "@/public/landingimages/logos/superteamlogo.png";
import escudoingeneria from "@/public/landingimages/logos/escudoingeneria.png";
import solanau from "@/public/landingimages/logos/solanau.png";
import thincrs from "@/public/landingimages/logos/thincrs.jpg";
import shyft from "@/public/landingimages/logos/shyft.png";
import circle from "@/public/landingimages/logos/circle.png";
import escuelanegocios from "@/public/landingimages/logos/escuelanegocios.png";

import decaf from "@/public/landingimages/logos/decaf.png";
import megahabilidades from "@/public/landingimages/logos/megahabilidades.png";
import ottr from "@/public/landingimages/logos/ottr.png";
import blockchainbusinessschool from "@/public/landingimages/logos/blockchainbusinessschool.png";
import ilum from "@/public/landingimages/logos/ilum.png";
import upiita from "@/public/landingimages/logos/upiita.png";
import lanib from "@/public/landingimages/logos/lanib.jpeg";
import bitso from "@/public/landingimages/logos/bitso.png";
import neefter from "@/public/landingimages/logos/neefter.png";
import agilmentor from "@/public/landingimages/logos/agilmentor.png";
import mirrorworld from "@/public/landingimages/logos/mirrorworld.png";
import wuc from "@/public/landingimages/logos/wuc.png";
import lbank from "@/public/landingimages/logos/lbank.jpeg";
import hxro from "@/public/landingimages/logos/hxro.png";
import alldata from "@/public/landingimages/logos/alldata.png";
import itjimenez from "@/public/landingimages/logos/itjimenez.jpeg";

const mainSponsors = [
  {
    name: "Etherfuse",
    logo: logoEtherfuse,
    url: "https://etherfuse.com/",
  },
  {
    name: "Solana",
    logo: logoSolana,
    url: "https://solana.com",
  },
  {
    name: "itesm",
    logo: itesm,
    url: "https://tec.mx/es/guadalajara",
  },
  {
    name: "escuelanegocios",
    logo: escuelanegocios,
    url: "https://tec.mx/es/guadalajara",
  },
  {
    name: "hxro",
    logo: hxro,
    url: "https://hxro.com",
  },
  {
    name: "superteam",
    logo: superteamlogo,
    url: "https://mx.superteam.fun/",
    extraClassName: "",
  },
];

const secondSponsors = [
  {
    name: "hellomoon",
    logo: hellomoonblack,
    url: "https://hellomoon.io",
  },
  {
    name: "thincrs",
    logo: thincrs,
    url: "https://www.thincrs.com/",
  },
  {
    name: "circle",
    logo: circle,
    url: "https://www.circle.com/en/",
    extraClassName: "",
  },
  {
    name: "shyft",
    logo: shyft,
    url: "https://shyft.to/",
    extraClassName: "",
  },
  {
    name: "solanau",
    logo: solanau,
    url: "https://www.solanau.org/",
    extraClassName: "",
  },
  {
    name: "alldata",
    logo: alldata,
    url: "https://www.alldata.com/",
    extraClassName: "",
  },

  {
    name: "decaf",
    logo: decaf,
    url: "https://www.decaf.so/",
  },

  {
    name: "escudoingeneria",
    logo: escudoingeneria,
    url: "https://www.ingenieria.unam.mx/index.php",
    extraClassName: "w-2/4",
  },
  {
    name: "itjimenez",
    logo: itjimenez,
    url: "http://www.cdjimenez.tecnm.mx/index.html",
    extraClassName: "w-2/4",
  },
  // {
  //   name: "megahabilidades",
  //   logo: megahabilidades,
  //   url: "https://megahabilidades.mx",
  // },
  // {
  //   name: "lanib",
  //   logo: lanib,
  //   url: "https://lanib.mx",
  // },

  // {
  //   name: "ottr",
  //   logo: ottr,
  //   url: "https://ottr.finance/",
  // },

  // {
  //   name: "neefter",
  //   logo: neefter,
  //   url: "https://neefter.com",
  // },
  // {
  //   name: "lbank",
  //   logo: lbank,
  //   url: "https://www.lbanklabs.com",
  // },
  // {
  //   name: "Web3 University Community",
  //   logo: wuc,
  //   url: "",
  // },
  // {
  //   name: "mirrorworld",
  //   logo: mirrorworld,
  //   url: "https://mirrorworld.fun",
  // },
  // {
  //   name: "agilmentor",
  //   logo: agilmentor,
  //   url: "https://agilmentor.com",
  // },

  // {
  //   name: "ilum",
  //   logo: ilum,
  //   url: "https://www.ilumps.com",
  // },
];

export function Sponsors() {
  return (
    <section id="sponsors" aria-label="Sponsors" className="py-32  bg-white ">
      <Container className="bg-white">
        <h2 className="mx-auto max-w-2xl text-center font-display text-4xl font-medium tracking-tighter text-happy-cloralex bg-happy-middark py-4 sm:text-5xl">
          Hackathon Sponsors &amp; Aliados
        </h2>
        <div className="logoscontainer md:my-8 ">
          <div className="px-4 md:px-0 grid max-w-7xl md:-mb-4 grid-cols-1 place-content-center gap-x-32 md:grid-cols-3 md:gap-x-16 lg:gap-x-32 w-full text-center">
            {mainSponsors.map((sponsor) => (
              <div
                className="flex justify-center items-center "
                key={sponsor.name}
              >
                <a
                  href={sponsor?.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center ${sponsor.extraClassName} my-4`}
                >
                  <Image src={sponsor.logo} alt={sponsor.name} unoptimized />
                </a>
              </div>
            ))}
          </div>
          <div className="px-4 my-6 md:px-0 grid max-w-7xl  grid-cols-1 place-content-center sm:grid-cols-3 lg:grid-cols-4 gap-x-8 md:gap-x-16 lg:gap-x-32">
            {secondSponsors.map((sponsor) => (
              <a
                href={sponsor?.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                key={sponsor.name}
                className={`flex items-center justify-center ${sponsor.extraClassName} my-4`}
              >
                <Image src={sponsor.logo} alt={sponsor.name} unoptimized />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
