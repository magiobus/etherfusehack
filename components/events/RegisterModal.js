import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { XIcon } from "@heroicons/react/solid";
import { useForm } from "react-hook-form";
import LoadingCircle from "@/components/common/LoadingCircle";
import axios from "axios";
import unixToFormat from "@/utils/unixToFormat";

const RegisterModal = ({ isOpen = false, setIsOpen, eventData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [globalError, setGlobalError] = useState(null);
  const [registered, setIsRegistered] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const { name, startTime } = eventData;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  if (!isOpen) {
    return null;
  }

  const onSubmit = async (data) => {
    setIsLoading(true);
    setGlobalError(null);
    setIsRegistered(false);

    const { about, email, name } = data;
    let { phone } = data;

    //format phone number
    phone = `52${phone.replace(/\D/g, "")}`;

    try {
      //Send data to server
      const response = await axios.post("/api/events/register", {
        about,
        email,
        name,
        phone,
        startTimeLocalText: `${unixToFormat(eventData.startTime, "PPPPp")} hrs`,
        eventId: eventData._id,
      });

      setOrderId(response.data.orderId);

      //if success, show success message in modal
      setIsRegistered(true);
    } catch (error) {
      const { message } = error.response.data;
      if (message) setGlobalError(message.es);
      else
        setGlobalError(
          "Error al registrar, contacta a magio@magiobus.com si sigues teniendo problemas"
        );
    }

    setIsLoading(false);
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
                  <div className="sm:block absolute top-0 right-0 pt-4 pr-4">
                    <button
                      type="button"
                      className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-happy-yellow-500"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  {!registered ? (
                    <div className="wrapper w-full flex justify-center items-center my-4">
                      <div className="formcontainer w-full max-w-lg justify-center items-center">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Registro para {name}
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Para registrarte en el evento, ingresa tus datos.
                          </p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div className="fields max-w-md">
                            <div className="my-4 field">
                              <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Email
                              </label>
                              <div className="mt-1">
                                <input
                                  type="email"
                                  name="email"
                                  id="email"
                                  className="shadow-sm focus:ring-happy-yellow-500 focus:border-happy-yellow-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                  {...register("email", {
                                    required: {
                                      value: true,
                                      message: "Email es requerido",
                                    },
                                  })}
                                />
                                <p className="text-sm mt-1 text-red-500">
                                  {errors.email?.message}
                                </p>
                              </div>
                            </div>
                            <div className="my-4 field">
                              <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Nombre
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  name="name"
                                  id="name"
                                  className="shadow-sm focus:ring-happy-yellow-500 focus:border-happy-yellow-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                  {...register("name", {
                                    required: {
                                      value: true,
                                      message: "Nombre es requerido",
                                    },
                                  })}
                                />
                                <p className="text-sm mt-1 text-red-500">
                                  {errors.name?.message}
                                </p>
                              </div>
                            </div>
                            <div className="field my-4">
                              <label
                                htmlFor="phone"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Teléfono
                              </label>
                              <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 flex items-center">
                                  <div className="flex items-center border-r-2 h-full py-0 pl-3 pr-4  bg-transparent text-gray-500 sm:text-sm rounded-md">
                                    <p>+52</p>
                                  </div>
                                </div>
                                <input
                                  type="text"
                                  name="phone"
                                  id="phone"
                                  className="focus:ring-happy-yellow-500 focus:border-happy-yellow-500 block w-full pl-16 sm:text-sm border-gray-300 rounded-md"
                                  placeholder={`6141707622`}
                                  {...register("phone", {
                                    required: {
                                      value: true,
                                      message: "Teléfono es requerido",
                                    },
                                    maxLength: {
                                      value: 15,
                                      message:
                                        "No puede contener más de 15 caracteres",
                                    },

                                    pattern: {
                                      value:
                                        /(\(\d{3}\)[.-]?|\d{3}[.-]?)?\d{3}[.-]?\d{4}/,
                                      message:
                                        "El numero debe de tener el siguiente formato: (614)5555666",
                                    },
                                  })}
                                />
                              </div>
                              <p className="text-sm mt-1 text-red-500">
                                {errors.phone?.message}
                              </p>
                            </div>
                            <div className="field my-4">
                              <label
                                htmlFor="about"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Cuentanos sobre ti
                              </label>
                              <div className="mt-1">
                                <textarea
                                  rows={4}
                                  name="about"
                                  id="about"
                                  className="shadow-sm focus:ring-happy-yellow-500 focus:border-happy-yellow-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                  defaultValue={""}
                                  placeholder="¿A que te dedicas? ¿Tienes algun proyecto en mente para el evento?"
                                  {...register("about", {
                                    required: {
                                      value: true,
                                      message: "El campo es requerido",
                                    },
                                    maxLength: {
                                      value: 280,
                                      message:
                                        "No puede contener más de 280 caracteres",
                                    },
                                  })}
                                />
                              </div>
                              <p className="text-sm mt-1 text-red-500">
                                {errors.about?.message}
                              </p>
                            </div>
                          </div>

                          <div className="mt-4 text-red-500">{globalError}</div>

                          <div className="mt-4">
                            <button
                              type="submit"
                              className="inline-flex justify-center rounded-md border border-transparent bg-happy-yellow px-4 py-2 text-sm font-medium text-white hover:bg-happy-yellow-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                              disabled={isLoading}
                            >
                              <div className="loadingcontainer flex justify-center items-center w-full">
                                {isLoading ? (
                                  <LoadingCircle color="#ffffff" />
                                ) : (
                                  "Registrarme"
                                )}
                              </div>
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-center">
                        <h1 className="text-3xl font-bold text-happy-yellow">
                          ¡Gracias por registrarte!
                        </h1>
                        <p className="mt-4">
                          Nos vemos el{" "}
                          <span className="font-bold">
                            {unixToFormat(eventData?.startTime, "PPPPp")} hrs
                          </span>
                        </p>
                        {orderId && (
                          <div className="registerId mt-4 ">
                            <p className="text-md font-bold text-black">
                              Tu ID de registro es:
                            </p>
                            <p className="text-md font-bold text-black">
                              {orderId}
                            </p>
                          </div>
                        )}

                        <p className="mt-4">
                          No olvides llevar tu computadora y tu numero de
                          registro para acceder al evento.
                        </p>

                        <p className="mt-4">¡Te esperamos!</p>
                      </div>
                    </div>
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

export default RegisterModal;
