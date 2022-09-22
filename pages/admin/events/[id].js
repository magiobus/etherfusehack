/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import AdminLayout from "@/components/layouts/AdminLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import EventDetail from "@/components/admin/events/EventDetail";

const AdminEventsShowPage = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [event, setEvent] = useState(undefined);
  const [justScanned, setJustScanned] = useState(false);

  const router = useRouter();
  const getEvent = async (id) => {
    setIsInitialLoading(true);
    try {
      const { data } = await axios.get(`/api/admin/events/${id}`);
      setEvent(data);
      setFetchError(false);
    } catch (err) {
      setFetchError(true);
    }
    setIsInitialLoading(false);
  };

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      getEvent(id);
    }
  }, [router.query]);

  useEffect(() => {
    if (justScanned) {
      getEvent(router.query.id);
    }
  }, [justScanned]);

  return (
    <AdminLayout title="Usuarios">
      <EventDetail
        event={event}
        isInitialLoading={isInitialLoading}
        fetchError={fetchError}
        setJustScanned={setJustScanned}
      />
    </AdminLayout>
  );
};

export default AdminEventsShowPage;
