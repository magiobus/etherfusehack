/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-target-blank */
import MainLayout from "@/components/layouts/MainLayout";
const ShyftTrack = () => {
  return (
    <MainLayout title="Tracks">
      <div className="w-full flex justify-center items-center my-4 mx-2">
        <div className="max-w-2xl w-full md:px-8 lg:px-0 lg:mt-8">
          <div className="content flex justify-start  items-center w-full">
            <div className="max-w-7xl w-full mx-auto justify-start  items-center  px-4 sm:py-18 sm:px-6 lg:px-8 xl:px-0  ">
              <img
                src="/landingimages/logos/shyft.png"
                className="w-6/12 lg:w-2/12 mx-auto mb-4"
                alt="Shyft"
              />
              <h1 className="text-center text-2xl font-bold uppercase">
                Shyft Track: $1000 USDC Prize 🏆
              </h1>
              <div className="content my-4">
                <p className="text-center text-base font-semibold">
                  Participa en el Shyft Track y tendrás la oportunidad de ganar
                  $1000 en USD para tu proyecto.{" "}
                </p>
                <div className="quote">
                  <div className="w-full flex flex-col items-center justify-center my-4">
                    <p className="italic w-full text-center max-w-lg">
                      Shyft es una plataforma que ofrece un SDK para la creación
                      de aplicaciones descentralizadas (dApps). El SDK de Shyft
                      te permite integrar estas capacidades en tu proyecto de
                      manera sencilla y rápida.
                    </p>
                    <p className="my-4 font-semibold">
                      El proyecto que mejor utilice el SDK de Shyft será el
                      ganador del premio de $1000 en USD
                    </p>
                  </div>
                </div>
              </div>
              <div className="ideaswelove text-center font-bold">
                Puedes revisar la documentación de Shyft en{" "}
                <a
                  target="_blank"
                  href="https://docs.shyft.to/"
                  className="underline"
                >
                  https://docs.shyft.to/
                </a>
              </div>
              <p className="text-center">
                Además, todos los participantes del Shyft Track recibirán
                créditos en la plataforma de Shyft. Una vez que te encuentres en
                el servidor de Discord del evento, dirígete al canal de Shyft y
                solicita el formulario para aplicar por tus créditos.
              </p>
              <div className="howtoapply my-4">
                <p className="ideaswelove text-center font-bold">
                  Si quieres aplicar a este track, regístrate en{" "}
                  <a
                    href="https://hackathon.etherfuse.com"
                    className="underline"
                    target="_blank"
                  >
                    hackathon.etherfuse.com
                  </a>
                </p>
                <p className="ideaswelove text-center">
                  Cuando envíes tu proyecto, selecciona los tracks a los que te
                  gustaría aplicar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ShyftTrack;
