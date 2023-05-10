/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import {
  Input,
  Divider,
  TextArea,
  Select,
  ThumbImage,
} from "@/components/forms/fields";

import { useEffect, useState } from "react";
import LoadingCircle from "@/components/common/LoadingCircle";
import toast from "react-hot-toast";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

const tracksOptions = [
  { label: "Decaf Payments ☕️💳", value: "decafpayments" },
  { label: "Decaf Remittances ☕️💸", value: "decafremittences" },
  { label: "Mirror World 🪞🌍", value: "mirrorworld" },
  { label: "Hello Moon API 🌝", value: "hellomoon" },
];

const ProjectForm = ({ type = "new" }) => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [project, setProject] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  //fetch project info for editing
  useEffect(() => {
    const fetchProjectData = async () => {
      const { data } = await axios.get(`/api/projects/${router.query.id}`);

      const { members } = data;
      const parsedProject = {
        _id: data?._id,
        name: data?.name,
        description: data?.description,
        liveUrl: data?.liveUrl,
        problem: data?.problem,
        repoUrl: data?.repoUrl,
        eventId: data?.eventId,
        photo: data?.photo,
        videoUrl: data?.videoUrl,
        tech: data?.tech,
        whatsnext: data?.whatsnext,
        tracks: data?.tracks,
      };

      //parsing members
      if (members && members.length > 0) {
        members.map((member, index) => {
          parsedProject[`members[${index}].name`] = member.name || "";
          parsedProject[`members[${index}].email`] = member.email || "";
          parsedProject[`members[${index}].discord`] = member.discord || "";
        });
      }

      delete parsedProject.members;

      reset(parsedProject);
      setProject(parsedProject);
    };

    if (type === "edit") fetchProjectData();
  }, [events]);

  //Get Events where user is registred
  useEffect(() => {
    const getEvents = async () => {
      try {
        const { data } = await axios.get(`/api/users/myevents`);
        const eventsOptions = data.map((event) => ({
          label: event.name,
          value: event._id,
        }));

        setEvents(eventsOptions);

        //if events options is empty and user is trying to create a project, redirect to events page
        if (eventsOptions.length === 0 && type === "new") {
          toast.error(
            "Debes de estar registrado en un evento para crear un proyecto..."
          );
          setTimeout(() => {
            router.push("/events");
          }, 2000);
          return;
        }
      } catch (error) {
        console.error(error);
        toast.error("Error al cargar los eventos");
      }
    };

    getEvents();
  }, []);

  const onSubmit = async (data) => {
    setButtonLoading(true);
    const { members } = data;
    if (!members[0].name || !members[0].email || !members[0].discord) {
      toast.error("Debes de tener al menos un integrante en tu equipo");
      setButtonLoading(false);
      return;
    }

    try {
      const newData = { ...data };

      //Delete members initial parsing from newData
      if (type === "edit") {
        for (let i = 0; i < members.length; i++) {
          delete newData[`members[${i}].name`];
          delete newData[`members[${i}].email`];
          delete newData[`members[${i}].discord`];
        }
      }

      //convert to form data
      const formData = new FormData();
      //if image is a string, it means it's a url, so we don't need to send it
      if (typeof data?.photo === "string") {
        delete newData.photo;
      }

      Object.keys(newData).forEach((key) => {
        if (key === "photo") {
          if (data[key][0]) formData.append(key, data[key][0]); //append image file to formData
        } else {
          formData.append(key, data[key]); //append regular keys to form data
        }
      });

      //parse members array of objects to form data
      members.forEach((member, index) => {
        Object.keys(member).forEach((key) => {
          formData.append(`members_${index}_${key}`, member[key]);
        });
      });

      const options = {
        headers: {
          accept: "application/json",
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        },
      };

      if (type === "new") {
        await axios.post("/api/projects", formData, options);
        toast.success("Proyecto creado con éxito");
        setTimeout(() => {
          router.push(`/user/projects`);
        }, 2000);
      } else if (type === "edit") {
        await axios.put(`/api/projects/${router.query.id}`, formData, options);
        toast.success("Proyecto actualizado con éxito, redirigiendo...");
        setTimeout(() => {
          router.push(`/user/projects`);
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al crear el proyecto u.u");
    }

    setButtonLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="italic mb-4">La información se puede cambiar luego.</p>
        <div className="proyectinfocontainer">
          <div className="inputwrapper my-3">
            <Input
              label="Nombre del proyecto * "
              name="name"
              register={{
                ...register("name", {
                  required: {
                    value: true,
                    message: "El nombre del proyecto es requerido",
                  },
                  maxLength: {
                    value: 50,
                    message: "No puede contener más de 50 caracteres",
                  },
                }),
              }}
              placeholder="Escribe el nombre de tu proyecto"
              errorMessage={errors.name?.message}
            />
          </div>
          <div className="inputwrapper my-3">
            <Select
              label="A que sede pertenece tu proyecto? * "
              name="eventId"
              options={events}
              register={{
                ...register("eventId", {
                  required: {
                    value: true,
                    message: "La sede es requerida",
                  },
                }),
              }}
              errorMessage={errors.eventId?.message}
            />
          </div>
          <div className="inputwrapper my-3">
            <Select
              label="En que tracks del hackathon quieres participar? * (Puedes seleccionar varias utilizando la tecla ctrl) "
              name="tracks"
              options={tracksOptions}
              multiple={true}
              register={{
                ...register("tracks", {
                  required: {
                    value: true,
                    message: "El campo es requerido",
                  },
                }),
              }}
              errorMessage={errors.tracks?.message}
            />
          </div>
          <Divider
            label="Integrantes de tu equipo"
            className="mt-8 mb-4"
            labelClassName="bg-happy-middark text-happy-yellow"
            hideLine={true}
          />
          <p className="italic">Máximo 5 integrantes.</p>
          <p className="text-sm mb-4 font-bold">
            🚨 Por favor que sólo una persona por equipo llene el formulario
          </p>

          <div className="team-members-container">
            {[0, 1, 2, 3, 4].map((value, key) => {
              return (
                <div className="container " key={key}>
                  <p className="mb-2 italic font-semibold">
                    Integrante {value + 1}
                  </p>
                  <div className="wrapper flex flex-col lg:flex-row lg:space-x-6">
                    <Input
                      label={`Nombre`}
                      name={`members[${value}].name`}
                      register={{
                        ...register(`members[${value}].name`),
                      }}
                      errorMessage={errors[`members[${value}].name`]?.message}
                    />
                    <Input
                      label={`Email`}
                      name={`members[${value}].email`}
                      register={{
                        ...register(`members[${value}].email`, {
                          pattern: {
                            value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/i,
                            message: "Email Inválido",
                          },
                        }),
                      }}
                    />
                    <Input
                      label={`Usuario de Discord`}
                      name={`members[${value}].discord`}
                      register={{
                        ...register(`members[${value}].discord`),
                      }}
                      errorMessage={
                        errors[`members[${value}].discord`]?.message
                      }
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <Divider
            label="Información de tu proyecto"
            className="mt-8"
            labelClassName="bg-happy-middark text-happy-yellow"
            hideLine={true}
          />
          <div className="inputwrapper my-3">
            <TextArea
              label="Describe en un tweet que hace tu proyecto"
              name="description"
              placeholder="Ejemplo:  Plataforma, que permite hacer subastas de monedas de colección en línea utilizando la red de Solana."
              register={{
                ...register("description", {
                  minLength: {
                    value: 100,
                    message: "Debe de tener minimo 100 caracteres",
                  },
                  maxLength: {
                    value: 280,
                    message: "Debe de tener maximo 280 caracteres",
                  },
                }),
              }}
              errorMessage={errors.description?.message}
            />
          </div>
          <div className="inputwrapper my-3">
            <TextArea
              label="Que problema resuelve tu proyecto?"
              name="problem"
              placeholder="Ejemplo: Los coleccionistas de monedas de colección no tienen una plataforma para hacer subastas de manera segura y confiable."
              register={{
                ...register("problem", {
                  minLength: {
                    value: 100,
                    message: "Debe de tener minimo 100 caracteres",
                  },
                  maxLength: {
                    value: 600,
                    message: "Debe de tener maximo 600 caracteres",
                  },
                }),
              }}
              errorMessage={errors.problem?.message}
            />
          </div>
          <div className="inputwrapper my-3">
            <TextArea
              label="Que sigue para tu proyecto?"
              name="whatsnext"
              placeholder="Ejemplo: Nos hubiera gustado agregar un sistema de puntuación para los usuarios, para que puedan tener un historial de sus compras y ventas, también hubiera sido interesante agregar un sistema de notificaciones para que los usuarios puedan estar al tanto de las subastas que se estan llevando a cabo."
              register={{
                ...register("whatsnext", {
                  minLength: {
                    value: 100,
                    message: "Debe de tener minimo 100 caracteres",
                  },
                  maxLength: {
                    value: 600,
                    message: "Debe de tener maximo 600 caracteres",
                  },
                }),
              }}
              errorMessage={errors.whatsnext?.message}
            />
          </div>
          <div className="inputwrapper my-3">
            <Input
              label="¿Que tecnologías utilizaste?"
              name="tech"
              placeholder="Ejemplo: React, Next.js, TailwindCSS, Solana, Rust "
              register={{
                ...register("tech", {
                  maxLength: {
                    value: 50,
                    message: "No puede contener más de 80 caracteres",
                  },
                }),
              }}
              errorMessage={errors.tech?.message}
            />
          </div>

          <div className="inputwrapper my-3">
            <ThumbImage
              label="Imágen de tu proyecto (opcional)"
              name="photo"
              dimensions="Medida Recomendada: 512x512px"
              register={{
                ...register("photo"),
              }}
              defaultValue={project?.photo}
              errorMessage={errors.photo?.message}
            />
          </div>
          <Divider
            label="Entregables"
            className="mt-8"
            labelClassName="bg-happy-middark text-happy-yellow"
            hideLine={true}
          />
          {/* //NEEDS TO START WITH HTTP OR HTTPS, can be any page , and can be root*/}
          <div className="inputwrapper my-3">
            <Input
              label="Url de repositorio de github"
              name="repoUrl"
              register={{
                ...register("repoUrl", {
                  pattern: {
                    value:
                      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/i,
                    message:
                      "Url inválida, necesita comenzar con https:// o http://",
                  },
                }),
              }}
              placeholder="Ejemplo: https://github.com/magiobus/onlypanes"
              errorMessage={errors.repoUrl?.message}
            />
          </div>
          <div className="inputwrapper my-3">
            <Input
              label="Donde se puede ver tu proyecto en vivo?"
              name="liveUrl"
              register={{
                ...register("liveUrl", {
                  pattern: {
                    value:
                      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/i,
                    message:
                      "Url inválida, necesita comenzar con https:// o http://",
                  },
                }),
              }}
              placeholder="Ejemplo: https://onlypanes.com"
              errorMessage={errors.liveUrl?.message}
            />
          </div>
          <div className="inputwrapper my-3">
            <Input
              label="Video Demo de tu proyecto (2 minutos máximo)"
              name="videoUrl"
              register={{
                ...register("videoUrl", {
                  pattern: {
                    value:
                      /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|watch\?.+&v=|embed\/|v\/)?[a-zA-Z0-9-_]+$/i,
                    message:
                      "Url inválida, necesita comenzar con https:// o http:// y ser de youtube",
                  },
                }),
              }}
              placeholder="Ejemplo: https://youtu.be/tiscOKXrxrQ"
              errorMessage={errors.videoUrl?.message}
            />
          </div>
        </div>

        <button
          type="submit"
          className="my-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-happy-yellow bg-happy-middark hover:bg-happy-middark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          disabled={buttonLoading}
        >
          {buttonLoading ? (
            <div className="inline-flex items-center justify-center">
              <LoadingCircle color="#ffffff" />
            </div>
          ) : type === "new" ? (
            "Crear Proyecto"
          ) : (
            "Actualizar Proyecto"
          )}
        </button>
      </form>
    </>
  );
};

export default ProjectForm;
