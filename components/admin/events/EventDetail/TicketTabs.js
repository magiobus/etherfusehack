/* eslint-disable @next/next/no-img-element */
import unixToFormat from "@/utils/unixToFormat";
import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import { XCircleIcon, CheckCircleIcon } from "@heroicons/react/solid";

const TicketTabs = ({ event }) => {
  const { tickets } = event;
  const { attendees } = tickets;

  return (
    <>
      <Tab.Group>
        <Tab.List className="-mb-px flex space-x-8">
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={
                  selected
                    ? "border-happy-pink-500 text-happy-pink-600 whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm"
                }
              >
                🧒🏻 Asistentes ({attendees?.length ? attendees?.length : 0})
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={
                  selected
                    ? "border-happy-pink-500 text-happy-pink-600 whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm"
                }
              >
                📊 Estadísticas
              </button>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              {/* //registrados */}
              {attendees && attendees?.length > 0 ? (
                attendees.map((attendee, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-col lg:flex-row  lg:items-center lg:justify-between lg:px-4 py-4 lg:py-3 border-b border-gray-200"
                    >
                      <div className="maininfo flex items-center justify-start w-full lg:w-4/12 xl:w-4/12">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center h-[60px] w-[60px] rounded-full bg-happy-pink text-white">
                            <img
                              className="h-14 w-14 rounded-full"
                              src={`https://avatars.dicebear.com/api/micah/${attendee?.user?.email}.svg?background=%23ffffff`}
                              alt={attendee?.user?.name}
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="flex-1 ml-2">
                              <p className="text-sm leading-5  text-gray-900 font-bold">
                                {attendee?.user?.name}
                              </p>
                              <p className="text-sm leading-5 text-gray-500">
                                {attendee?.user?.email}
                              </p>
                              <a
                                href={`https://api.whatsapp.com/send?phone=${attendee?.user?.phone}`}
                                className="text-sm leading-5 font-medium text-gray-900 underline"
                              >
                                {attendee?.user?.phone}
                              </a>
                              <p className="text-sm leading-5 text-black my-1">
                                {attendee?.inPerson ? (
                                  <span className="bg-happy-yellow px-2 py-1 text-black">
                                    Presencial
                                  </span>
                                ) : (
                                  <span className="bg-happy-yellow px-2 py-1 text-black">
                                    Virtual
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="wrpr w-10/12 flex flex-row justify-start items-start  ">
                        <div className="secondsection flex flex-col items-start justify-center lg:w-8/12  lg:flex-row my-4 space-y-1 lg:space-y-0">
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div className="flex-1 ml-2">
                                <p className="text-sm leading-5 text-gray-500 font-semibold"></p>
                                {attendee?.qrUrl && (
                                  <a
                                    className="text-sm leading-5 text-gray-500 underline"
                                    href={attendee?.qrUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <span className="font-semibold text-xs">
                                      Orden
                                    </span>{" "}
                                    {attendee.orderId}
                                  </a>
                                )}

                                <p className="text-xs leading-5 text-gray-500">
                                  {" "}
                                  <span className="font-semibold">
                                    Creado:{" "}
                                  </span>
                                  {unixToFormat(attendee?.createdAt, "PP")}
                                </p>
                                {/* <p className="text-xs capitalize leading-5 text-gray-500">
                                  {" "}
                                  <span className="font-semibold">
                                    Playera:{" "}
                                  </span>{" "}
                                  {attendee?.shirtSize}
                                </p> */}

                                {attendee?.isMinor && (
                                  <p className="text-xs capitalize leading-5 text-gray-500">
                                    {" "}
                                    <span className="font-semibold">
                                      Menor 👦:{" "}
                                    </span>{" "}
                                    {attendee?.isMinor ? "Si" : "No"}
                                  </p>
                                )}

                                {attendee?.computerNeeded && (
                                  <p className="text-xs capitalize leading-5 text-gray-500">
                                    {" "}
                                    <span className="font-semibold">
                                      Necesita 💻?:{" "}
                                    </span>{" "}
                                    {attendee?.computerNeeded ? "Si" : "No"}
                                  </p>
                                )}

                                {attendee?.ipnStudent && attendee?.ipnUnit && (
                                  <p className="text-xs capitalize leading-5 text-gray-500">
                                    {" "}
                                    <span className="font-semibold">
                                      Unidad IPN:{" "}
                                    </span>{" "}
                                    {attendee?.ipnUnit}
                                  </p>
                                )}

                                {attendee?.otherInstitution && (
                                  <p className="text-xs capitalize leading-5 text-gray-500">
                                    {" "}
                                    <span className="font-semibold">
                                      Institución:{" "}
                                    </span>{" "}
                                    {attendee?.otherInstitution}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div className="flex-1 ml-2">
                                <p className="text-sm leading-5 text-gray-500 font-semibold">
                                  Acerca de
                                </p>
                                <p className="text-sm leading-5 text-gray-500">
                                  {attendee?.about}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 thirdsection ml-8 lg:ml-0 flex flex-col items-start justify-center lg:w-8/12 lg:flex-row my-4 space-y-1 lg:space-y-0">
                          <div className="flex items-center justify-between">
                            <div className="flex-1 ml-2">
                              <p className="text-sm leading-5 text-gray-500 font-bold">
                                Escaneado
                              </p>
                              <p className="text-sm leading-5  text-gray-500">
                                {attendee.used ? (
                                  <div className="iconcontainer w-6 h-6 text-green-500">
                                    <CheckCircleIcon />
                                  </div>
                                ) : (
                                  <div className="iconcontainer w-6 h-6 text-red-500">
                                    <XCircleIcon />
                                  </div>
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>No hay asistentes registrados para este evento</p>
              )}
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              {/* //estadisticas */}
              {attendees.length > 0 ? (
                <div className="flex flex-col items-start">
                  <ul className="max-w-sm w-ful">
                    <li className="flex justify-between">
                      <p className=" leading-5 text-gray-500 font-semibold">
                        Total de asistentes: {attendees.length}
                      </p>
                    </li>
                    <li className="flex justify-between mb-2">
                      <p className=" leading-5 text-gray-500 font-semibold">
                        Total Escaneados: :{" "}
                        {attendees.filter((a) => a.used).length}
                      </p>
                    </li>
                    <li className="flex justify-between">
                      <p className="text-sm leading-5 text-gray-500 font-semibold ">
                        Asistentes Virtuales:{" "}
                        {attendees.filter((a) => !a.inPerson).length}
                      </p>
                    </li>
                    <li className="flex justify-between">
                      <p className="text-sm leading-5 text-gray-500 font-semibold">
                        Asistentes Presenciales:{" "}
                        {attendees.filter((a) => a.inPerson).length}
                      </p>
                    </li>
                    <li className="flex justify-between">
                      <p className="text-xs leading-5 text-gray-500 font-semibold">
                        🖥 Necesitan Computadora:{" "}
                        {attendees.filter((a) => a.computerNeeded).length}
                      </p>
                    </li>

                    <li className="flex justify-between mt-4">
                      <p className="text-sm leading-5 text-gray-500 font-semibold">
                        🐣 Menores de edad:{" "}
                        {attendees.filter((a) => a.isMinor).length}
                      </p>
                    </li>
                    <li className="flex justify-between">
                      <p className="text-xs leading-5 text-gray-500 font-semibold">
                        Menores Virtuales:{" "}
                        {
                          attendees.filter((a) => a.isMinor && !a.inPerson)
                            .length
                        }
                      </p>
                    </li>
                    <li className="flex justify-between">
                      <p className="text-xs leading-5 text-gray-500 font-semibold">
                        Menores Presenciales:{" "}
                        {
                          attendees.filter((a) => a.isMinor && a.inPerson)
                            .length
                        }
                      </p>
                    </li>

                    <li className="flex justify-between mt-4">
                      <p className="text-sm leading-5 text-gray-500 font-semibold">
                        Alumnos IPN: {attendees.filter((a) => a.ipnUnit).length}
                      </p>
                    </li>
                  </ul>
                </div>
              ) : (
                <p>No hay asistentes</p>
              )}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  );
};

export default TicketTabs;
