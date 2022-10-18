import Image from "next/future/image";
import Link from "next/link";
import { Container } from "@/components/landing/Container";

const eventInfo = [
  ["Mentores", "+30"],
  ["Participantes", "+400"],
  ["Sedes", "Varias sedes"],
  ["Lugar", "Chihuahua, Mx"],
];

export function Hero() {
  return (
    <div className="relative pt-10 pb-20 sm:py-18">
      <div className="absolute inset-x-0 -top-48 -bottom-14 overflow-hidden bg-indigo-50">
        <Image
          className="absolute top-0 left-0 translate-y-[-10%] translate-x-[-55%] -scale-x-100 sm:left-1/2 sm:translate-y-[-6%] sm:translate-x-[-98%] lg:translate-x-[-106%] xl:translate-x-[-122%]"
          src="/landingimages/background.jpg"
          alt=""
          width={918}
          height={1495}
          priority
          unoptimized
        />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white" />
      </div>
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:max-w-4xl lg:px-12">
          <h1 className="font-display text-5xl font-bold tracking-tighter bg-black px-4 py-4 text-happy-yellow sm:text-7xl">
            <span className="sr-only">Etherfuse hackathon - </span>
            El hackathon de blockchain para el estado grande.
          </h1>
          <div className="mt-6  font-display text-2xl tracking-tight text-black">
            <p className="font-semibold">
              3 días de hacking, 3 días de aprendizaje, 3 días de creación.
            </p>
            <p className="font-semibold mt-1 mb-4">
              Y la oportunidad de ganar $100,000 pesos en premios
            </p>
            <div className="container space-y-6">
              <p>
                Un fin de semana para colaborar, aprender y crear soluciones
                digitales con blockchain. Además podrás conocer a mentores
                nacionales e internacionales.
              </p>
              <div className="sedescontainer text-lg">
                <p className="m-0 p-0 font-semibold">
                  Inscríbete en alguna de nuestras sedes:
                </p>
                <p className=" m-0 p-0">
                  Cd. Chihuahua, Cd. Juárez, Nuevo Casas Grandes, Cuauhtémoc,
                  Delicias.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-10 bg-black w-full flex justify-center items-center rounded-md">
            <Link href="/events">
              <a className="text-happy-yellow  text-center font-bold rounded-md px-4 py-2 text-xl w-full ">
                Regístrate
              </a>
            </Link>
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-y-6 gap-x-10 sm:mt-16 sm:gap-y-10 sm:gap-x-16 sm:text-center lg:auto-cols-auto lg:grid-flow-col lg:grid-cols-none lg:justify-start lg:text-left">
            {eventInfo.map(([name, value]) => (
              <div key={name}>
                <dt className="font-mono text-sm text-black font-bold">
                  {name}
                </dt>
                <dd className="mt-0.5 text-2xl  tracking-tight text-black">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </div>
  );
}
