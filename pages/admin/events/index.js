/* eslint-disable @next/next/no-img-element */
import AdminLayout from "@/components/layouts/AdminLayout";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoadingCircle from "@/components/common/LoadingCircle";
import axios from "axios";
import unixToFormat from "@/utils/unixToFormat";
import classNames from "@/utils/classNames";
import Pagination from "@/components/common/Pagination";
import { isExpired } from "@/utils/eventHelpers";

const AdminEventsPage = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [events, setEvents] = useState(undefined);

  const [page, setPage] = useState(1);
  const [paginationData, setPaginationData] = useState({});

  const pageSize = 20;
  const sortBy = "createdAt";
  const orderBy = "desc";

  useEffect(() => {
    async function getEvents() {
      setIsInitialLoading(true);
      try {
        const { data } = await axios.get(
          `/api/admin/events/?page=${page}&limit=${pageSize}&sort=${sortBy}&order=${orderBy}`
        );
        const { events, count, totalPages } = data;

        console.log("events", events);

        setEvents(events);
        setPaginationData({
          page,
          pageSize: events.length,
          totalPages,
          totalCount: count,
        });
        setFetchError(false);
      } catch (err) {
        setFetchError(true);
      }
      setIsInitialLoading(false);
    }

    getEvents();
  }, [page]);

  return (
    <AdminLayout title="Eventos">
      <div className="w-full flex justify-center">
        <div className="relative bg-white w-full ">
          <div>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="bg-white py-6  space-y-6 ">
                <div className="flex justify-between px-8 w-full items-center ">
                  <h3 className="text-lg leading-6 font-medium text-happy-yellow bg-black">
                    Eventos
                  </h3>

                  <Link href="/admin/events/add" passHref>
                    <button
                      type="button"
                      className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-happy-yellow bg-black hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-happy-yellow"
                    >
                      Agregar Evento
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
                            Ocurrio un error trayendo los eventos 😢
                          </p>
                        </div>
                      ) : events && events.length > 0 ? (
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Nombre
                                </th>

                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Status
                                </th>

                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Registrados
                                </th>

                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Visibilidad
                                </th>

                                <th scope="col" className="relative px-6 py-3">
                                  <span className="sr-only">Mostrar</span>
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {events.map((event) => (
                                <tr key={event._id}>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                      <div className="ml-4">
                                        <div className="text-sm text-gray-500 font-bold capitalize">
                                          {event.name}
                                        </div>
                                      </div>
                                    </div>
                                  </td>

                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {isExpired(event) ? (
                                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                        Expirado
                                      </span>
                                    ) : (
                                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        Activo
                                      </span>
                                    )}
                                  </td>

                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {event?.ticketCount || 0}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <p
                                      className={classNames(
                                        event?.isPublic
                                          ? "bg-green-500"
                                          : "bg-red-500",
                                        "text-white  px-2 rounded-md gont-bold text-sm mt-2"
                                      )}
                                    >
                                      {event?.isPublic
                                        ? "Publico"
                                        : "No Publico"}
                                    </p>
                                  </td>

                                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Link href={`/admin/events/${event._id}`}>
                                      <a className="text-happy-yellow bg-black hover:text-happy-yellow px-2 py-1 rounded-md">
                                        Mostrar
                                      </a>
                                    </Link>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <Pagination
                            paginationData={paginationData}
                            setPage={setPage}
                          />
                        </div>
                      ) : (
                        <div className="py-24 text-center">
                          <p className="bold text-red-500">No hay Eventos 😢</p>
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

export default AdminEventsPage;
