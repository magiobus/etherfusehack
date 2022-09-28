/* eslint-disable react-hooks/exhaustive-deps */
import OrganizerLayout from "@/components/layouts/OrganizerLayout";
import { useState, useEffect } from "react";
import LoadingCircle from "@/components/common/LoadingCircle";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import Pagination from "@/components/common/Pagination";

const OrganizerEvents = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [data, setData] = useState(undefined);

  const [page, setPage] = useState(1);
  const [paginationData, setPaginationData] = useState({});

  const pageSize = 9;
  const sortBy = "createdAt";
  const orderBy = "desc";

  useEffect(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    async function getEvents() {
      setIsInitialLoading(true);
      try {
        const response = await axios.get(
          `/api/organizer/events/?page=${page}&limit=${pageSize}&sort=${sortBy}&order=${orderBy}`
        );

        const { events, count, totalPages } = response.data;
        setData(events);
        setPaginationData({
          page,
          pageSize: events.length,
          totalPages,
          totalCount: count,
        });
        setFetchError(false);
      } catch (err) {
        console.error("err =>", err);
        setFetchError(true);
      }
      setIsInitialLoading(false);
    }
    getEvents();
  }, [page]);

  return (
    <OrganizerLayout>
      <div className="w-full flex justify-center">
        <div className="relative bg-white w-full ">
          <div>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                <div>
                  <div className="headercontainer">
                    <h3 className="text-lg leading-6 font-medium text-happy-yellow bg-black">
                      Mis Eventos
                    </h3>
                  </div>
                  <div className="mt-8">
                    {isInitialLoading ? (
                      <div className="py-24">
                        <LoadingCircle color="#000000" />
                      </div>
                    ) : fetchError ? (
                      <div className="py-24 text-center">
                        <p className="bold text-red-500">
                          Ocurrio un error al cargar los eventos
                        </p>
                      </div>
                    ) : data && data.length > 0 ? (
                      <>
                        <dl className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                          {data.map((event, index) => (
                            <Link
                              key={event._id}
                              href={`/organizer/events/${event._id}`}
                            >
                              <a>
                                <div className="eventcontainer flex flex-col cursor-pointer bg-black rounded-md ">
                                  <Image
                                    src={event?.photo}
                                    alt={event?.name}
                                    width={1280}
                                    height={640}
                                    className="p-0 m-0 rounded-t-md"
                                  />
                                  <p className="font-semibold rounded-b-md px-2 py-1 m-0 bg-happy-pink text-sm text-happy-yellow truncate capitalize">
                                    {event.name}
                                  </p>
                                </div>
                              </a>
                            </Link>
                          ))}
                        </dl>
                      </>
                    ) : (
                      <div className="py-24 text-center w-full">
                        <p className="bold text-happy-pink">
                          Aún no tienes eventos 😢
                        </p>
                      </div>
                    )}
                    {paginationData && data && data.length > 0 && (
                      <Pagination
                        paginationData={paginationData}
                        setPage={setPage}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </OrganizerLayout>
  );
};

export default OrganizerEvents;
