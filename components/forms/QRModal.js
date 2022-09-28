/* eslint-disable react-hooks/exhaustive-deps */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";
import { QrReader } from "react-qr-reader";
import { useEffect, useState } from "react";
import { decode } from "js-base64";
import axios from "axios";
import LoadingCircle from "@/components/common/LoadingCircle";

const QRModal = ({
  isOpen = false,
  setIsOpen,
  ticketType,
  setJustScanned,
  event,
}) => {
  const [ticketTypeText, setTicketTypeText] = useState("");
  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [globalError, setGlobalError] = useState(null);
  const scanDelay = 500;

  useEffect(() => {
    let name = "";
    if (ticketType === "attendees") {
      name = "Asistentes";
    }

    setTicketTypeText(name);
    setJustScanned(false);
  }, [ticketType]);

  if (!isOpen) {
    return null;
  }

  if (!ticketType) {
    return null;
  }

  const handleCloseModal = (success = false) => {
    setIsOpen(false);
    setResultData(null);
    setScanned(false);
    setGlobalError(null);
    if (success) {
      setJustScanned(true);
    }
  };

  //SCAN EVENTS
  const handleScan = async (data, error) => {
    if (!!data) {
      setLoading(true);
      const text = data.text;
      const decoded = decode(text);
      const { eventId, orderId, ticketType, user } = JSON.parse(decoded);
      setScanned(true);
      try {
        //send data to api to get ticket info
        const { data: ticket } = await axios.post(
          "/api/organizer/tickets/readqr",
          {
            eventId,
            orderId,
            ticketType,
            user,
            currentEventId: event._id,
          }
        );

        setResultData(ticket);
      } catch (error) {
        console.error("error message", error?.response?.data?.message?.es);
        setGlobalError(
          error?.response?.data?.message?.es || "Ocurrió un Error desconocido"
        );
        console.error("ocurrió un error leyendo ticket =>", error);
      }
      setLoading(false);
    }

    if (!!error && JSON.stringify(error) !== JSON.stringify({})) {
      setScanned(true);
      setGlobalError("Ocurrió un error");
      console.error("handleScan error", error);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10 w-full"
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed w-full inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex w-full min-h-full items-center justify-center lg:p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="contentcontainer flex w-full justify-center items-center">
                <Dialog.Panel className="w-full md:max-w-2xl relative transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  {loading ? (
                    <div className="py-24">
                      <LoadingCircle color="#000000" />
                    </div>
                  ) : globalError ? (
                    <div className="flex flex-col items-center justify-center">
                      <div className="iconcontainer w-12 h-12 text-red-500">
                        <XCircleIcon />
                      </div>
                      <p className="text-red-500 font-semibold">
                        {globalError}
                      </p>
                      <div className="buttoncontainer mt-4 flex justify-center items-center">
                        <button
                          className="rounded-lg px-2 py-1 bg-happy-pink text-black"
                          onClick={() => handleCloseModal()}
                        >
                          Cerrar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {!scanned && (
                        <>
                          <div className="title flex justify-center ite-center font-semibold">
                            <h3>Escanea el código QR</h3>
                          </div>
                          <QrReader
                            scanDelay={scanDelay}
                            onResult={handleScan}
                            videoContainerStyle={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "10px",
                              paddingTop: "76.25%",
                            }}
                            videoStyle={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "10px",
                              objectFit: "cover",
                              marginTop: "10px",
                              marginBottom: "10px",
                            }}
                            constraints={{
                              facingMode: "environment",
                            }}
                            className="qrreader  py-0 my-0 rounded-md"
                          />
                          <div className="buttoncontainer mt-4 flex justify-center items-center">
                            <button
                              className="rounded-lg px-2 py-1 bg-happy-pink text-white"
                              onClick={() => handleCloseModal()}
                            >
                              Cerrar
                            </button>
                          </div>
                        </>
                      )}
                      {resultData && (
                        <div className="ticketInfo">
                          <div className="title w-full flex flex-col items-center justify-center font-bold">
                            <div className="iconcontainer w-12 h-12 text-green-500">
                              <CheckCircleIcon />
                            </div>

                            <p className="text-sm">
                              El ticket ha sido escaneado exitosamente
                            </p>

                            <h3 className="mt-4">Información del ticket</h3>
                            <p className="text-xs mb-4">
                              {resultData?.orderId}
                            </p>

                            {resultData?.ticketType === "attendees" && (
                              <>
                                <p className="font-semibold">Asistente</p>
                                <p className="font-semibold leading-3 capitalize">
                                  {resultData?.user?.name}
                                </p>
                              </>
                            )}

                            {resultData?.ticketType === "participants" && (
                              <>
                                <p className="font-semibold">Participante</p>
                                <p className="font-semibold leading-3 capitalize">
                                  {resultData?.user?.name}
                                </p>
                              </>
                            )}
                          </div>
                          <div className="content mt-2 flex flex-col justify-center items-center">
                            <div className="quantity text-2xl">
                              <p>{resultData?.ticketQuantity} Tickets</p>
                            </div>
                          </div>
                          <div className="buttoncontainer mt-4 flex justify-center items-center">
                            <button
                              className="rounded-lg px-2 py-1 bg-happy-pink text-white"
                              onClick={() => handleCloseModal(true)}
                            >
                              Cerrar
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </Dialog.Panel>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default QRModal;
