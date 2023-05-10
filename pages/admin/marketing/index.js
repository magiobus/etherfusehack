/* eslint-disable react-hooks/exhaustive-deps */
import AdminLayout from "@/components/layouts/AdminLayout";
import { useState, useEffect } from "react";
import LoadingCircle from "@/components/common/LoadingCircle";
import Link from "next/link";
import PromoteWhatsappModal from "@/components/admin/marketing/PromoteWhatsappModal";

const AdminMarketing = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [data, SetData] = useState(undefined);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setIsInitialLoading(true);
    setIsInitialLoading(false);
  }, []);

  return (
    <AdminLayout>
      <div className="w-full flex justify-center">
        <div className="relative bg-white w-full ">
          <div>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                <div>
                  <div className="flex justify-between  w-full items-center ">
                    <h3 className="text-lg leading-6 font-medium bg-happy-middark text-happy-yellow px-2">
                      Marketing
                    </h3>
                  </div>
                </div>
              </div>
              <PromoteWhatsappModal
                isOpen={modalOpen}
                setIsOpen={setModalOpen}
              />
              <div className="content mx-6 py-4">
                <p className="mb-2">Selecciona una opción</p>
                <button
                  className=" w-full md:w-auto  bg-happy-pink px-2 py-1 bg-happy-middark  text-happy-yellow my-2 rounded-md"
                  onClick={() => setModalOpen(true)}
                >
                  Mandar mensajes masivos via whatsapp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminMarketing;
