/* eslint-disable @next/next/no-img-element */
import MainLayout from "@/components/layouts/MainLayout";
import RewardsComponent from "@/components/events/RewardsComponent";

const EventDetailPage = () => {
  return (
    <MainLayout>
      <div className="w-full flex justify-center items-center">
        <div className="max-w-7xl  w-full md:px-8 lg:px-0 lg:mt-8">
          <div className="content flex justify-start  items-center w-full">
            <div className="max-w-7xl w-full mx-auto py-8 px-4 sm:py-18 sm:px-6 lg:px-8 xl:px-0  ">
              <div className="w-full">
                <div className="w-full flex flex-col text-center items-center justify-center">
                  <h1 className="text-3xl font-bold">
                    Recompensas Etherfuse Hack
                  </h1>
                  <div className="subtitle">
                    <p className="mt-4">
                      Acá puedes ver las recompensas que hay en el hackathon.
                    </p>
                    <p>
                      {" "}
                      Los tracks son parte de la bolsa de premios, superteam
                      tiene algunos premios extras así como solana.
                    </p>
                  </div>
                  <div className="howtoapply my-4">
                    <p className="ideaswelove text-center font-bold">
                      Si aún no te registrar a etherfuse hack, regístrate en{" "}
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
