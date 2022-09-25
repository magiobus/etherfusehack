import Image from "next/future/image";

import { Container } from "@/components/landing/Container";
import logoLaravel from "@/public/landingimages/logos/laravel.svg";
import logoMirage from "@/public/landingimages/logos/mirage.svg";
import logoStatamic from "@/public/landingimages/logos/statamic.svg";
import logoStaticKit from "@/public/landingimages/logos/statickit.svg";
import logoTransistor from "@/public/landingimages/logos/transistor.svg";
import logoTuple from "@/public/landingimages/logos/tuple.svg";

const sponsors = [
  { name: "Transistor", logo: logoTransistor },
  { name: "Tuple", logo: logoTuple },
  { name: "StaticKit", logo: logoStaticKit },
  { name: "Mirage", logo: logoMirage },
  { name: "Laravel", logo: logoLaravel },
  { name: "Statamic", logo: logoStatamic },
];

export function Sponsors() {
  return (
    <section id="sponsors" aria-label="Sponsors" className="py-20 sm:py-32">
      <Container>
        <h2 className="mx-auto max-w-2xl text-center font-display text-4xl font-medium tracking-tighter text-blue-900 sm:text-5xl">
          Current sponsorships for our workshops and speakers.
        </h2>
        <div className="mx-auto mt-20 grid max-w-max grid-cols-1 place-content-center gap-y-12 gap-x-32 sm:grid-cols-3 md:gap-x-16 lg:gap-x-32">
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
