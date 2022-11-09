import Image from "next/image";

const ProjectsList = ({ projects }) => {
  return (
    <div className="container">
      <h2 className="bg-black text-happy-yellow text-center text-3xl">
        Proyectos de este evento {projects.length > 0 && `(${projects.length})`}
      </h2>
      {projects && projects.length > 0 ? (
        <div className="projects">
          {projects.map((project) => (
            <div className="project" key={project._id}>
              <ProjectItem data={project} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No hay proyectos para este evento</p>
      )}
    </div>
  );
};

const ProjectItem = ({ data }) => {
  const { name, photo, description, problem, repoUrl, liveUrl, members } = data;

  return (
    <div className="itemcontainer my-8 bg-gray-200 flex flex-col lg:flex-row w-full  ">
      <div className="flex w-full justify-center items-center lg:justify-start lg:w-96 ">
        <div className="topsection w-full lg:w-96 bg-black h-full">
          <p className="capitalize font-semibold bg-black text-happy-yellow px-2  py-2">
            {name}
          </p>
          <div className="imagecontainer flex justify-center  md:my-4  ">
            {photo ? (
              <Image src={photo} alt={name} width={512} height={512} />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`https://avatars.dicebear.com/api/gridy/${name}.svg?mood[]=happy?background=%23ffffff`}
                alt={name}
                width={512}
                height={512}
              />
            )}
          </div>
        </div>
      </div>
      <div className="content  px-2 pb-2  lg:py-12 lg:px-8  border-2 border-black w-full ">
        {description && (
          <p className="text-sm leading-5 my-2">
            <span className="font-bold">Descripción: </span>
            {description}
          </p>
        )}{" "}
        {problem && (
          <p className="text-sm leading-5 my-2">
            <span className="font-bold">Problema: </span>
            {problem}
          </p>
        )}
        {repoUrl && (
          <div className="text-sm leading-5 my-2">
            <span className="font-bold">Repositorio: </span>
            <a
              href={repoUrl}
              target="_blank"
              rel="noreferrer"
              className="underline text-blue-800"
            >
              {repoUrl}
            </a>
          </div>
        )}
        {liveUrl && (
          <div className="text-sm leading-5 my-2">
            <span className="font-bold">Preview: </span>
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="underline text-blue-800"
            >
              {liveUrl}
            </a>
          </div>
        )}
        {members && members.length > 0 && (
          <div className="text-sm leading-5 my-2">
            <span className="font-bold">Integrantes: </span>
            <div className="memberscontainer">
              {members.map((member, index) => (
                <div className="member capitalize  " key={index}>
                  {member?.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsList;
