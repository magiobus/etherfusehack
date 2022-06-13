import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { XIcon } from "@heroicons/react/solid";
import { useForm } from "react-hook-form";

const RegisterModal = ({ isOpen = false, setIsOpen, eventData }) => {
  const { name } = eventData;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  if (!isOpen) {
    return null;
  }

  const onSubmit = (data) => {
    console.log(data);

    const { about, email, name } = data;
    let { phoneNumber } = data;

    //format phone number
    phoneNumber = `52${phoneNumber.replace(/\D/g, "")}`;
    console.log(phoneNumber);

    //TODOS.
    //Check if email is already registered as a user and get id...
    //If not.... we need to register the user first...

    //check that the user is not already registered for the event...
    //if yes... show error message...
    //if not... register the user for the event... => then show confirmation page

    //send email to user with confirmation number or QR ?...
    //send whatsapp message to user (this would be nice)
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
              <Dialog.Panel className="w-full lg:max-w-4xl relative transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
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
                        htmlFor="phone-number"
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
                          name="phoneNumber"
                          id="phoneNumber"
                          className="focus:ring-happy-yellow-500 focus:border-happy-yellow-500 block w-full pl-16 sm:text-sm border-gray-300 rounded-md"
                          placeholder={`6141707622`}
                          {...register("phoneNumber", {
                            required: {
                              value: true,
                              message: "Teléfono es requerido",
                            },
                            maxLength: {
                              value: 15,
                              message: "No puede contener más de 15 caracteres",
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
                        {errors.phoneNumber?.message}
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
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
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

                  <div className="mt-4">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-happy-yellow px-4 py-2 text-sm font-medium text-white hover:bg-happy-yellow-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Registrarme
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default RegisterModal;
