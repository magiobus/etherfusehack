import Image from "next/future/image";

import { Container } from "@/components/landing/Container";
import logoEtherfuse from "@/public/landingimages/logos/etherfuse.png";
import logoSolana from "@/public/landingimages/logos/solanalogo.png";
import decaf from "@/public/landingimages/logos/decaf.png";
import megahabilidades from "@/public/landingimages/logos/megahabilidades.png";
import ottr from "@/public/landingimages/logos/ottr.png";
import ipn from "@/public/landingimages/logos/ipn.png";
import blockchainbusinessschool from "@/public/landingimages/logos/blockchainbusinessschool.png";

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
];

const secondSponsors = [
  {
    name: "ipn",
    logo: ipn,
    url: "https://www.ipn.mx",
  },
  {
    name: "megahabilidades",
    logo: megahabilidades,
    url: "https://megahabilidades.mx",
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
];

export function Sponsors() {
  return (
    <section id="sponsors" aria-label="Sponsors" className="py-32  bg-white ">
      <Container className="bg-white">
        <h2 className="mx-auto max-w-2xl text-center font-display text-4xl font-medium tracking-tighter text-happy-yellow bg-black py-4 sm:text-5xl">
          Hackathon Sponsors &amp; Aliados
        </h2>
        <div className="logoscontainer md:my-8">
          <div className=" px-4 md:px-0 grid max-w-7xl md:-mb-4 grid-cols-1 place-content-center gap-x-32 sm:grid-cols-2 md:gap-x-16 lg:gap-x-32">
            {mainSponsors.map((sponsor) => (
              <a
                href={sponsor?.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                key={sponsor.name}
                className="flex items-center justify-center"
              >
                <Image src={sponsor.logo} alt={sponsor.name} unoptimized />
              </a>
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
