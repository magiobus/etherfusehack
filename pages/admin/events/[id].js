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
import { Switch } from "@headlessui/react";

const AdminEventsShowPage = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [event, setEvent] = useState(undefined);
  const router = useRouter();

  const handleAttendance = async (orderId, currentValue) => {
    setFetchError(false);

    try {
      const res = await axios.put(
        `/api/admin/events/${router.query.id}/attendance`,
        { orderId, attended: !currentValue }
      );
      setEvent(res.data);
    } catch (error) {
      console.log("handle attendance error =>", error);
      setFetchError(true);
    }
  };

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
    if (id) {
      getUser();
    }
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
                      className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-happy-yellow hover:bg-happy-yellow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Volver a lista de eventos
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
                                    Inicio:{" "}
                                    {unixToFormat(
                                      event.startTime,
                                      "d 'de' MMMM yyyy h:mm aa"
                                    )}{" "}
                                  </p>
                                  <p>
                                    Fin:{" "}
                                    {unixToFormat(
                                      event.endTime,
                                      "d 'de' MMMM yyyy h:mm aa"
                                    )}{" "}
                                  </p>
                                </div>
                                <div className="infocontainer my-4">
                                  <div className="title flex items-center space-x-1 mb-2">
                                    <div className="icon w-5 h-5">
                                      <LocationMarkerIcon />
                                    </div>
                                    <p className="font-bold">Lugar</p>
                                  </div>
                                  <p className="">{event?.placeName}</p>
                                  <p className="">{event?.placeAddress}</p>
                                  <p className="capitalize">
                                    {event?.placeState}, {event?.placeCity}{" "}
                                    {event?.placeCountry}
                                  </p>
                                  <a
                                    href={event?.locationUrl}
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
                            <h2 className="font-bold">
                              Registrados{" "}
                              {event?.attendees &&
                                ` (${event.attendees.length})`}
                            </h2>
                            {event.attendees && event.attendees.length > 0 ? (
                              event.attendees.map((attendee, index) => {
                                return (
                                  <div
                                    key={index}
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
                                      <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                          <div className="flex-1 ml-2">
                                            <div className=" ">
                                              <label
                                                htmlFor="attendance"
                                                className="block text-sm font-medium text-gray-700"
                                              >
                                                Fue al evento
                                              </label>
                                              <div className="flex space-x-2">
                                                <Switch
                                                  checked={
                                                    attendee.attended
                                                      ? true
                                                      : false
                                                  }
                                                  onChange={() => {
                                                    handleAttendance(
                                                      attendee.orderId,
                                                      attendee.attended
                                                    );
                                                  }}
                                                  className={classNames(
                                                    attendee.attended
                                                      ? "bg-indigo-600"
                                                      : "bg-gray-200",
                                                    "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                  )}
                                                >
                                                  <span className="sr-only">
                                                    Use setting
                                                  </span>
                                                  <span
                                                    className={classNames(
                                                      attendee.attended
                                                        ? "translate-x-5"
                                                        : "translate-x-0",
                                                      "pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                                                    )}
                                                  >
                                                    <span
                                                      className={classNames(
                                                        attendee.attended
                                                          ? "opacity-0 ease-out duration-100"
                                                          : "opacity-100 ease-in duration-200",
                                                        "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                                                      )}
                                                      aria-hidden="true"
                                                    >
                                                      <svg
                                                        className="h-3 w-3 text-gray-400"
                                                        fill="none"
                                                        viewBox="0 0 12 12"
                                                      >
                                                        <path
                                                          d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                                                          stroke="currentColor"
                                                          strokeWidth={2}
                                                          strokeLinecap="round"
                                                          strokeLinejoin="round"
                                                        />
                                                      </svg>
                                                    </span>
                                                    <span
                                                      className={classNames(
                                                        attendee.attended
                                                          ? "opacity-100 ease-in duration-200"
                                                          : "opacity-0 ease-out duration-100",
                                                        "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                                                      )}
                                                      aria-hidden="true"
                                                    >
                                                      <svg
                                                        className="h-3 w-3 text-indigo-600"
                                                        fill="currentColor"
                                                        viewBox="0 0 12 12"
                                                      >
                                                        <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                                                      </svg>
                                                    </span>
                                                  </span>
                                                </Switch>
                                                {attendee.attended ? (
                                                  <div className="badge badge-success gap-2">
                                                    Si
                                                  </div>
                                                ) : (
                                                  <div className="badge badge-danger gap-2">
                                                    No
                                                  </div>
                                                )}
                                              </div>
                                            </div>
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
                            No hay información del evento 😢
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
