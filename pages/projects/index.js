import MainLayout from "@/components/layouts/MainLayout";
import ProjectsList from "@/components/events/ProjectsList";
import clientPromise from "@/lib/mongodb";

const ProjectsPage = ({ projects }) => {
  return (
    <MainLayout title="Proyectos">
      <div className="w-full flex justify-center items-center">
        <div className="max-w-7xl  w-full md:px-8 lg:px-0 lg:mt-8">
          <div className="content flex justify-start  items-center w-full">
            <div className="max-w-7xl w-full mx-auto  px-4 sm:py-18 sm:px-6 lg:px-8 xl:px-0  ">
              {projects && projects.length > 0 && (
                <div className="my-8" id="eventprojects">
                  <ProjectsList
                    projects={projects}
                    label="Proyectos construidos en etherfuse hackathon"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProjectsPage;

export async function getStaticProps() {
  //get data from database here...
  const client = await clientPromise;
  const db = client.db();

  const projects = await db
    .collection("projects")
    .aggregate([
      {
        $sort: {
          createdAt: -1,
        },
      },
    ])
    .toArray();

  const projectsData = JSON.parse(JSON.stringify(projects));

  return {
    props: {
      projects: projectsData,
    },
    revalidate: 5,
  };
}
