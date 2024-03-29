/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import clientPromise from "@/lib/mongodb";
import MainLayout from "@/components/layouts/MainLayout";
import Link from "next/link";
import YoutubeIframe from "@/components/common/YoutubeIframe";
import unixToFormat from "@/utils/unixToFormat";
import ShareButtons from "@/components/events/ShareButtons";
import confetti from "canvas-confetti";
import { useEffect } from "react";

const ProjectDetailPage = ({ project, event }) => {
  const {
    _id,
    name,
    photo,
    eventId,
    videoUrl,
    repoUrl,
    liveUrl,
    description,
    problem,
    tech,
    members,
    updatedAt,
    whatsnext,
    winner,
  } = project;
  const { name: eventName } = event;

  const shareUrl = `https://hackathon.etherfuse.com/projects/${_id}`;
  const sharedMessage = `Revisa ${name}, el proyecto que hice en el hackathon de @etherfuse!`;

  const getYoutubeId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  };

  //CONFETTI if is a winner
  useEffect(() => {
    if (window && winner) {
      const conffetielement = document.getElementById("conffetielement");
      const myConfetti = confetti.create(conffetielement, {
        resize: true,
        useWorker: true,
      });

      myConfetti({
        particleCount: 100,
        angle: 60,
        spread: 180,
        origin: { x: 0 },
        lifetime: 10000,
      });
      // and launch a few from the right edge
      myConfetti({
        particleCount: 100,
        angle: 120,
        spread: 180,
        origin: { x: 1 },
        lifetime: 10000,
      });
    }
  }, []);

  return (
    <MainLayout>
      <canvas
        id="conffetielement"
        className="absolute top-0 left-0 w-full h-screen pointer-events-none"
      ></canvas>
      <div className="flex w-full justify-center items-center">
        <div className="contentwrapper max-w-sm md:max-w-2xl lg:max-w-7xl flex flex-col items-center justify-center my-8 w-full ">
          {/* header */}
          <div
            className="header text-center flex flex-col justify-center items-center w-full"
            id="projectheader"
          >
            <div className="logo mb-2">
              {photo ? (
                <img
                  className="w-28 h-28 md:h-36 md:w-36 rounded-md"
                  src={photo}
                  alt={`Etherfuse ${name} logo`}
                />
              ) : (
                <img
                  className="w-28 h-28 md:h-36 md:w-36 rounded-md"
                  src={`https://avatars.dicebear.com/api/gridy/${name}.svg?mood[]=happy?background=%23ffffff`}
                  alt={`Etherfuse ${name} logo`}
                />
              )}
            </div>
            <h1 className="title text-2xl md:text-3xl font-bold text-center capitalize truncate w-full">
              {name} {winner && <span className="winner">🏆</span>}
            </h1>
            <div className="text-sm md:text-base">
              <span className="font-bold">Creado en: </span>
              <Link href={`/events/${eventId}`}>
                <a className="underline cursor-pointer lowercase">
                  {eventName}
                </a>
              </Link>
            </div>
            {updatedAt && (
              <div className="text-sm my-1">
                <span className="italic ">
                  Última Actualización: &nbsp;
                  {unixToFormat(updatedAt, "PP -  hh:mm aaa")}
                </span>
              </div>
            )}
          </div>

          {winner && (
            <div className="winner bg-happy-middark text-happy-yellow px-2 py-1 my-2">
              <Link href={`/events/${eventId}`}>
                <a>Este equipo fue ganador en {eventName} 🎉</a>
              </Link>
            </div>
          )}

          {/* VIDEO */}
          <div className="videoembed mt-4 w-full lg:max-w-3xl">
            <div className="flex flex-col justify-between items-center">
              <div className="videohere w-full md:min-h-[480px] h-full">
                {/* //height should be different for tablet and desktop */}
                {videoUrl ? (
                  <YoutubeIframe
                    youtubeId={getYoutubeId(videoUrl) || "ps1Pqen803U"}
                  />
                ) : (
                  <YoutubeIframe youtubeId={"ps1Pqen803U"} />
                )}
              </div>
            </div>
          </div>
          {/* URLS */}
          <div className="deliveryurls mt-4 max-w-sm w-full md:mt-0 lg:max-w-3xl  flex justify-center flex-col items-center ">
            {repoUrl && (
              <div className="repository flex flex-col  max-w-sm w-full text-center">
                <p className="font-bold text-center">Código: &nbsp;</p>
                <a
                  className="underline cursor-pointer w-full truncate px-4 md:px-0 "
                  href={`${repoUrl}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {repoUrl}
                </a>
              </div>
            )}
            {liveUrl && (
              <div className="repository flex flex-col  max-w-sm w-full text-center">
                <p className="font-bold text-center mt-2  md:mt-4">
                  Pruébalo en: &nbsp;
                </p>
                <a
                  className="underline cursor-pointer  truncate px-4 md:px-0 w-full"
                  href={`${liveUrl}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {liveUrl}
                </a>
              </div>
            )}
          </div>
          <div className="textwrapper my-4 px-4 md:px-0">
            {/* TEXT */}
            <div className="text lg:max-w-3xl w-full">
              {problem && (
                <div className="whatitdoes text-center my-8">
                  <h2 className="font-bold text-xl">
                    ¿Qué problema resuelve ?{" "}
                  </h2>
                  <p className="leading-5 my-2 text-base">{problem}</p>
                </div>
              )}
              {description && (
                <div className="whatitdoes text-center my-8">
                  <h2 className="font-bold text-xl">
                    ¿Qué hace {name || "el proyecto"} ?{" "}
                  </h2>
                  <p className="leading-5 my-2 text-base">{description}</p>
                </div>
              )}
              {whatsnext && (
                <div className="whatitdoes text-center my-8">
                  <h2 className="font-bold text-xl">
                    ¿Qué sigue para {name || "el proyecto"} ?{" "}
                  </h2>
                  <p className="leading-5 my-2 text-base">{whatsnext}</p>
                </div>
              )}
              {tech && (
                <div className="whatitdoes text-center my-8">
                  <h2 className="font-bold text-xl">
                    ¿Qué tecnologías se usaron ?{" "}
                  </h2>
                  <p className="leading-5 my-2 text-base">{tech}</p>
                </div>
              )}
            </div>

            {/* MEMBERS */}
            <div className="text lg:max-w-3xl w-full">
              {members && (
                <div className="members text-center my-4 mt-0">
                  <h2 className="font-bold text-xl">
                    ¿Quiénes participaron ?{" "}
                  </h2>
                  {members.map((member, index) => (
                    <div
                      className="flex flex-col items-center justify-center"
                      key={index}
                    >
                      {member.name && (
                        <a
                          href={`mailto:${member?.email}`}
                          target={"_blank"}
                          rel="noreferrer"
                          className="leading-5 mt-2 text-base underline cursor-pointer"
                        >
                          <span className="font-bold capitalize">
                            {member?.name}
                          </span>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <div className="sharecontainer flex flex-col justify-center items-center">
                <ShareButtons
                  label="Comparte este proyecto en redes sociales"
                  shareUrl={shareUrl}
                  sharedMessage={sharedMessage}
                  centered={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProjectDetailPage;

export async function getStaticProps({ params }) {
  const client = await clientPromise;
  const db = client.db();
  const { ObjectId } = require("mongodb");

  //get all porjects with event info using eventId field which is a string, eventId on event is an objectid
  try {
    const project = await db
      .collection("projects")
      .aggregate([
        {
          $match: {
            _id: ObjectId(params.projectId),
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ])
      .toArray();

    if (!project || project.length === 0) {
      return {
        notFound: true,
      };
    }

    //get eventinfo

    const { eventId } = project[0];

    const event = await db.collection("events").findOne(
      {
        _id: ObjectId(eventId),
      },
      {
        projection: {
          _id: 1,
          name: 1,
        },
      }
    );

    const projectData = JSON.parse(JSON.stringify(project[0]));
    const eventData = JSON.parse(JSON.stringify(event));
    return {
      props: {
        project: projectData,
        event: eventData,
      },
      revalidate: 5,
    };
  } catch (error) {
    console.error("erro getting project", error);
    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  const client = await clientPromise;
  const db = client.db();

  const projects = await db
    .collection("projects")
    .find({}, { projection: { _id: 1 } })
    .limit(20)
    .toArray();

  const projectsData = JSON.parse(JSON.stringify(projects));

  const paths = projectsData.map((project) => {
    return {
      params: {
        projectId: project._id,
      },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
}
