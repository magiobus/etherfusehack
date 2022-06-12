import Image from "next/image";
import unixToFormat from "@/utils/unixToFormat";
import Link from "next/link";

const EventsList = ({ data }) => {
  return (
    <div className="eventscontainer flex flex-col items-center md:items-center justify-center xl:items-center w-full ">
      <div className="max-w-7xl  w-full  ">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-flow-row xl:grid-cols-4">
          {data.map((event, index) => (
            <EventThumb key={event.id} data={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

const EventThumb = ({ data }) => {
  const { name, id, photo, startTime } = data;

  return (
    <Link href={`/events/${id}`} passHref>
      <div className="thumbitem  cursor-pointer mx-4 mb-4  shadow-md">
        <div className="photocontainer">
          <Image
            src={photo}
            alt={name}
            width={800}
            height={400}
            className="object-cover"
          />
        </div>
        <div className="textcontainer pb-4 px-2">
          <h2 className="title text-lg font-bold my-2">{name}</h2>
          <p className="capitalize text-happy-yellow-600 font-bold text-sm">
            {unixToFormat(startTime, "PPPPp")}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default EventsList;
