import Image from "next/image";

const ProjectsList = ({ projects }) => {
  return (
    <div className="container">
      <h2 className="bg-black text-happy-yellow text-center text-xl">
        Proyectos de este evento
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
    <div className="itemcontainer my-8 ">
      <div className="flex w-full justify-center items-center">
        <div className="imagecontainer w-full">
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
      <div className="content   ">
        <p className="capitalize font-semibold bg-black text-happy-yellow">
          {name}
        </p>
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
