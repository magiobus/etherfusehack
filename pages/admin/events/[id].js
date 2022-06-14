/* eslint-disable @next/next/no-img-element */
import AdminLayout from "@/components/layouts/AdminLayout";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoadingCircle from "@/components/common/LoadingCircle";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import { CalendarIcon, LocationMarkerIcon } from "@heroicons/react/solid";
import unixToFormat from "@/utils/unixToFormat";
import classNames from "@/utils/classNames";

const AdminEventsShowPage = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [event, setEvent] = useState(undefined);
  const router = useRouter();

  useEffect(() => {
    const { id } = router.query;
    async function getUser() {
      setIsInitialLoading(true);
      try {
        const { data } = await axios.get(`/api/admin/events/${id}`);
        setEvent(data);
        setFetchError(false);
      } catch (err) {
        setFetchError(true);
      }
      setIsInitialLoading(false);
    }
    getUser();
  }, [router.query]);

  return (
    <AdminLayout title="Usuarios">
      <div className="w-full flex justify-center">
        <div className="relative bg-white w-full ">
          <div>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="bg-white py-6 space-y-6 ">
                <div className="flex justify-between px-8 w-full items-center ">
                  <div className="title flex flex-col items-start justify-center">
                    <h3 className="text-2xl leading-6 font-medium text-gray-900">
                      Evento: {event?.name}
                    </h3>
                    <p
                      className={classNames(
                        event?.isPublic ? "bg-green-500" : "bg-red-500",
                        "text-white bg-green-400 px-2 rounded-md gont-bold text-sm mt-2"
                      )}
                    >
                      {event?.isPublic ? "Publico" : "No Publico"}
                    </p>
                  </div>

                  <Link href="/admin/events" passHref>
                    <button
                      type="button"
                      className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Back to events List
                    </button>
                  </Link>
                </div>
                <div className="flex flex-col px-4">
                  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                      {isInitialLoading ? (
                        <div className="py-24">
                          <LoadingCircle color="#000000" />
                        </div>
                      ) : fetchError ? (
                        <div className="py-24 text-center">
                          <p className="bold text-red-500">
                            Ocurrio un error cargando informacion del evento😢
                          </p>
                        </div>
                      ) : event ? (
                        <div className="lg:mx-4 lg:p-2 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg ">
                          <div className="topsectioncontainer flex justify-between items-center">
                            <div className="eventtopinfo flex flex-col lg:flex-row lg:justify-between lg:items-center mt-2 mb-4">
                              <div className="leftsection flex-shrink-0 w-full lg:w-5/12 ">
                                <Image
                                  src={event?.photo}
                                  alt={event.name}
                                  width={1280}
                                  height={640}
                                />
                              </div>
                              <div className="rightsection flex flex-col justify-center px-2 lg:px-8 w-full">
                                <div className="infocontainer mt-4 ">
                                  <div className="title flex items-center space-x-1 mb-2">
                                    <div className="icon w-5 h-5">
                                      <CalendarIcon />
                                    </div>
                                    <p className="font-bold">Fecha y Hora</p>
                                  </div>
                                  <p>
                                    {unixToFormat(event.startTime, "PPPp")} hrs
                                    - {unixToFormat(event.endTime, "PPPp")} hrs{" "}
                                  </p>
                                </div>
                                <div className="infocontainer my-4">
                                  <div className="title flex items-center space-x-1 mb-2">
                                    <div className="icon w-5 h-5">
                                      <LocationMarkerIcon />
                                    </div>
                                    <p className="font-bold">Lugar</p>
                                  </div>
                                  <p className="">{event?.place?.name}</p>
                                  <p className="">{event?.place?.address}</p>
                                  <p className="capitalize">
                                    {event?.place?.state}, {event?.place?.city}{" "}
                                    {event?.place?.country}
                                  </p>
                                  <a
                                    href={event?.place?.locationUrl}
                                    target="_blank"
                                    className="underline text-happy-yellow"
                                    rel="noreferrer"
                                  >
                                    Ver Mapa
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="rolecontainer"></div>
                          </div>
                          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                            <h2 className="font-bold">Registrados</h2>
                            {event.attendees && event.attendees.length > 0 ? (
                              event.attendees.map((attendee) => {
                                return (
                                  <div
                                    key={event.id}
                                    className="flex flex-col lg:flex-row  lg:items-center lg:justify-between lg:px-4 py-4 lg:py-3 border-b border-gray-200"
                                  >
                                    <div className="maininfo flex items-center justify-start w-full lg:w-5/12 xl:w-4/12">
                                      <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-[60px] w-[60px] rounded-full bg-happy-yellow text-white">
                                          <img
                                            className="h-14 w-14 rounded-full"
                                            src={`https://avatars.dicebear.com/api/micah/${attendee.email}.svg?background=%23ffffff`}
                                            alt={attendee.name}
                                          />
                                        </div>
                                      </div>
                                      <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                          <div className="flex-1 ml-2">
                                            <p className="text-sm leading-5  text-gray-900 font-bold">
                                              {attendee.name}
                                            </p>
                                            <p className="text-sm leading-5 text-gray-500">
                                              {attendee.email}
                                            </p>
                                            <a
                                              href={`https://api.whatsapp.com/send?phone=${attendee.phone}`}
                                              className="text-sm leading-5 font-medium text-gray-900 underline"
                                            >
                                              +{attendee.phone}
                                            </a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="secondsection flex flex-col items-start justify-center lg:w-7/12 xl:w-8/12 lg:flex-row my-4 space-y-1 lg:space-y-0">
                                      <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                          <div className="flex-1 ml-2">
                                            <p className="text-sm leading-5 text-gray-500 font-bold">
                                              OrderId
                                            </p>
                                            <p className="text-sm leading-5 text-gray-500">
                                              {attendee.orderId}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                          <div className="flex-1 ml-2">
                                            <p className="text-sm leading-5 text-gray-500 font-bold">
                                              Registrado
                                            </p>
                                            <p className="text-sm leading-5 text-gray-500">
                                              {unixToFormat(
                                                attendee.registeredAt,
                                                "PP"
                                              )}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                          <div className="flex-1 ml-2">
                                            <p className="text-sm leading-5 text-gray-500 font-bold">
                                              Acerca de
                                            </p>
                                            <p className="text-sm leading-5 text-gray-500">
                                              {attendee.about}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })
                            ) : (
                              <p>No hay registrados para este evento</p>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="py-24 text-center">
                          <p className="bold text-red-500">
                            Theres no info about the event 😢
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminEventsShowPage;
