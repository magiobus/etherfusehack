import unixToFormat from "@/utils/unixToFormat";
import Image from "next/image";
import { useState } from "react";

import { CalendarIcon, LocationMarkerIcon } from "@heroicons/react/solid";
import QRModal from "@/components/forms/QRModal";

const EventDetailCOntent = ({ event, ticketTypes, setJustScanned }) => {
  const {
    name,
    photo,
    startTime,
    endTime,
    placeName,
    placeAddress,
    placeState,
    placeCity,
    placeCountry,
    locationUrl,
  } = event;

  const [modalOpen, setModalOpen] = useState(false);
  const [ticketType, setTicketType] = useState(null);

  const handleTicketTypeChange = () => {
    setTicketType("attendees");
    setModalOpen(true);
  };

  return (
    <div className="topsectioncontainer max-w-7xl w-full flex justify-between items-center">
      <div className="eventtopinfo flex flex-col lg:flex-row lg:justify-between lg:items-center mt-2 mb-4">
        <div className="leftsection flex-shrink-0 w-full lg:w-5/12 ">
          {photo && <Image src={photo} alt={name} width={1280} height={640} />}
          <div className="register w-full mt-4">
            <button
              className="w-full bg-black px-2 py-1 text-happy-yellow rounded-md"
              onClick={() => handleTicketTypeChange()}
            >
              Escanear QR
            </button>
            <QRModal
              isOpen={modalOpen}
              setIsOpen={setModalOpen}
              ticketType={ticketType}
              setJustScanned={setJustScanned}
              event={event}
            />
          </div>
        </div>
        <div className="rightsection flex flex-col justify-center px-2 lg:px-8 w-full">
          <div className="infocontainer mt-4 ">
            <div className="title flex items-center space-x-1 mb-2">
              <div className="icon w-5 h-5">
                <CalendarIcon />
              </div>
              <p className="font-bold">Fecha y Hora</p>
            </div>
            <p>
              Inicio: {unixToFormat(startTime, "d 'de' MMMM yyyy h:mm aa")}{" "}
            </p>
            <p>Fin: {unixToFormat(endTime, "d 'de' MMMM yyyy h:mm aa")} </p>
          </div>
          <div className="infocontainer my-4">
            <div className="title flex items-center space-x-1 mb-2">
              <div className="icon w-5 h-5">
                <LocationMarkerIcon />
              </div>
              <p className="font-bold">Lugar</p>
            </div>
            <p className="">{placeName}</p>
            <p className="">{placeAddress}</p>
            <p className="capitalize">
              {placeState}, {placeCity} {placeCountry}
            </p>
            {locationUrl && (
              <a
                href={locationUrl}
                target="_blank"
                className="underline text-happy-pink"
                rel="noreferrer"
              >
                Ver Mapa
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailCOntent;
