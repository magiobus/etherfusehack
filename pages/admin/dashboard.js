import AdminLayout from "@/components/layouts/AdminLayout";
import { useEffect, useState } from "react";
import LoadingCircle from "@/components/common/LoadingCircle";
import axios from "axios";

const AdminDashboardPage = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [stats, setStats] = useState(undefined);
  useEffect(() => {
    async function getStats() {
      setIsInitialLoading(true);
      try {
        const { data } = await axios.get(`/api/admin/stats/`);
        setStats(data);
        setFetchError(false);
      } catch (err) {
        setFetchError(true);
      }
      setIsInitialLoading(false);
    }

    getStats();
  }, []);
  return (
    <AdminLayout>
      <div className="w-full flex justify-center">
        <div className="relative bg-white w-full ">
          <div>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                <div className="">
                  <h3 className="text-lg leading-6 font-medium text-happy-yellow bg-black">
                    Estadisticas
                  </h3>
                  <div className="mt-12">
                    {isInitialLoading ? (
                      <div className="py-24">
                        <LoadingCircle color="#000000" />
                      </div>
                    ) : fetchError ? (
                      <div className="py-24 text-center">
                        <p className="bold text-red-500">
                          Something happened loading stats 😢
                        </p>
                      </div>
                    ) : stats && stats.length > 0 ? (
                      stats.map((item, index) => (
                        <div
                          className="containter w-full  font-semibold"
                          key={index}
                        >
                          <h2 className="mt-4">{item.name}</h2>
                          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                            {item.values.map((value) => (
                              <div
                                className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6"
                                key={value._id}
                              >
                                <dt className="text-sm font-medium text-gray-500 truncate capitalize">
                                  {value.nameEs}
                                </dt>
                                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                                  {value.stat}
                                </dd>
                              </div>
                            ))}
                          </dl>
                        </div>
                      ))
                    ) : (
                      <div className="py-24 text-center">
                        <p className="bold text-red-500">
                          Theres no stats available 😢
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
    </AdminLayout>
  );
};

export default AdminDashboardPage;
