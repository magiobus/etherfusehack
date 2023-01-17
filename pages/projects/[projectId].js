import clientPromise from "@/lib/mongodb";
import MainLayout from "@/components/layouts/MainLayout";

const ProjectDetailPage = ({ project, event }) => {
  console.log("project =>", project);
  console.log("event =>", event);

  return (
    <MainLayout>
      <p>TODO: Event Page</p>
    </MainLayout>
  );
};

export default ProjectDetailPage;

export async function getStaticProps({ params }) {
  console.log("params =>,", params);
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
