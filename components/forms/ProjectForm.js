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
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

const ProjectForm = ({ type = "new" }) => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const router = useRouter();
  const [event, setEvent] = useState(null); //for set photo

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("data submit", data);
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

          <Divider
            label="Integrantes de tu equipo"
            className="mt-8"
            hideLine={true}
          />

          <Divider
            label="Información de tu proyecto"
            className="mt-8"
            hideLine={true}
          />
          <div className="inputwrapper my-3">
            <TextArea
              label="Describe en un tweet que hace tu proyecto"
              name="description"
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
            <ThumbImage
              label="Imágen de tu proyecto (opcional)"
              name="photo"
              dimensions="Medida Recomendada: 512x512px"
              register={{
                ...register("photo"),
              }}
              defaultValue={event?.photo}
              errorMessage={errors.photo?.message}
            />
          </div>
          <Divider label="Entregables" className="mt-8" hideLine={true} />
          <div className="inputwrapper my-3">
            <Input
              label="Url de repositorio de github"
              name="repoUrl"
              register={{
                ...register("repoUrl"),
              }}
              placeholder="https://github.com/magiobus/onlypanes"
            />
          </div>
          <div className="inputwrapper my-3">
            <Input
              label="Donde se puede ver tu proyecto en vivo?"
              name="liveUrl"
              register={{
                ...register("liveUrl"),
              }}
              placeholder="https://onlypanes.com"
            />
          </div>
        </div>

        <button
          type="submit"
          className="my-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-happy-yellow bg-black hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          disabled={buttonLoading}
        >
          {buttonLoading ? (
            <div className="inline-flex items-center justify-center">
              <LoadingCircle color="#000000" />
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
