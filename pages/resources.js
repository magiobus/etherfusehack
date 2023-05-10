import Landinglayout from "@/components/layouts/LandingLayout";
import { Container } from "@/components/landing/Container";
import YoutubeVideo from "@/components/landing/YoutubeVideo";
import Link from "next/link";
const ResourcesPage = () => {
  return (
    <>
      <Landinglayout fixed={true}>
        <div className="relative z-20 pb-11 lg:pt-11">
          <Container className="flex flex-wrap items-center justify-center sm:justify-between lg:flex-nowrap">
            <div className="bg-white w-full">
              <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-happy-yellow bg-happy-middark  sm:tracking-tight lg:text-4xl py-2">
                    Recursos
                  </p>
                </div>
                <div className="mt-12 font-semibold w-full">
                  <p>
                    Si sientes que aún te falta mucho por aprender para asistir
                    al evento, no te preocupes.
                  </p>
                  <p className="mt-2">
                    Armamos una lista de recursos que creemos que te pueden
                    ayudar a entender todo lo que necesitas saber sobre
                    blockchain y cómo empezar a desarrollar proyectos.
                  </p>
                  <p className="mt-2">
                    Todo el tema de crypto y blockchain es muy extenso y hay un
                    montón de cosas que aprender. No te preocupes si no
                    entiendes todo de una, es normal. Lo importante es que te
                    animes a aprender y a probar cosas nuevas.
                  </p>
                  <p className="mt-2">
                    Recuerda que estos recursos no son para nada recomendaciones
                    de inversión y se comparten meramente para fines educativos.
                  </p>

                  <p className="my-8">
                    Si quieres darte ideas de que construir, superteamMX preparó
                    esta lista para tí{" "}
                    <a
                      href="https://build.superteam.fun"
                      target="_blank"
                      rel="noreferrer"
                      className="bg-happy-middark px-2 py-1 text-happy-yellow"
                    >
                      https://build.superteam.fun
                    </a>
                  </p>

                  <p className="my-8">
                    También te recomiendo que entres al curso de &quot;Solana
                    para Noobs&quot; que varios miembros de superteamMX tienen
                    para tí
                  </p>

                  <div className="links grid grid-cols-1 space-y-2 md:grid-cols-2 md:space-y-0 md:gap-x-4 md:gap-y-4 lg:gap-x-12 mb-8">
                    <a
                      href="https://learn.superteam.mx/"
                      target="_blank"
                      rel="noreferrer"
                      className="bg-happy-middark px-2 py-1 text-happy-yellow"
                    >
                      https://learn.superteam.mx/
                    </a>
                  </div>

                  <p className="mt-2">
                    Registrate a etherfuse hackathon presencial o virtual dando{" "}
                    <Link href="/">
                      <a>
                        {" "}
                        <span className="text-happy-yellow bg-happy-middark px-4">
                          click aquí
                        </span>
                      </a>
                    </Link>
                  </p>
                </div>

                <h3 className="bg-happy-middark text-happy-yellow text-4xl mt-24 text-center">
                  Teoría y Conceptos de WEB 3.0
                </h3>

                <div className="container mt-8 grid grid-cols-1 md:grid-cols-2  space-y-8 w-full">
                  <div className="resource md:pr-4  flex justify-between flex-col items-start  w-full">
                    <h2 className="font-bold text-xl mb-2">
                      Que es el blockchain ?
                    </h2>
                    <YoutubeVideo youtubeId="V9Kr2SujqHw" />
                  </div>
                  <div className="resource md:pr-4  flex justify-between flex-col items-start  w-full">
                    <h2 className="font-bold text-xl mb-2">
                      Cryptopia - Bitcoin, Blockchains and The Future of the
                      Internet
                    </h2>
                    <YoutubeVideo youtubeId="Y2qe3hFeQ5g" />
                  </div>

                  <div className="resource md:pr-4  flex justify-between flex-col items-start  w-full">
                    <h2 className="font-bold text-xl mb-2">
                      Bitcoin 101: ¿Qué es Bitcoin? ¿Cómo funciona?
                    </h2>
                    <YoutubeVideo youtubeId="41JCpzvnn_0" />
                  </div>

                  <div className="resource md:pr-4  flex justify-between flex-col items-start  w-full">
                    <h2 className="font-bold text-xl mb-2">
                      Solana 101: ¿Qué es Solana? ¿Cómo funciona?
                    </h2>
                    <YoutubeVideo youtubeId="CJOEkJNz6dU" />
                  </div>
                  <div className="resource md:pr-4  flex justify-between flex-col items-start  w-full">
                    <h2 className="font-bold text-xl mb-2">
                      NFT 101: ¿Qué es un NFT? ¿Cómo funciona?
                    </h2>
                    <p className="mb-4 w-full lg:w-3/4"></p>
                    <YoutubeVideo youtubeId="vluFUSMMHu4" />
                  </div>
                  <div className="resource md:pr-4  flex justify-between flex-col items-start w-full">
                    <h2 className="font-bold text-xl mb-2">Smart Contracts</h2>
                    <p className="mb-4 w-full lg:w-3/4"></p>
                    <YoutubeVideo youtubeId="pyaIppMhuic" />
                  </div>
                  <div className="resource md:pr-4  flex justify-between flex-col items-start w-full">
                    <h2 className="font-bold text-xl mb-2">
                      Staking: ¿Qué es staking?
                    </h2>
                    <p className="mb-4 w-full lg:w-3/4"></p>
                    <YoutubeVideo youtubeId="oGnxlPJfDJY" />
                  </div>
                  <div className="resource md:pr-4 flex justify-between flex-col items-start  w-full">
                    <h2 className="font-bold text-xl mb-2">
                      From Bitcoin to DEFi
                    </h2>
                    <p className="mb-4 w-full lg:w-3/4"></p>
                    <YoutubeVideo youtubeId="dM8DAIAx124" />
                  </div>
                  <div className="resource md:pr-4 flex justify-between flex-col items-start  w-full">
                    <h2 className="font-bold text-xl mb-2">
                      DAO: ¿Qué es una DAO? ¿Cómo funciona?
                    </h2>
                    <p className="mb-4 w-full lg:w-3/4"></p>
                    <YoutubeVideo youtubeId="c4Pd3pg5nok" />
                  </div>
                </div>

                {/* //CONTENT */}
                <>
                  <h3 className="bg-happy-middark text-happy-yellow text-4xl mt-12 text-center">
                    WorkShop EtherFuse (Hackathones pasados)
                  </h3>
                  <div className="container mt-8 grid grid-cols-1 md:grid-cols-2  space-y-8 w-full">
                    <div className="resource md:pr-4  flex justify-between flex-col items-start  w-full">
                      <h2 className="font-bold text-xl mb-2">
                        Intro a Workshop por David Taylor
                      </h2>
                      <YoutubeVideo youtubeId="HN6CHtOnnko" />
                    </div>
                    <div className="resource md:pr-4  flex justify-between flex-col items-start  w-full">
                      <h2 className="font-bold text-xl mb-2">
                        Intro a BlockChain por Diego Quintana
                      </h2>
                      <YoutubeVideo youtubeId="byYX4_YaByU" />
                    </div>
                    <div className="resource md:pr-4  flex justify-between flex-col items-start  w-full">
                      <h2 className="font-bold text-xl mb-2">
                        Preguntas Frecuentes por Magio Bustillos
                      </h2>
                      <YoutubeVideo youtubeId="mFkCy8rcSdY" />
                    </div>
                    <div className="resource md:pr-4  flex justify-between flex-col items-start  w-full">
                      <h2 className="font-bold text-xl mb-2">
                        Getting Started with Solana by AJ Taylor
                      </h2>
                      <YoutubeVideo youtubeId="DZZkp_rAEYE" />
                    </div>
                  </div>
                </>
              </div>
            </div>
          </Container>
        </div>
      </Landinglayout>
    </>
  );
};

export default ResourcesPage;
