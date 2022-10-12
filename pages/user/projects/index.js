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
  const [projects, setProjects] = useState(null);
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
                  Mis Proyectos
                </h3>
              </div>

              {isInitialLoading ? (
                <LoadingCircle color="#000000" />
              ) : (
                <>
                  {projects && projects.length > 0 ? (
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      here goes the projects
                    </div>
                  ) : (
                    <div className="w-full text-red-600">
                      <EmptyState
                        title="No tienes proyectos 😢"
                        buttonText="Crea un proyecto"
                        buttonUrl="/user/projects/add"
                      />
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
