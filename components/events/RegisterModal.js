/* eslint-disable react-hooks/exhaustive-deps */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
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
import { ipnUnits, itesmUnits } from "@/data/schoolunits";

const shirtSizes = [
  { value: "none", label: "No quiero Playera" },
  { value: "s", label: "Chica" },
  { value: "m", label: "Mediana" },
  { value: "l", label: "Grande" },
  { value: "xl", label: "Extra Grande" },
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
    formState: { errors },
  } = useForm();

  const inPersonWatch = watch("inPerson");
  const visitsFromWatch = watch("visitsFrom");
  const hyperstudentWatch = watch("hyperstudent");

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
      visitsFrom,
      inPerson,
      otherInstitution = "",
      discordId,
      githubUrl,
      country,
      role,
      skills,
      tracks,
      hyperstudent,
      hyperschool,
    } = data;

    try {
      const dataToSend = {
        about,
        email,
        name,
        startTimeLocalText: `${unixToFormat(
          eventData.startTime,
          "d 'de' MMMM yyyy h:mm aa"
        )}`,
        eventId: eventData._id,
        shirtSize,
        visitsFrom,
        inPerson: inPerson ? inPerson : false,
        otherInstitution,
        discordId,
        githubUrl,
        country,
        role,
        skills,
        tracks,
        hyperstudent,
        hyperschool,
      };

      //Send data to server
      const response = await axios.post("/api/events/register", dataToSend);
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
          <div className="fixed w-full inset-0 bg-happy-middark bg-opacity-25" />
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
                          className="text-lg font-medium leading-6 text-happy-cloralex bg-happy-middark"
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

                            <div className="my-4 field">
                              <Input
                                label="¿Cual es tu ID de Discord?"
                                name="discordId"
                                type="text"
                                register={{
                                  ...register("discordId", {
                                    required: {
                                      value: true,
                                      message: "Discord ID es requerido",
                                    },
                                  }),
                                }}
                                errorMessage={errors.discordId?.message}
                              />
                            </div>

                            <div className="my-4 field">
                              <Input
                                label="¿Cuál es tu URL de GitHub?"
                                name="githubUrl"
                                type="text"
                                register={{
                                  ...register("githubUrl", {
                                    required: {
                                      value: true,
                                      message: "URL de GitHub es requerido",
                                    },
                                  }),
                                }}
                                errorMessage={errors.githubUrl?.message}
                              />
                            </div>

                            <div className="my-4 field">
                              <Select
                                label="¿De dónde nos visitas?"
                                name="country"
                                options={[
                                  {
                                    value: "estadosunidos",
                                    label: "Estados Unidos",
                                  },
                                  { value: "mexico", label: "México" },
                                  { value: "colombia", label: "Colombia" },
                                  { value: "argentina", label: "Argentina" },
                                  { value: "bolivia", label: "Bolivia" },
                                  { value: "brasil", label: "Brasil" },
                                  { value: "chile", label: "Chile" },
                                  { value: "costa-rica", label: "Costa Rica" },
                                  { value: "cuba", label: "Cuba" },
                                  {
                                    value: "republicadominicana",
                                    label: "República Dominicana",
                                  },
                                  { value: "ecuador", label: "Ecuador" },
                                  {
                                    value: "el-salvador",
                                    label: "El Salvador",
                                  },
                                  { value: "guatemala", label: "Guatemala" },
                                  { value: "honduras", label: "Honduras" },
                                  { value: "nicaragua", label: "Nicaragua" },
                                  { value: "panama", label: "Panamá" },
                                  { value: "paraguay", label: "Paraguay" },
                                  { value: "peru", label: "Perú" },
                                  {
                                    value: "puertorico",
                                    label: "Puerto Rico",
                                  },
                                  { value: "uruguay", label: "Uruguay" },
                                  { value: "venezuela", label: "Venezuela" },
                                  { value: "canada", label: "Canada" },
                                ]}
                                register={{
                                  ...register("country", {
                                    required: {
                                      value: true,
                                      message: "País es requerido",
                                    },
                                  }),
                                }}
                                errorMessage={errors.country?.message}
                              />
                            </div>

                            <div className="my-4 field">
                              <Select
                                label="¿En que rol encajas mejor?"
                                name="role"
                                options={[
                                  {
                                    value: "engineering",
                                    label: "Ingeniero",
                                  },
                                  { value: "product", label: "Producto" },
                                  { value: "design", label: "Diseño" },
                                  {
                                    value: "business development",
                                    label: "Negocios",
                                  },
                                  { value: "marketing", label: "Marketing" },
                                ]}
                                register={{
                                  ...register("role", {
                                    required: {
                                      value: true,
                                      message: "Rol es requerido",
                                    },
                                  }),
                                }}
                                errorMessage={errors.role?.message}
                              />
                            </div>

                            <div className="my-4 field">
                              <Input
                                label="¿Qué habilidades o lenguajes de programación sabes?"
                                name="skills"
                                type="text"
                                register={{
                                  ...register("skills", {
                                    required: {
                                      value: true,
                                      message: "Habilidades son requeridas",
                                    },
                                  }),
                                }}
                                errorMessage={errors.skills?.message}
                              />
                            </div>

                            <div className="my-4 field">
                              <Select
                                label="¿Que tracks te interesan? (Puedes seleccionar varios)"
                                name="tracks"
                                multiple
                                options={[
                                  {
                                    value: "finance",
                                    label: "Finanzas y pagos",
                                  },
                                  {
                                    value: "ai",
                                    label: "Inteligencia Artificial",
                                  },
                                  {
                                    value: "mobile",
                                    label:
                                      "Aplicaciones móviles para consumidores",
                                  },
                                  {
                                    value: "crypto",
                                    label: "Infraestructura criptográfica",
                                  },
                                  {
                                    value: "daos",
                                    label: "DAOs y estados de red",
                                  },
                                  {
                                    value: "physical",
                                    label: "Infraestructura física de redes",
                                  },
                                  {
                                    value: "games",
                                    label: "Juegos y entretenimiento",
                                  },
                                  {
                                    value: "notsure",
                                    label: "No estoy seguro todavía",
                                  },
                                ]}
                                register={{
                                  ...register("tracks", {
                                    required: {
                                      value: true,
                                      message: "Tracks son requeridos",
                                    },
                                  }),
                                }}
                                errorMessage={errors.tracks?.message}
                              />
                            </div>

                            <div className="my-4 field">
                              <Select
                                label="Eres estudiante?"
                                name="hyperstudent"
                                options={[
                                  { value: "yes", label: "Sí" },
                                  { value: "no", label: "No" },
                                ]}
                                register={{
                                  ...register("hyperstudent", {
                                    required: {
                                      value: true,
                                      message: "Campo requerido",
                                    },
                                  }),
                                }}
                                errorMessage={errors.hyperstudent?.message}
                              />
                            </div>

                            {hyperstudentWatch === "yes" && (
                              <div className="my-4 field">
                                <Input
                                  label="¿En qué escuela estudias?"
                                  name="hyperschool"
                                  type="text"
                                  register={{
                                    ...register("hyperschool", {
                                      required: {
                                        value: true,
                                        message: "Campo requerido",
                                      },
                                    }),
                                  }}
                                  errorMessage={errors.hyperschool?.message}
                                />
                              </div>
                            )}

                            {/* <div className="inputwrapper my-3">
                              <Select
                                label="¿De dónde nos visitas?"
                                name="visitsFrom"
                                options={[
                                  {
                                    value: "itesm",
                                    label: "Tec de Monterrey",
                                  },
                                  {
                                    value: "unam",
                                    label: "UNAM",
                                  },
                                  {
                                    value: "ipn",
                                    label: "IPN",
                                  },
                                  {
                                    value: "itat",
                                    label: "ITAT",
                                  },
                                  {
                                    value: "otro",
                                    label: "Otro",
                                  },
                                ]}
                                register={{
                                  ...register("visitsFrom", {
                                    required: {
                                      value: true,
                                      message: "El Campo es requerido",
                                    },
                                  }),
                                }}
                                errorMessage={errors.visitsFrom?.message}
                              />
                            </div> */}

                            {/* <div className="inputwrapper my-3">
                              {visitsFromWatch === "itesm" && (
                                <Select
                                  label="¿En qué campus del Tec de Mty estudias?"
                                  name="otherInstitution"
                                  options={itesmUnits}
                                  register={{
                                    ...register("otherInstitution", {
                                      required: {
                                        value: true,
                                        message: "El Campo es requerido",
                                      },
                                    }),
                                  }}
                                  errorMessage={
                                    errors.otherInstitution?.message
                                  }
                                />
                              )}
                              {visitsFromWatch === "ipn" && (
                                <Select
                                  label="¿En qué unidad del IPN estudias?"
                                  name="otherInstitution"
                                  options={ipnUnits}
                                  register={{
                                    ...register("otherInstitution", {
                                      required: {
                                        value: true,
                                        message: "El Campo es requerido",
                                      },
                                    }),
                                  }}
                                  errorMessage={
                                    errors.otherInstitution?.message
                                  }
                                />
                              )}
                              {visitsFromWatch === "otro" && (
                                <div className="my-4 field">
                                  <Input
                                    label="Nombre de institución o empresa de la que nos visitas"
                                    name="otherInstitution"
                                    type="text"
                                    register={{
                                      ...register("otherInstitution", {
                                        required: {
                                          value: true,
                                          message: "El campo es requerido",
                                        },
                                      }),
                                    }}
                                    errorMessage={
                                      errors.otherInstitution?.message
                                    }
                                  />
                                </div>
                              )}
                            </div> */}

                            {/* <div className="field my-4">
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
                            </div> */}
                          </div>

                          {/* <div className="inputwrapper my-3">
                            <CheckBox
                              label="¿Asistirás al evento en persona en GDL ?"
                              description="Si dejas esta casilla en blanco, participarás en el evento de forma virtual"
                              name="inPerson"
                              register={{
                                ...register("inPerson", {}),
                              }}
                              errorMessage={errors.inPerson?.message}
                            />
                          </div> */}

                          {eventData &&
                            eventData?.isGivingShirts &&
                            inPersonWatch && (
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

                          {/* <div className="inputwrapper my-3">
                            <CheckBox
                              label="¿Eres menor de edad? "
                              description=""
                              name="isMinor"
                              register={{
                                ...register("isMinor", {}),
                              }}
                              errorMessage={errors.isMinor?.message}
                            />
                          </div> */}

                          <p className="text-sm text-black italic">
                            Si estas trabajando en equipo, por favor asegurate
                            que cada miembro de tu equipo se registre
                            individualmente.
                          </p>

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
                              className="inline-flex justify-center rounded-md border border-transparent bg-happy-middark text-happy-text px-4 py-2 text-sm font-medium  hover:bg-happy-yellow-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
                        <h1 className="text-3xl font-bold text-happy-cloralex bg-happy-middark py-2">
                          ¡Gracias por registrarte!
                        </h1>
                        {/* <p className="mt-4">
                          Nos vemos {!inPersonWatch && "virtualmente "} el{" "}
                          <span className="font-bold">
                            {unixToFormat(
                              eventData?.startTime,
                              "d 'de' MMMM yyyy h:mm aa"
                            )}{" "}
                          </span>
                        </p> */}

                        <p className="mt-4 font-bold">
                          Te mandamos un email con{" "}
                          {inPersonWatch
                            ? "tu ticket QR para acceder al evento 😎"
                            : "información del evento 😎"}
                        </p>

                        <p className="mt-4">
                          <span className="font-bold">
                            Es importante que te unas lo antes posible a Discord
                            y te presentes en el canal de #intros
                          </span>{" "}
                        </p>

                        <div className="bannersito bg-happy-middark text-happy-cloralex py-1 my-4">
                          <p className="mt-4">
                            <span className="font-bold">
                              Acá te dejamos el enlace a Discord:
                            </span>
                            <br />
                            <a
                              href="https://discord.gg/7NBUWVthPR"
                              target="blank"
                              className="underline text-happy-text"
                            >
                              https://discord.gg/7NBUWVthPR
                            </a>
                          </p>

                          <p className="my-4">
                            <span className="font-bold">
                              Aprende con &quot;Solana para Noobs&quot; de
                              SuperteamMX
                            </span>
                            <br />
                            <a
                              href="https://learn.superteam.mx/"
                              target="blank"
                              className="underline text-happy-text"
                            >
                              https://learn.superteam.mx/{" "}
                            </a>
                          </p>
                        </div>

                        <p className="mt-4 font-bold">¡Nos vemos pronto ✌️!</p>
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
