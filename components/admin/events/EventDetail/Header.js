import classNames from "@/utils/classNames";
import EventTypeTag from "@/components/events/EventTypeTag";
import Link from "next/link";

const EventDetailHeader = ({ event }) => {
  const { name, isPublic, eventType } = event;
  return (
    <>
      <div className="flex justify-between px-4 w-full items-center ">
        <div className="title flex flex-col items-start justify-center">
          <h3 className="text-2xl leading-6 font-medium text-gray-900">
            Evento: {name}
          </h3>
          <div className="tags flex items-center space-x-2">
            <p
              className={classNames(
                isPublic ? "bg-green-500" : "bg-red-500",
                "text-white  px-2 rounded-md gont-bold text-sm mt-2"
              )}
            >
              {isPublic ? "Publico" : "No Publico"}
            </p>

            <EventTypeTag eventType={eventType} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetailHeader;
