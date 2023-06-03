/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-target-blank */
import MainLayout from "@/components/layouts/MainLayout";

const DecafTrack = () => {
  return (
    <MainLayout title="Tracks">
      <div className="w-full flex justify-center items-center my-4 mx-2">
        <div className="max-w-2xl w-full md:px-8 lg:px-0 lg:mt-8">
          <div className="content flex justify-start items-center w-full">
            <div className="max-w-7xl w-full mx-auto justify-start items-center px-4 sm:py-18 sm:px-6 lg:px-8 xl:px-0">
              <img
                src="/landingimages/logos/decaf.png"
                className="w-6/12 lg:w-2/12 mx-auto mb-4"
                alt="decaf"
              />
              <h1 className="text-center text-2xl font-bold uppercase">
                Decaf&apos;s Pagos y Remesas 🏆
              </h1>
              <div className="content my-4">
                <p className="text-center text-base font-semibold">
                  Participa en el Decaf Track y tendrás la oportunidad de ganar
                  hasta 1000 USDC para tu proyecto.
                </p>
                <div className="quote">
                  <div className="w-full flex flex-col items-center justify-center my-4">
                    <p className="my-4 font-semibold text-center">
                      El mejor proyecto de pagos y remesas podrá ganar 1000 USDC
                      por parte de decaf.
                    </p>
                  </div>
                </div>
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

export default DecafTrack;
