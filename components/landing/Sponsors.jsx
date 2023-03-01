import Image from "next/future/image";

import { Container } from "@/components/landing/Container";
import logoEtherfuse from "@/public/landingimages/logos/etherfuse.png";
import logoSolana from "@/public/landingimages/logos/solanalogo.png";
import decaf from "@/public/landingimages/logos/decaf.png";
import megahabilidades from "@/public/landingimages/logos/megahabilidades.png";
import ottr from "@/public/landingimages/logos/ottr.png";
import ipn from "@/public/landingimages/logos/ipn.png";
import blockchainbusinessschool from "@/public/landingimages/logos/blockchainbusinessschool.png";
import ilum from "@/public/landingimages/logos/ilum.png";
import upiita from "@/public/landingimages/logos/upiita.png";
import lanib from "@/public/landingimages/logos/lanib.jpeg";
import bitso from "@/public/landingimages/logos/bitso.png";
import neefter from "@/public/landingimages/logos/neefter.png";
import agilmentor from "@/public/landingimages/logos/agilmentor.png";
import mirrorworld from "@/public/landingimages/logos/mirrorworld.png";
import hellomoonblack from "@/public/landingimages/logos/hellomoonblack.png";
import wuc from "@/public/landingimages/logos/wuc.png";
import lbank from "@/public/landingimages/logos/lbank.jpeg";

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
    name: "ipn",
    logo: ipn,
    url: "https://www.ipn.mx",
    extraClassName: "w-6/12 mt-4 sm:mt-0 sm:w-8/12",
  },
];

const secondSponsors = [
  {
    name: "upiita",
    logo: upiita,
    url: "https://www.ipn.mx",
    extraClassName: "w-6/12 mt-4 sm:mt-0 sm:w-8/12",
  },
  {
    name: "megahabilidades",
    logo: megahabilidades,
    url: "https://megahabilidades.mx",
  },
  {
    name: "lanib",
    logo: lanib,
    url: "https://lanib.mx",
  },
  {
    name: "blockchainbusinessschool",
    logo: blockchainbusinessschool,
    url: "https://blockchainbusinessschool.io/",
  },
  {
    name: "decaf",
    logo: decaf,
    url: "https://www.decaf.so/",
  },
  {
    name: "ottr",
    logo: ottr,
    url: "https://ottr.finance/",
  },
  {
    name: "hellomoon",
    logo: hellomoonblack,
    url: "https://hellomoon.io",
  },
  {
    name: "neefter",
    logo: neefter,
    url: "https://neefter.com",
  },
  {
    name: "lbank",
    logo: lbank,
    url: "https://www.lbanklabs.com",
  },
  {
    name: "Web3 University Community",
    logo: wuc,
    url: "",
  },
  {
    name: "mirrorworld",
    logo: mirrorworld,
    url: "https://mirrorworld.fun",
  },
  {
    name: "agilmentor",
    logo: agilmentor,
    url: "https://agilmentor.com",
  },

  {
    name: "ilum",
    logo: ilum,
    url: "https://www.ilumps.com",
  },
];

export function Sponsors() {
  return (
    <section id="sponsors" aria-label="Sponsors" className="py-32  bg-white ">
      <Container className="bg-white">
        <h2 className="mx-auto max-w-2xl text-center font-display text-4xl font-medium tracking-tighter text-happy-yellow bg-black py-4 sm:text-5xl">
          Hackathon Sponsors &amp; Aliados
        </h2>
        <div className="logoscontainer md:my-8 ">
          <div className=" px-4 md:px-0 grid max-w-7xl md:-mb-4 grid-cols-1 place-content-center gap-x-32 md:grid-cols-3  md:gap-x-16 lg:gap-x-32 w-full text-center">
            {mainSponsors.map((sponsor) => (
              <div
                className="flex justify-center items-center "
                key={sponsor.name}
              >
                <a
                  href={sponsor?.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center  ${sponsor.extraClassName}`}
                >
                  <Image src={sponsor.logo} alt={sponsor.name} unoptimized />
                </a>
              </div>
            ))}
          </div>
          <div className="px-4 my-6 md:px-0 grid max-w-7xl grid-cols-2 place-content-center sm:grid-cols-3 lg:grid-cols-4 gap-x-8 md:gap-x-16 lg:gap-x-32">
            {secondSponsors.map((sponsor) => (
              <a
                href={sponsor?.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                key={sponsor.name}
                className="flex items-center justify-center my-4"
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
