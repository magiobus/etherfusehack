/* eslint-disable react-hooks/exhaustive-deps */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { XIcon } from "@heroicons/react/solid";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { TextArea, CheckBox } from "@/components/forms/fields";
import LoadingCircle from "@/components/common/LoadingCircle";
import toast from "react-hot-toast";
import parsePhoneNumber from "libphonenumber-js";
import axios from "axios";

const PromoteWhatsappModal = ({ isOpen = false, setIsOpen }) => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [progressBarValue, setProgressBarValue] = useState(0);
  const [sendingMessages, setSendingMessages] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (!isOpen) {
    return null;
  }

  const onSubmit = async (data) => {
    setButtonLoading(true);

    const { message, allParticipantUsers } = data;
    let query = "";

    if (allParticipantUsers) {
      query = "all";
    }

    if (!query) {
      toast.error("Selecciona opciones para enviar el mensaje");
      setButtonLoading(false);
      return;
    }

    const usersToSend = [];
    const parsedMessage = message.replace(/\n/g, " ");

    try {
      switch (query) {
        case "all":
          const { data } = await axios.get("/api/admin/users/allparticipants");
          const users = data.users;

          console.log(users);

          const usersWithPhone = users.filter((user) => user.phone);
          //parse phone numbers and delete the ones without whatsapp notification enabled
          const parsedUsers = usersWithPhone.map((user) => {
            const parsedPhone = parsePhoneNumber(user.phone, "MX");
            return {
              ...user,
              phone: parsedPhone.number,
            };
          });

          //delete the ones without whatsapp notification enabled
          // const usersWithWhatsappEnabled = parsedUsers.filter(
          //   (user) => user.whatsappNotifications === true
          // );

          //adding the users to the array
          usersToSend.push(...parsedUsers);
      }

      //do whatsapp parsing
      const usersWithWhatsapp = usersToSend.map((user) => {
        const waData = {
          to: user.phone,
          template: "etherfuse_notifications",
          locale: "es_MX",
          components: [
            {
              type: "body",
              parameters: [
                {
                  type: "text",
                  text: `${parsedMessage}`,
                },
              ],
            },
          ],
        };
        return waData;
      });

      console.log("usersWithWhatsapp", usersWithWhatsapp);

      //are u sure?
      if (
        !confirm(
          `¿El mensaje se enviara a ${usersWithWhatsapp.length} usuarios, estas segur@?`
        )
      ) {
        setButtonLoading(false);
        setSendingMessages(false);
        setProgressBarValue(0);
        return;
      }

      setSendingMessages(true);
      setProgressBarValue(0);

      //send message to users iterating
      //if one fails, continue with the rest
      //update the user with the message sent and progress bar
      for (let i = 0; i < usersWithWhatsapp.length; i++) {
        const user = usersWithWhatsapp[i];

        try {
          await axios.post("/api/marketing/whatsapp/sendtemplate", user);
          setProgressBarValue(
            (((i + 1) * 100) / usersWithWhatsapp.length).toFixed(2)
          );
        } catch (error) {
          setProgressBarValue(
            (((i + 1) * 100) / usersWithWhatsapp.length).toFixed(2)
          );
          console.error("error =>", error);
          toast.error(`Error al enviar mensaje a ${user.to}`);
        }
      }

      toast.success("Proceso de envío de mensajes finalizado");

      //get all users
    } catch (error) {
      console.error("error =>", error);
      toast.error("Error al enviar el mensaje");
    }

    setButtonLoading(false);
    setSendingMessages(false);
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
                      className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-happy-pink-500"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="content">
                    <h2 className="text-happy-yellow bg-black font-bold">
                      Promocionar evento via whatsapp
                    </h2>
                    {sendingMessages ? (
                      <div className="flex flex-col items-center justify-center">
                        <p className="font-bold mt-12 mb-6">
                          Enviando mensajes...
                        </p>
                        <div
                          className="radial-progress text-happy-pink"
                          style={{
                            "--value": progressBarValue,
                            "--size": "8rem",
                            "--thickness": "1rem",
                            "--color": "#00ffff",
                          }}
                        >
                          {progressBarValue}%
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="inputwrapper mt-4 mb-2">
                          <p className="mt-2 font-bold mb-4 text-sm">
                            Elige destinatarios del mensaje
                          </p>
                          <CheckBox
                            label="Todos los participantes de etherfuse"
                            description="Se mandará un mensaje a todos los usuarios de etherfuse hackathon."
                            name="allParticipantUsers"
                            register={{
                              ...register("allParticipantUsers"),
                            }}
                          />
                        </div>

                        <TextArea
                          label="Mensaje"
                          name="message"
                          type="text"
                          register={{
                            ...register("message", {
                              required: {
                                value: true,
                                message: "El mensaje es requerido",
                              },
                            }),
                          }}
                          errorMessage={errors.message?.message}
                        />
                        <button
                          type="submit"
                          className="my-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-happy-yellow bg-black hover:bg-happy-pink focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          disabled={buttonLoading}
                        >
                          {buttonLoading ? (
                            <div className="inline-flex items-center justify-center">
                              <LoadingCircle color="#ffffff" />
                            </div>
                          ) : (
                            "Enviar"
                          )}
                        </button>
                      </form>
                    )}
                  </div>
                </Dialog.Panel>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PromoteWhatsappModal;
