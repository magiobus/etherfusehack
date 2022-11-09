/* eslint-disable @next/next/no-img-element */
import AccountLayout from "@/components/layouts/AccountLayout";
import LoadingCircle from "@/components/common/LoadingCircle";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { isExpired } from "@/utils/ticketsHelpers";
import Pagination from "@/components/common/Pagination";
import EmptyState from "@/components/forms/EmptyState";

const ProfilePage = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [tickets, setTickets] = useState(null);
  const [page, setPage] = useState(1);
  const [paginationData, setPaginationData] = useState({});

  const pageSize = 5;
  const sortBy = "createdAt";
  const orderBy = "desc";
  const router = useRouter();
  const { data: session } = useSession();

  //get tickets when user is loaded
  useEffect(() => {
    const getTickets = async () => {
      setIsInitialLoading(true);
      try {
        const { data } = await axios.get(
          `/api/users/${session.user.id}/tickets/?page=${page}&limit=${pageSize}&sort=${sortBy}&order=${orderBy}`
        );

        const { tickets, count, totalPages } = data;
        console.log(data);
        setTickets(tickets);
        setPaginationData({
          page,
          pageSize: tickets.length,
          totalPages,
          totalCount: count,
        });
      } catch (err) {
        console.error(err);
        toast.error("Error al cargar los tickets");
      }

      setIsInitialLoading(false);
    };

    if (session) {
      getTickets();
    }
  }, [session, page]);

  return (
    <AccountLayout title="Mi Cuenta">
      <div className="w-full flex justify-center">
        <div className="relative bg-white w-full ">
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
              <div className="bg-black text-happy-yellow ">
                <h3 className="text-lg leading-6 font-medium w-full ">
                  Mis Tickets
                </h3>
              </div>

              {isInitialLoading ? (
                <LoadingCircle color="#000000" />
              ) : (
                <>
                  {tickets && tickets.length > 0 ? (
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Cantidad
                            </th>

                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Evento
                            </th>

                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Status
                            </th>

                            <th scope="col" className="relative px-6 py-3">
                              <span className="sr-only">Mostrar</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {tickets.map((ticket) => (
                            <tr key={ticket._id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="">
                                    <div className="text-sm text-gray-500 font-bold capitalize">
                                      {ticket.ticketQuantity}
                                      {ticket.ticketType &&
                                      ticket.ticketType === "participants"
                                        ? " Participante"
                                        : " Asistentes"}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {ticket?.event?.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {isExpired(ticket.expiresAt) === true
                                  ? "Vencido"
                                  : "Activo"}
                              </td>
                              <td className=" px-6 py-4  whitespace-nowrap text-right text-sm font-medium">
                                <a
                                  href={ticket?.qrUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className=" text-happy-yellow bg-black px-2 py-1 rounded-md"
                                >
                                  Ver Ticket
                                </a>
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
                    <div className="w-full text-red-600">
                      <EmptyState title="No tienes tickets 😢" />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
};

export default ProfilePage;
