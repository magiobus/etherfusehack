/* eslint-disable @next/next/no-img-element */
import MainLayout from "@/components/layouts/MainLayout";
import RewardsComponent from "@/components/events/RewardsComponent";

const EventDetailPage = () => {
  return (
    <MainLayout>
      <div className="w-full flex justify-center items-center my-8">
        <div className="max-w-7xl  w-full md:px-8 lg:px-0 lg:mt-8">
          <div className="content flex justify-start  items-center w-full">
            <div className="max-w-7xl w-full mx-auto py-2 px-4 sm:py-8 sm:px-6 lg:px-8 xl:px-0  ">
              <div className="w-full">
                <div className="w-full flex flex-col text-center items-center justify-center">
                  <h1 className="text-2xl md:text-3xl font-bold">
                    Premios Solana Hackathon
                  </h1>
                  <div className="subtitle">
                    <p className="mt-4">
                      Acá puedes ver los premios que hay en el hackathon.
                    </p>
                    <p>
                      {" "}
                      Hay premios por parte de SuperteamMX y tracks por parte de
                      nuestros sponsors.
                    </p>
                  </div>
                  <div className="howtoapply my-4">
                    <p className="ideaswelove text-center font-bold">
                      Si aún no te registras a solana hackathon, regístrate en{" "}
                      <a
                        href="https://hackathon.etherfuse.com"
                        className="underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        hackathon.etherfuse.com
                      </a>
                    </p>
                  </div>
                </div>
                <RewardsComponent />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EventDetailPage;
