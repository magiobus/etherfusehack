/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-target-blank */
import MainLayout from "@/components/layouts/MainLayout";
const EtherfuseTrack = () => {
  return (
    <MainLayout title="Tracks">
      <div className="w-full flex justify-center items-center my-4 mx-2">
        <div className="max-w-7xl w-full md:px-8 lg:px-0 lg:mt-8">
          <div className="content flex justify-start  items-center w-full">
            <div className="max-w-7xl w-full mx-auto justify-start  items-center  px-4 sm:py-18 sm:px-6 lg:px-8 xl:px-0  ">
              <img
                src="/landingimages/logos/etherfuse.png"
                className="w-6/12 lg:w-2/12 mx-auto mb-8"
                alt="Hello Moon IO"
              />
              <h1 className="text-center text-2xl font-bold uppercase">
                Best of the Best Track: Up to $2500 USDC Prize 🏆
              </h1>
              <div className="content my-4">
                <p className="text-center text-base font-semibold">
                  ¿ Eres uno de los mejores proyectos del hackathon ?
                </p>
                <div className="quote">
                  <div className="w-full flex flex-col items-center justify-center my-4">
                    <p className="italic w-full text-center max-w-lg">
                      Puedes ganar hasta $2500 USDC si eres uno de los mejores
                      proyectos del evento. No importa si estás participando en
                      otros tracks, bounties o challenges, puedes participar
                      para este premio.
                    </p>
                  </div>
                </div>
              </div>

              <div className="howtoapply my-4">
                <p className="ideaswelove text-center font-bold">
                  Todos los proyectos registrados participaran en este track.
                  Regístrate en{" "}
                  <a
                    href="https://hackathon.etherfuse.com"
                    className="underline"
                    target="_blank"
                  >
                    hackathon.etherfuse.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EtherfuseTrack;
