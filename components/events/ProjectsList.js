/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

const ProjectsList = ({ projects, label = "Proyectos de este evento" }) => {
  return (
    <div className="container">
      <h2 className="bg-happy-middark text-happy-yellow text-center text-3xl">
        {projects.length > 0 && `${label} (${projects.length})`}
      </h2>
      {projects && projects.length > 0 ? (
        <div className="projects grid grid-cols-2 gap-x-4 gap-y-4 my-8  sm:grid-cols-5 sm:gap-x-6 lg:grid-cols-6 xl:grid-cols-7 xl:gap-x-6">
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
  const { _id, name, photo, winner } = data;

  return (
    <div className="itemcontainer  bg-transparent cursor-pointer ">
      <a href={`/projects/${_id}`}>
        <div className="image">
          <div className="group aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
            {photo ? (
              <Image
                src={photo}
                width="512"
                height="512"
                layout="responsive"
                alt=""
                className="pointer-events-none object-cover group-hover:opacity-75 bg-cover bg-center"
              />
            ) : (
              <img
                src={`https://avatars.dicebear.com/api/gridy/${name}.svg?mood[]=happy?background=%23ffffff`}
                alt={name}
                width={512}
                height={512}
                className="pointer-events-none object-cover group-hover:opacity-75 bg-cover bg-center"
              />
            )}
          </div>
          <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900 py-2 px-2 ">
            {name} {winner && <span className="text-happy-yellow">🏆</span>}
          </p>
        </div>
      </a>
    </div>
  );
};

export default ProjectsList;
