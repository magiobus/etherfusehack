/* eslint-disable @next/next/no-img-element */
import unixToFormat from "@/utils/unixToFormat";
import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import { XCircleIcon, CheckCircleIcon } from "@heroicons/react/solid";

const TicketTabs = ({ event }) => {
  const { tickets, isGivingShirts } = event;
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
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="wrpr w-10/12 flex flex-row justify-start items-start  ">
                        <div className="secondsection flex flex-col items-start justify-center lg:w-8/12  lg:flex-row my-4 space-y-1 lg:space-y-0">
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div className="flex-1 ml-2">
                                <p className="text-sm leading-5 text-gray-500 font-semibold">
                                  OrderId
                                </p>
                                <p className="text-sm leading-5 text-gray-500">
                                  {attendee.orderId}
                                </p>
                                <p className="text-xs leading-5 text-gray-500">
                                  {" "}
                                  {unixToFormat(attendee?.createdAt, "PP")}
                                </p>
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
                            {isGivingShirts && (
                              <div className="flex items-center justify-between mt-2">
                                <div className="flex-1 ml-2">
                                  <p className="text-sm leading-5 text-gray-500 font-semibold">
                                    Talla de Playera
                                  </p>
                                  <p className="text-sm leading-5 text-gray-500 uppercase">
                                    {attendee?.shirtSize}
                                  </p>
                                </div>
                              </div>
                            )}
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
        </Tab.Panels>
      </Tab.Group>
    </>
  );
};

export default TicketTabs;
