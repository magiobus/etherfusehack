/* eslint-disable react-hooks/exhaustive-deps */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { XIcon } from "@heroicons/react/solid";
import { useForm } from "react-hook-form";
import LoadingCircle from "@/components/common/LoadingCircle";
import axios from "axios";
import unixToFormat from "@/utils/unixToFormat";
import Input from "@/components/forms/fields/Input";
import TextArea from "@/components/forms/fields/TextArea";
import CheckBox from "@/components/forms/fields/CheckBox";
import TermsCheckBox from "@/components/forms/fields/TermsCheckBox";
import Select from "@/components/forms/fields/Select";
import parsePhoneNumber from "libphonenumber-js";
import PhoneInput from "@/components/forms/fields/PhoneInput";
import { isValidPhoneNumber } from "libphonenumber-js";

const shirtSizes = [
  { value: "none", label: "No quiero Playera" },
  { value: "s", label: "Chica" },
  { value: "m", label: "Mediana" },
  { value: "l", label: "Grande" },
  { value: "xl", label: "Extra Grande" },
];

const ipnUnits = [
  {
    value: "cicsUnidadSantoTomas",
    label: "CICS Unidad Santo Tomas",
  },
  {
    label: "CICS Unidad Milpa Alta",
    value: "cicsUnidadMilpaAlta",
  },
  {
    label: "ENBA",
    value: "enba",
  },
  {
    label: "ENCB",
    value: "encb",
  },
  {
    label: "ENMyH",
    value: "enmyh",
  },
  {
    label: "ESCA Unidad Santo Tomas",
    value: "escaUnidadSantoTomas",
  },
  {
    label: "ESCA Unidad Tepepan",
    value: "escaUnidadTepepan",
  },
  {
    label: "ESCOM",
    value: "escom",
  },
  {
    label: "ESE",
    value: "ese",
  },
  {
    label: "ESEO",
    value: "eseo",
  },
  {
    label: "ESFM",
    value: "esfm",
  },
  {
    label: " ESIME Unidad Zacatenco",
    value: "esimeUnidadZacatenco",
  },
  {
    label: "ESIME Unidad Azcapotzalco",
    value: "esimeUnidadAzcapotzalco",
  },
  {
    label: "ESIME Unidad Culhuacan",
    value: "esimeUnidadCulhuacan",
  },
  {
    label: "ESIME Unidad Ticoman",
    value: "esimeUnidadTicoman",
  },
  {
    label: "ESIQIE",
    value: "esiqie",
  },
  {
    label: "ESIT",
    value: "esit",
  },
  {
    label: "ESIA Unidad Tecamachalco",
    value: "esiaUnidadTecamachalco",
  },
  {
    label: "ESIA Unidad Ticoman",
    value: "esiaUnidadTicoman",
  },
  {
    label: "ESIA Unidad Zacatenco",
    value: "esiaUnidadZacatenco",
  },
  {
    label: "ESM",
    value: "esm",
  },
  {
    label: "EST",
    value: "est",
  },
  {
    label: "UPIIC Campus Coahuila",
    value: "upiicCampusCoahuila",
  },
  {
    label: "UPIBI",
    value: "upibi",
  },
  {
    label: "UPIIG Campus Guanajuato",
    value: "upiigCampusGuanajuato",
  },
  {
    label: "UPIIZ Campus Zacatecas",
    value: "upiizCampusZacatecas",
  },
  {
    label: "UPIIH Campus Hidalgo",
    value: "upiihCampusHidalgo",
  },
  {
    label: "UPIIP Campus Palenque",
    value: "upiipCampusPalenque",
  },
  {
    label: "UPIIT Campus Tlaxcala",
    value: "upiitCampusTlaxcala",
  },
  {
    label: "UPIICSA",
    value: "upiicsa",
  },
  {
    label: "UPIITA",
    value: "upiita",
  },
  {
    label: "UPIEM",
    value: "upiem",
  },
  {
    label: "CECyT No. 1",
    value: "cecytNo1",
  },
  {
    label: "CECyT No. 2",
    value: "cecytNo2",
  },
  {
    label: "CECyT No. 3",
    value: "cecytNo3",
  },
  {
    label: "CECyT No. 4",
    value: "cecytNo4",
  },
  {
    label: "CECyT No. 5",
    value: "cecytNo5",
  },
  {
    label: "CECyT No. 6",
    value: "cecytNo6",
  },
  {
    label: "CECyT No. 7",
    value: "cecytNo7",
  },
  {
    label: "CECyT No. 8",
    value: "cecytNo8",
  },
  {
    label: "CECyT No. 9",
    value: "cecytNo9",
  },
  {
    label: "CECyT No. 10",
    value: "cecytNo10",
  },
  {
    label: "CECyT No. 11",
    value: "cecytNo11",
  },
  {
    label: "CECyT No. 12",
    value: "cecytNo12",
  },
  {
    label: "CECyT No. 13",
    value: "cecytNo13",
  },
  {
    label: "CECyT No. 14",
    value: "cecytNo14",
  },
  {
    label: "CECyT No. 15",
    value: "cecytNo15",
  },
  {
    label: "CECyT No. 16",
    value: "cecytNo16",
  },
  {
    label: "CECyT No. 17",
    value: "cecytNo17",
  },
  {
    label: "CECyT No. 18",
    value: "cecytNo18",
  },
  {
    label: "CECyT No. 19",
    value: "cecytNo19",
  },
  {
    label: "CET 1, Walter Cross",
    value: "cet1WalterCross",
  },
];

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
    setError,
    clearErrors,
    getValues,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const countryWatch = watch("phoneCountry");
  const phoneWatch = watch("phone");
  const ipnStudentWatch = watch("ipnStudent");
  const ticketViaWAWatch = watch("ticketViaWhatsapp");

  const isValidPhone = async (phone, country) => {
    const isValidNumber = isValidPhoneNumber(phone, countryWatch);
    return isValidNumber;
  };

  const validatePhone = async (phone, country) => {
    const isValidNumber = await isValidPhone(phone, country);
    if (!isValidNumber) {
      setError("phone", {
        type: "manual",
        message: "Número de teléfono no válido",
      });
    } else {
      clearErrors("phone");
    }
  };

  useEffect(() => {
    if (countryWatch) {
      validatePhone(phoneWatch, countryWatch);
    }
  }, [countryWatch]);

  if (!isOpen) {
    return null;
  }

  const onSubmit = async (data) => {
    setIsLoading(true);
    setGlobalError(null);
    setIsRegistered(false);

    const {
      about,
      email,
      name,
      shirtSize,
      phone,
      phoneCountry,
      computerNeeded,
      ipnStudent,
      ipnUnit,
      isMinor,
    } = data;

    try {
      let parsedPhone = "";

      if (phone) {
        ///validates phone
        const phoneIsValid = await isValidPhone(phone, phoneCountry);

        if (!phoneIsValid) {
          toast.error("El número de teléfono no es válido");
          return; //this line, stops the function from executing
        }

        parsedPhone = parsePhoneNumber(phone, phoneCountry);
      }

      //Send data to server
      const response = await axios.post("/api/events/register", {
        about,
        email,
        name,
        phone: parsedPhone.number || "",
        phoneCountry: parsedPhone.country || "",
        startTimeLocalText: `${unixToFormat(
          eventData.startTime,
          "d 'de' MMMM yyyy h:mm aa"
        )}`,
        eventId: eventData._id,
        shirtSize,
        computerNeeded,
        ipnStudent,
        ipnUnit,
        isMinor,
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
                          className="text-lg font-medium leading-6 text-happy-yellow bg-black"
                        >
                          Registro para {name}
                        </Dialog.Title>
                        <div className="mt-4">
                          <p className="text-sm text-black ">
                            Ingresa tus datos para registrarte en el evento
                          </p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div className="fields max-w-md">
                            <div className="my-4 field">
                              <Input
                                label="Nombre Completo"
                                name="name"
                                type="text"
                                register={{
                                  ...register("name", {
                                    required: {
                                      value: true,
                                      message: "Nombre es requerido",
                                    },
                                  }),
                                }}
                                errorMessage={errors.name?.message}
                              />
                            </div>
                            <div className="my-4 field">
                              <Input
                                label="Email"
                                name="email"
                                type="email"
                                register={{
                                  ...register("email", {
                                    required: {
                                      value: true,
                                      message: "Email es requerido",
                                    },
                                  }),
                                }}
                                errorMessage={errors.email?.message}
                              />
                            </div>

                            <div className="field my-4">
                              <TextArea
                                label="Cuentanos sobre tí"
                                name="about"
                                placeholder="¿A que te dedicas? ¿Tienes algun proyecto en mente para el evento?"
                                errorMessage={errors.about?.message}
                                register={{
                                  ...register("about", {
                                    required: {
                                      value: true,
                                      message: "El campo es requerido",
                                    },
                                    maxLength: {
                                      value: 280,
                                      message:
                                        "No puede contener más de 280 caracteres",
                                    },
                                  }),
                                }}
                              />
                            </div>
                            <div className="field my-4"></div>
                            {eventData && eventData.isGivingShirts && (
                              <div className="field my-4">
                                <Select
                                  label="Talla de playera"
                                  name="shirtSize"
                                  options={shirtSizes}
                                  register={{
                                    ...register("shirtSize", {
                                      required: {
                                        value: true,
                                        message: "El Campo es requerido",
                                      },
                                    }),
                                  }}
                                  errorMessage={errors.shirtSize?.message}
                                />
                              </div>
                            )}
                          </div>

                          <div className="inputwrapper my-3">
                            <CheckBox
                              label="¿Estudias en el IPN ?  "
                              name="ipnStudent"
                              register={{
                                ...register("ipnStudent", {}),
                              }}
                              errorMessage={errors.ipnStudent?.message}
                            />
                          </div>

                          <div className="inputwrapper my-3">
                            {ipnStudentWatch && (
                              <Select
                                label="¿En qué unidad estudias?"
                                name="ipnUnit"
                                options={ipnUnits}
                                register={{
                                  ...register("ipnUnit", {
                                    required: {
                                      value: true,
                                      message: "El Campo es requerido",
                                    },
                                  }),
                                }}
                                errorMessage={errors.ipnUnit?.message}
                              />
                            )}
                          </div>

                          <div className="inputwrapper my-3">
                            <CheckBox
                              label="Necesitas una computadora para el evento ? "
                              description="Si necesitas una computadora para el evento, selecciona esta opción"
                              name="computerNeeded"
                              register={{
                                ...register("computerNeeded", {}),
                              }}
                              errorMessage={errors.computerNeeded?.message}
                            />
                          </div>

                          <div className="inputwrapper my-3">
                            <CheckBox
                              label="¿Eres menor de edad? "
                              description=""
                              name="isMinor"
                              register={{
                                ...register("isMinor", {}),
                              }}
                              errorMessage={errors.isMinor?.message}
                            />
                          </div>

                          <div className="inputwrapper my-3">
                            <CheckBox
                              label="Te mandamos tu ticket por Whatsapp ?  "
                              name="ticketViaWhatsapp"
                              register={{
                                ...register("ticketViaWhatsapp", {}),
                              }}
                              errorMessage={errors.ticketViaWhatsapp?.message}
                            />
                          </div>

                          {/* PHONE NUMBER */}
                          {ticketViaWAWatch && (
                            <div className="field my-4">
                              <PhoneInput
                                label="Número de teléfono"
                                name="phone"
                                type="tel"
                                onChange={(e) => {
                                  validatePhone(e.target.value, countryWatch);
                                }}
                                selectRegister={{
                                  ...register("phoneCountry", {
                                    required: {
                                      value: true,
                                      message: "El código de país es requerido",
                                    },
                                  }),
                                }}
                                register={{
                                  ...register("phone", {
                                    required: {
                                      value: true,
                                      message:
                                        "El número de teléfono es requerido",
                                    },
                                  }),
                                }}
                                errorMessage={errors.phone?.message}
                              />
                            </div>
                          )}

                          <div className="inputwrapper my-3">
                            <TermsCheckBox
                              label="Acepto los términos y condiciones"
                              name="terms"
                              register={{
                                ...register("terms", {
                                  required: {
                                    value: true,
                                    message: "Debes aceptar los términos",
                                  },
                                }),
                              }}
                              errorMessage={errors.terms?.message}
                            />
                          </div>

                          <div className="mt-4 text-red-500">{globalError}</div>

                          <div className="mt-4">
                            <button
                              type="submit"
                              className="inline-flex justify-center rounded-md border border-transparent bg-black text-happy-yellow px-4 py-2 text-sm font-medium  hover:bg-happy-yellow-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
                        <h1 className="text-3xl font-bold text-happy-yellow bg-black py-2">
                          ¡Gracias por registrarte!
                        </h1>
                        <p className="mt-4">
                          Nos vemos el{" "}
                          <span className="font-bold">
                            {unixToFormat(
                              eventData?.startTime,
                              "d 'de' MMMM yyyy h:mm aa"
                            )}{" "}
                          </span>
                        </p>

                        <p className="mt-4 font-bold">
                          Te mandamos un email con tu ticket y acceso al Discord
                          del evento.
                        </p>

                        <p className="mt-4">
                          <span className="font-bold">
                            Es importante que te unas lo antes posible
                          </span>
                          , ya que se realizarán dinamicas y tendremos un
                          bootcamp previo al evento.
                        </p>

                        <p className="mt-4">
                          <span className="font-bold">
                            Acá te dejamos el enlace:
                          </span>
                          <br />
                          <a
                            href="https://discord.gg/S3brFSH"
                            target="blank"
                            className="underline"
                          >
                            https://discord.gg/S3brFSH
                          </a>
                        </p>

                        <p className="mt-4">¡Nos vemos pronto ✌️!</p>
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
