import Image from "next/future/image";

import { Container } from "@/components/landing/Container";
import logoMicrosoft from "@/public/landingimages/logos/microsoft.png";
import logoBlockChainBusinessSchool from "@/public/landingimages/logos/blockchainbusinessschool.png";
import logoGobierno from "@/public/landingimages/logos/gobierno.png";
import logoEtherfuse from "@/public/landingimages/logos/etherfuse.png";
import logoSolana from "@/public/landingimages/logos/solanalogo.png";
import logoMolusco from "@/public/landingimages/logos/moluscologo.png";
import logoAllData from "@/public/landingimages/logos/alldata.png";
import logoIacenter from "@/public/landingimages/logos/iacenter.png";
import logociidetec from "@/public/landingimages/logos/ciidetec.png";
import logocuauhtemoc from "@/public/landingimages/logos/cuauhtemoc.png";
import logodelicias from "@/public/landingimages/logos/logodelicias.png";
import tecdelicias from "@/public/landingimages/logos/tecdelicias.png";
import ilum from "@/public/landingimages/logos/ilum.png";
import quanto from "@/public/landingimages/logos/quanto.png";
import municipiocuau from "@/public/landingimages/logos/municipiocuau.png";
import livinglab from "@/public/landingimages/logos/livinglab.png";
import cuuit from "@/public/landingimages/logos/cuuit.png";
import copi from "@/public/landingimages/logos/copi.png";
import tecmty from "@/public/landingimages/logos/tecmty.png";
import uach from "@/public/landingimages/logos/uach.png";
import uachmorado from "@/public/landingimages/logos/uachmorado.png";
import ciet from "@/public/landingimages/logos/ciet.png";
import utcj from "@/public/landingimages/logos/utcj.png";
import mind from "@/public/landingimages/logos/mind.png";
import tec2 from "@/public/landingimages/logos/tec2.png";
import lasalle from "@/public/landingimages/logos/lasalle.png";
import nuevocasasgrandes from "@/public/landingimages/logos/nuevocasasgrandes.png";
import utch from "@/public/landingimages/logos/utch.png";
import tec1 from "@/public/landingimages/logos/tec1.png";
import logocasasgrandes from "@/public/landingimages/logos/casasgrandes.png";

const sponsors = [
  { name: "Gobierno", logo: logoGobierno, url: "https://www.chihuahua.gob.mx" },
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
  { name: "Microsoft", logo: logoMicrosoft, url: "https://microsoft.com/" },
  { name: "All Data", logo: logoAllData, url: "https://www.alldata.com/mx/es" },
  {
    name: "Blockchain Business School",
    logo: logoBlockChainBusinessSchool,
    url: "https://www.facebook.com/blockchainbusinessschool/",
  },
  {
    name: "Molusco",
    logo: logoMolusco,
    url: "https://molus.co",
  },
  {
    name: "Livinglab",
    logo: livinglab,
    url: "https://livinglab.io",
  },
  {
    name: "IA Center",
    logo: logoIacenter,
    url: "https://www.ia.center/es/",
  },
  {
    name: "ilum",
    logo: ilum,
    url: "https://www.ilumps.com",
  },
  {
    name: "CUUIT",
    logo: cuuit,
    url: "https://desec.org.mx/wp/t-i/",
  },
  {
    name: "nuevocasasgrandes",
    logo: nuevocasasgrandes,
    url: "http://itsncg.edu.mx",
  },
  {
    name: "Tec de NCG CUU",
    logo: logocasasgrandes,
    url: "http://itsncg.edu.mx",
  },
  {
    name: "Tec de Cuauhtemoc CUU",
    logo: logocuauhtemoc,
    url: "https://www.cdcuauhtemoc.tecnm.mx",
  },
  {
    name: "tecdelicias",
    logo: tecdelicias,
    url: "https://www.delicias.tecnm.mx",
  },
  {
    name: "IDE",
    logo: logodelicias,
    url: "http://desarrolloeconomico.municipiodelicias.com/",
  },
  {
    name: "cuaumunicipio",
    logo: municipiocuau,
    url: "http://municipiocuauhtemoc.gob.mx",
  },
  {
    name: "Quanto",
    logo: quanto,
    url: "https://quanto.mx",
  },
  {
    name: "Ciidetec",
    logo: logociidetec,
    url: "#",
  },
  {
    name: "Tec mty ",
    logo: tecmty,
    url: "https://egade.tec.mx",
  },
  {
    name: "uachmorado",
    logo: uachmorado,
    url: "https://www.facebook.com/CIETUACH/",
  },
  {
    name: "ciet",
    logo: ciet,
    url: "https://www.facebook.com/CIETUACH/",
  },

  {
    name: "uach",
    logo: uach,
    url: "https://www.uach.mx",
  },

  {
    name: "utcj",
    logo: utcj,
    url: "https://www.utcj.edu.mx",
  },
  {
    name: "copi",
    logo: copi,
    url: "http://www.copichihuahua.org",
  },
  {
    name: "mind",
    logo: mind,
    url: "https://www.mindhub.mx",
  },
  {
    name: "lasalle",
    logo: lasalle,
    url: "https://www.ulsachihuahua.edu.mx",
  },

  {
    name: "tec2",
    logo: tec2,
    url: "http://www.chihuahua2.tecnm.mx",
  },
  {
    name: "utch",
    logo: utch,
    url: "https://www.utch.edu.mx",
  },
  {
    name: "tec1",
    logo: tec1,
    url: "https://itchihuahua.mx",
  },
];

export function Sponsors() {
  return (
    <section id="sponsors" aria-label="Sponsors" className="py-32  bg-white ">
      <Container className="bg-white">
        <h2 className="mx-auto max-w-2xl text-center font-display text-4xl font-medium tracking-tighter text-happy-yellow bg-black py-4 sm:text-5xl">
          Hackathon Sponsors &amp; Aliados
        </h2>
        <div className="mx-auto px-12 md:px-0  mt-20 grid max-w-7xl grid-cols-1 place-content-center gap-y-12 gap-x-32 sm:grid-cols-2 lg:grid-cols-3 md:gap-x-16 lg:gap-x-32">
          {sponsors.map((sponsor) => (
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
      </Container>
    </section>
  );
}
