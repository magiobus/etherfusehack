import Image from "next/future/image";

import { Container } from "@/components/landing/Container";
import logoMicrosoft from "@/public/landingimages/logos/microsoft.png";
import logoBlockChainBusinessSchool from "@/public/landingimages/logos/blockchainbusinessschool.png";
import logoGobierno from "@/public/landingimages/logos/gobierno.png";

const sponsors = [
  { name: "Microsoft", logo: logoMicrosoft },
  { name: "Gobierno", logo: logoGobierno },
  { name: "Blockchain Business School", logo: logoBlockChainBusinessSchool },
];

export function Sponsors() {
  return (
    <section id="sponsors" aria-label="Sponsors" className="py-32  bg-white ">
      <Container className="bg-white">
        <h2 className="mx-auto max-w-2xl text-center font-display text-4xl font-medium tracking-tighter text-happy-yellow bg-black py-4 sm:text-5xl">
          Hackathon Sponsors &amp; Aliados
        </h2>
        <div className="mx-auto px-12 md:px-0  mt-20 grid max-w-7xl grid-cols-1 place-content-center gap-y-12 gap-x-32 sm:grid-cols-3 md:gap-x-16 lg:gap-x-32">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="flex items-center justify-center"
            >
              <Image src={sponsor.logo} alt={sponsor.name} unoptimized />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
