/* eslint-disable @next/next/no-img-element */
import MainLayout from "@/components/layouts/MainLayout";
import Image from "next/image";
import unixToFormat from "@/utils/unixToFormat";
import clientPromise from "@/lib/mongodb";
import { CalendarIcon, LocationMarkerIcon } from "@heroicons/react/solid";
import RegisterModal from "@/components/events/RegisterModal";
import { useState } from "react";
import dateNowUnix from "@/utils/dateNowUnix";
import ShareButtons from "@/components/events/ShareButtons";
import ProjectsList from "@/components/events/ProjectsList";
import { Schedule } from "@/components/landing/Schedule";
import { Speakers } from "@/components/landing/Speakers";
import { Sponsors } from "@/components/landing/Sponsors";
import Instructions from "@/components/landing/Instructions";
import RewardsComponent from "@/components/events/RewardsComponent";

const EventDetailPage = ({ event, expired, registerCount }) => {
  const {
    photo,
    name,
    placeName,
    placeAddress,
    placeState,
    placeCity,
    placeCountry,
    price,
    locationUrl,
    endTime,
    startTime,
    description,
    projects,
    modality,
  } = event;

  const [modalOpen, setModalOpen] = useState(false);
  const shareUrl = `https://hackathon.etherfuse.com/events/${event._id}`;
  const sharedMessage = `Te invito a ${event.name}!`;

  return (
    <MainLayout title={name} description={description} imageUrl={photo}>
      <div className="w-full flex justify-center items-center">
        <div className="max-w-7xl  w-full md:px-8 lg:px-0 lg:mt-8">
          <RegisterModal
            isOpen={modalOpen}
            setIsOpen={setModalOpen}
            eventData={event}
          />

          <div className="header mt-0 mb-4 md:my-4 flex flex-col lg:flex-row lg:justify-between lg:items-center bg-happy-middark">
            <Image
              src={photo}
              alt={name}
              width={800}
              height={400}
              className="object-fill"
            />
            <div
              className="rightsection  flex flex-col justify-center items-start h-full py-4 px-4 w-full lg:w-4/12 mr-4 text-happy-yellow
          "
            >
              <h1 className="font-bold text-2xl mb-4">{name}</h1>

              {/* //PLACE */}
              {modality === "irl" && (
                <p className="capitalize text-white">
                  @{placeName} - {placeState}, {placeCity} {placeCountry}{" "}
                </p>
              )}

              {modality === "virtual" && (
                <p className="capitalize text-white">Modalidad Virtual 💻</p>
              )}

              {(modality === "irl" || modality === "irl-virtual") && (
                <>
                  <p>
                    {" "}
                    @{placeName} - {placeState}, {placeCity} {placeCountry}{" "}
                  </p>
                  <p className="capitalize text-white">
                    Modalidad Virtual Disponible 💻
                  </p>
                </>
              )}

              <p className="capitalize text-white my-2">
                {" "}
                {unixToFormat(startTime, "d 'de' MMMM yyyy h:mm aa")}
                <br />
                {unixToFormat(endTime, "d 'de' MMMM yyyy h:mm aa")}
              </p>
              <p className="mt-4 text-white font-bold">
                {price == 0 && "Entrada Gratuita"}
              </p>
              {/* TODO: DELETE THIS LATER */}
              <p className="mt-4 text-white font-bold">Abierto al público</p>

              {registerCount ? (
                <p>{registerCount} asistentes registrados</p>
              ) : (
                ""
              )}
              <div className="rounded-md  mt-8 lg:mt-12 w-full">
                {expired ? (
                  <div className="flex flex-col justify-center items-center">
                    <p className="text-red-400">Este evento ya ha pasado ☹️</p>
                    <a
                      href="#eventprojects"
                      className="bg-happy-yellow text-black px-2 py-1 my-2"
                    >
                      Ver proyectos de este evento
                    </a>
                  </div>
                ) : (
                  <button
                    className="w-full bg-happy-yellow text-black flex items-center justify-center px-8 py-3 border border-transparent text-base rounded-md font-bold bg-happy-yellow-600 hover:bg-happy-yellow-700 md:py-4 md:text-lg md:px-10"
                    onClick={() => setModalOpen(true)}
                  >
                    Regístrarse
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="content flex justify-start  items-center w-full">
            <div className="max-w-7xl w-full mx-auto py-8 px-4 sm:py-18 sm:px-6 lg:px-8 xl:px-0  ">
              <div className="w-full flex flex-col lg:flex-row  justify-between items-center lg:items-start">
                <div className="leftsection w-full lg:w-1/2">
                  <p className="font-bold">Acerca del evento</p>
                  {description && (
                    <>
                      {description.split("\n").map((item, key) => {
                        return (
                          <>
                            <p className=" my-5  text-xl text-black" key={key}>
                              {item}
                            </p>
                          </>
                        );
                      })}
                    </>
                  )}{" "}
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
                      Inicio:{" "}
                      {unixToFormat(
                        event.startTime,
                        "d 'de' MMMM yyyy h:mm aa"
                      )}{" "}
                    </p>
                    <p>
                      Fin:{" "}
                      {unixToFormat(event.endTime, "d 'de' MMMM yyyy h:mm aa")}{" "}
                    </p>
                  </div>
                  <div className="infocontainer my-4">
                    <div className="title flex items-center space-x-1 mb-2">
                      <div className="icon w-5 h-5">
                        <LocationMarkerIcon />
                      </div>
                      <p className="font-bold">Lugar</p>
                    </div>
                    {modality === "irl" && (
                      <>
                        <p className="">{placeName}</p>
                        <p className="">{placeAddress}</p>
                        <p className="capitalize mb-4">
                          {placeState}, {placeCity} {placeCountry}
                        </p>
                      </>
                    )}
                    {modality === "virtual" && (
                      <p className="">Modalidad Virtual </p>
                    )}
                    {modality === "irl-virtual" && (
                      <>
                        <p className="">{placeName}</p>
                        <p className="">{placeAddress}</p>
                        <p className="capitalize mb-4">
                          {placeState}, {placeCity} {placeCountry}
                        </p>
                        <p className="capitalize text-black">
                          Modalidad Virtual Disponible 💻
                        </p>
                      </>
                    )}
                  </div>
                  <ShareButtons
                    shareUrl={shareUrl}
                    sharedMessage={sharedMessage}
                  />
                </div>
              </div>

              {/* //Xolos */}
              {event._id === "6513725b78e08b60a078f1fc" && (
                <div className="w-full mt-12 mb-24 ">
                  <Schedule />
                </div>
              )}

              {/* //TODO: MIGHT DELETE THIS SECTIoN LATER... */}
              {event._id === "63c3713740c2442abc5ae9cf" && (
                <div className="w-full">
                  <RewardsComponent />
                  <Instructions />
                  <Speakers />
                  <Sponsors />
                </div>
              )}

              {projects && projects.length > 0 && (
                <div className="my-8" id="eventprojects">
                  <ProjectsList projects={projects} />
                </div>
              )}
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

    //check if the event already passed
    const registerCount = await db.collection("tickets").countDocuments({
      eventId: params.id,
    });
    const event = { ...eventArray[0] };
    const now = dateNowUnix();
    const endTime = Number(event.endTime);
    delete event.attendees; //delete attendes key from event

    //get projects of event
    const projects = await db
      .collection("projects")
      .find({ eventId: params.id })
      .toArray();

    event.projects = projects;

    const eventsData = JSON.parse(JSON.stringify(event));
    return {
      props: {
        event: eventsData,
        expired: now > endTime,
        registerCount: registerCount,
      },
      revalidate: 5,
    };
  } catch (error) {
    console.error("error", error);

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
