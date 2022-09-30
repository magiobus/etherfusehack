import LoadingCircle from "@/components/common/LoadingCircle";
import EventDetailHeader from "@/components/admin/events/EventDetail/Header";
import EventDetailContent from "@/components/admin/events/EventDetail/Content";
import TicketTabs from "./TicketTabs";

const EventDetail = ({
  event,
  isInitialLoading,
  fetchError,
  setJustScanned,
}) => {
  return (
    <div className="w-full flex justify-center">
      <div className="relative bg-white w-full ">
        <div>
          <div className=" sm:rounded-md sm:overflow-hidden">
            <div className="bg-white py-6 space-y-6 ">
              {event && <EventDetailHeader event={event} />}
              <div className="flex flex-col px-4">
                <div className="-my-2 max-w-7xl w-full sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full w-full sm:px-6 lg:px-8">
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
                      <div className="lg:mx-4 lg:p-2 shadow  border-b border-gray-200 sm:rounded-lg w-full ">
                        <EventDetailContent
                          event={event}
                          setJustScanned={setJustScanned}
                        />
                        {event && event.tickets && (
                          <div className="ticketabscontainer w-full max-w-7xl  overflow-scroll">
                            <TicketTabs
                              event={event}
                              setJustScanned={setJustScanned}
                            />
                          </div>
                        )}
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
  );
};

export default EventDetail;
