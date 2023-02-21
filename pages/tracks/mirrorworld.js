/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-target-blank */
import MainLayout from "@/components/layouts/MainLayout";
const MirrorWorldTrack = () => {
  return (
    <MainLayout title="Tracks">
      <div className="w-full flex justify-center items-center my-4 mx-2">
        <div className="max-w-7xl w-full md:px-8 lg:px-0 lg:mt-8">
          <div className="content flex justify-start  items-center w-full">
            <div className="max-w-7xl w-full mx-auto justify-start  items-center  px-4 sm:py-18 sm:px-6 lg:px-8 xl:px-0  ">
              <img
                src="/landingimages/logos/mirrorworld.png"
                className="w-6/12 lg:w-2/12 mx-auto mb-4"
                alt="Mirror World"
              />
              <h1 className="text-center text-2xl font-bold uppercase">
                Mirror World Track: $2500 USDC Prize 🏆
              </h1>
              <div className="content my-4">
                <p className="text-center text-base font-semibold">
                  Utiliza Mirror World en tu proyecto y gana $2500USDC
                </p>
                <div className="quote">
                  <div className="w-full flex flex-col items-center justify-center my-4">
                    <p className="italic w-full text-center max-w-lg">
                      Smart Platform de Mirror World es la primera plataforma de
                      desarrollo de aplicaciones Web3 todo en uno que ayuda a
                      los desarrolladores a resolver el proceso de onboarding de
                      usuarios y activation conversion. Hasta la fecha, Smart
                      Platform ha ayudado a más de 250 proyectos que han logrado
                      excelentes conversiones al proporcionar una plataforma
                      todo en uno con módulos incorporados amigables para los
                      desarrolladores, como un ecommerce integrado (como
                      Shopify), gestión de NFTs, autenticación social y un
                      wallet MPC con agregación on-ramp y soporte mobile
                    </p>
                    <p className="my-4 font-semibold">
                      El mejor proyecto que utilice Mirror World Smart Platform
                      - SDK/API en su proyecto ganará $2500USDC
                    </p>
                  </div>
                </div>
              </div>

              <div className="ideaswelove text-center font-bold">
                Puedes revisar la documentación de Mirror World en{" "}
                <a
                  target="_blank"
                  href="https://mirrorworld.fun/#Intro"
                  className="underline"
                >
                  https://mirrorworld.fun/#Intro
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

export default MirrorWorldTrack;
