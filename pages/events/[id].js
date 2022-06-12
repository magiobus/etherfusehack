import MainLayout from "@/components/layouts/MainLayout";
import Image from "next/image";
import Link from "next/link";
import unixToFormat from "@/utils/unixToFormat";
import eventsData from "@/data/fakeevents.json";
import { CalendarIcon, LocationMarkerIcon } from "@heroicons/react/solid";

const EventDetailPage = ({ event }) => {
  console.log("event detail page", event);

  const { photo, name, place, price, startTime, endTime } = event;

  return (
    <MainLayout>
      <div className="w-full flex justify-center items-center">
        <div className="max-w-7xl  w-full md:px-8 lg:px-0 lg:mt-8">
          <div className="header my-4 flex flex-col lg:flex-row lg:justify-between lg:items-center bg-gray-100">
            <Image
              src={photo}
              alt={name}
              width={800}
              height={400}
              className="object-fill"
            />
            <div className="rightsection flex flex-col justify-center items-start h-full py-4 px-4 w-full lg:w-4/12 mr-4 ">
              <h1 className="font-bold text-2xl">{name}</h1>
              <p className="capitalize">
                @{place?.name} - {place?.state}, {place?.city} {place?.country}
              </p>
              <p className="capitalize"> {unixToFormat(startTime, "PPPPp")}</p>
              <p className="mt-4 ">{price == 0 && "Entrada Gratuita"}</p>
              <div className="rounded-md shadow mt-8 lg:mt-12 w-full">
                <Link href="#">
                  <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-happy-yellow-600 hover:bg-happy-yellow-700 md:py-4 md:text-lg md:px-10">
                    Regístrarse
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="content flex justify-start  items-center w-full">
            <div className="max-w-7xl w-full mx-auto py-8 px-4 sm:py-18 sm:px-6 lg:px-8 xl:px-0  ">
              <div className="w-full flex flex-col lg:flex-row  justify-between items-center">
                <div className="leftsection w-full lg:w-1/2">
                  <p className="font-bold">Acerca del evento</p>
                  <p className=" mt-5  text-xl text-black">
                    {event.description}
                  </p>
                  <p className=" mt-5  text-xl text-black">
                    Te recomendamos que revises la sección de{" "}
                    <span>
                      <Link href={`/faqs`}>
                        <a className="underline text-happy-yellow">
                          preguntas frecuentes
                        </a>
                      </Link>
                    </span>{" "}
                    para resolver cualquier duda que tengas.
                  </p>
                </div>
                <div className="rightsection flex flex-col  w-full  mt-8 lg:mt-0 px-0 lg:px-8 lg:w-4/12">
                  <div className="infocontainer">
                    <div className="title flex items-center space-x-1 mb-2">
                      <div className="icon w-5 h-5">
                        <CalendarIcon />
                      </div>
                      <p className="font-bold">Fecha y Hora</p>
                    </div>
                    <p>
                      {unixToFormat(startTime, "PPPp")} hrs -{" "}
                      {unixToFormat(endTime, "PPPp")} hrs{" "}
                    </p>
                  </div>
                  <div className="infocontainer my-4">
                    <div className="title flex items-center space-x-1 mb-2">
                      <div className="icon w-5 h-5">
                        <LocationMarkerIcon />
                      </div>
                      <p className="font-bold">Lugar</p>
                    </div>
                    <p className="">{place?.name}</p>
                    <p className="">{place?.address}</p>
                    <p className="capitalize">
                      {place?.state}, {place?.city} {place?.country}
                    </p>
                    <a
                      href={place?.locationUrl}
                      target="_blank"
                      className="underline text-happy-yellow"
                      rel="noreferrer"
                    >
                      Ver Mapa
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EventDetailPage;

export async function getStaticProps({ params }) {
  //TODO: get event data from database
  const event = eventsData.find((event) => event.id === params.id);
  if (event) {
    return {
      props: {
        event: event,
      },
      revalidate: 5,
    };
  } else {
    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  const data = JSON.parse(JSON.stringify(eventsData));
  const paths = data.map((event) => ({
    params: {
      id: event.id,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
}
