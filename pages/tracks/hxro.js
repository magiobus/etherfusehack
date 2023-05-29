/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-target-blank */
import MainLayout from "@/components/layouts/MainLayout";

const HXROTrack = () => {
  return (
    <MainLayout title="Tracks">
      <div className="w-full flex justify-center items-center my-4 mx-2">
        <div className="max-w-2xl w-full md:px-8 lg:px-0 lg:mt-8">
          <div className="content flex justify-start items-center w-full">
            <div className="max-w-7xl w-full mx-auto justify-start items-center px-4 sm:py-18 sm:px-6 lg:px-8 xl:px-0">
              <img
                src="/landingimages/logos/hxro.png"
                className="w-6/12 lg:w-2/12 mx-auto mb-4"
                alt="HXRO"
              />
              <h1 className="text-center text-2xl font-bold uppercase">
                HXRO&apos;s Best of the Best 🏆
              </h1>
              <div className="content my-4">
                <p className="text-center text-base font-semibold">
                  Participa en el HXRO Track y tendrás la oportunidad de ganar
                  hasta 45k en tokens $HXRO para tu proyecto.
                </p>
                <div className="quote">
                  <div className="w-full flex flex-col items-center justify-center my-4">
                    <p className="italic w-full text-center max-w-lg">
                      Hxro es una plataforma de trading que permite a los
                      usuarios apostar en el precio futuro de las criptomonedas.
                      Los usuarios pueden ganar dinero si adivinan
                      correctamente, y pueden usar los tokens $HXRO para ganar
                      recompensas adicionales. Los desarrolladores pueden usar
                      el SDK/API de Hxro para construir sus propias aplicaciones
                      que se conecten a la plataforma.
                    </p>
                    <p className="my-4 font-semibold text-center">
                      Los proyectos que hagan el mejor uso del SDK/API de HXRO
                      serán los ganadores de los siguientes premios:
                      <ul>
                        <li>1er premio: 45k en tokens $HXRO</li>
                        <li>2do premio: 30k en tokens $HXRO</li>
                        <li>3er premio: 25k en tokens $HXRO</li>
                      </ul>
                    </p>
                  </div>
                </div>
              </div>
              <div className="ideaswelove text-center font-bold">
                Puedes revisar la documentación de HXRO en{" "}
                <a
                  target="_blank"
                  href="https://docs.hxro.network/"
                  className="underline"
                >
                  https://docs.hxro.network/
                </a>
              </div>
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

export default HXROTrack;
