import MainLayout from "@/components/layouts/MainLayout";
import Image from "next/image";
import Link from "next/link";
import unixToFormat from "@/utils/unixToFormat";
import clientPromise from "@/lib/mongodb";
import { CalendarIcon, LocationMarkerIcon } from "@heroicons/react/solid";
import RegisterModal from "@/components/events/RegisterModal";
import { useState } from "react";

const EventDetailPage = ({ event }) => {
  const { photo, name, place, price, startTime, endTime } = event;

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <MainLayout>
      <div className="w-full flex justify-center items-center">
        <div className="max-w-7xl  w-full md:px-8 lg:px-0 lg:mt-8">
          <RegisterModal
            isOpen={modalOpen}
            setIsOpen={setModalOpen}
            eventData={event}
          />

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
                <button
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-happy-yellow-600 hover:bg-happy-yellow-700 md:py-4 md:text-lg md:px-10"
                  onClick={() => setModalOpen(true)}
                >
                  Regístrarse
                </button>
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
  const client = await clientPromise;
  const db = client.db();
  const { ObjectId } = require("mongodb");

  try {
    const eventArray = await db
      .collection("events")
      .aggregate([
        {
          $match: {
            _id: new ObjectId(params.id),
            isPublic: true,
            archived: false,
          },
        },
        {
          $sort: {
            startTime: -1,
          },
        },
      ])
      .toArray();

    if (eventArray.length === 0) {
      return {
        notFound: true,
      };
    }

    const eventsData = JSON.parse(JSON.stringify(eventArray[0]));
    return {
      props: {
        event: eventsData,
      },
      revalidate: 5,
    };
  } catch (error) {
    console.log("error", error);

    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  const client = await clientPromise;
  const db = client.db();

  const events = await db
    .collection("events")
    .find(
      {
        isPublic: true,
        archived: false,
      },
      { projection: { _id: 1 } }
    )
    .limit(10)
    .toArray();

  const eventsData = JSON.parse(JSON.stringify(events));

  const paths = eventsData.map((event) => {
    return {
      params: {
        id: event._id,
      },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
}
