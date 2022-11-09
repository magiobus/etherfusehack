import Image from "next/image";
import unixToFormat from "@/utils/unixToFormat";
import Link from "next/link";

const EventsList = ({ data }) => {
  return (
    <div className="eventscontainer flex flex-col items-center md:items-center justify-center xl:items-center w-full mt-12 mb-16 ">
      <div className="max-w-7xl  w-full  ">
        {data && data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-flow-row ">
            {data.map((event) => (
              <EventThumb key={event._id} data={event} />
            ))}
          </div>
        ) : (
          <div className="emptystate w-full flex justify-center items-center">
            <p>No hay eventos disponibles 😢 </p>
          </div>
        )}
      </div>
    </div>
  );
};

const EventThumb = ({ data }) => {
  const { name, _id, photo, startTime } = data;

  return (
    <Link href={`/events/${_id}`} passHref>
      <div className="thumbitem  cursor-pointer mx-4 mb-4  shadow-md bg-black rounded-b-lg rounded-t-lg">
        <div className="photocontainer ">
          <Image
            src={photo}
            alt={name}
            width={800}
            height={400}
            className="object-cover rounded-t-lg"
          />
        </div>
        <div className="textcontainer  text-happy-yellow ">
          <div className="text px-4">
            <h2 className="title text-lg font-bold mt-2 ">{name}</h2>
            <p className="capitalize text-happy-yellow-600 font-bold text-sm mb-4">
              {unixToFormat(startTime, "PPPP")}
            </p>
          </div>
          <button className="bg-happy-yellow text-black font-bold px-2 rounded-b-md cursor-pointer w-full py-2">
            Ver evento
          </button>
        </div>
      </div>
    </Link>
  );
};

export default EventsList;
