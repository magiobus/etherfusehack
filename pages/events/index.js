import MainLayout from "@/components/layouts/MainLayout";
import Link from "next/link";
import EventsList from "@/components/events/EventsList";
import clientPromise from "@/lib/mongodb";
import dateNowUnix from "@/utils/dateNowUnix";

const EventsPage = ({ upcomingEvents, pastEvents }) => {
  return (
    <MainLayout title="Eventos">
      {/* upcoming events */}
      <div className="content flex flex-col justify-center items-center w-full m-0">
        <div className="wrapper max-w-7xl ">
          <div className="bg-white">
            <div className="max-w-7xl mx-auto mt-12 px-4 sm:py-18 sm:px-6 lg:px-8 ">
              <div className="text-center">
                <p className="text-3xl font-extrabold text-happy-yellow bg-black  sm:tracking-tight lg:text-4xl py-2">
                  Sedes del Hackathon
                </p>
                <p className="max-w-xl leading-3 mt-2 mx-auto text-black font-bold mb-8">
                  <span className="text-sm md:text-lg">
                    Elige la sede más cercana a tí
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <EventsList data={upcomingEvents} className="mt-6 lg:mt-12" />
      </div>
    </MainLayout>
  );
};

export default EventsPage;

export async function getStaticProps() {
  //get data from database here...
  const client = await clientPromise;
  const db = client.db();

  const events = await db
    .collection("events")
    .aggregate([
      {
        $match: {
          isPublic: true,
          archived: false,
        },
      },
      {
        $sort: {
          startTime: -1,
        },
      },
      {
        $project: {
          attendees: 0,
        },
      },
    ])
    .toArray();

  //divide events in upcomingevents and pastevents using unix timestamp
  let upcomingEvents = events.filter((event) => event.endTime > dateNowUnix());

  let pastEvents = events.filter((event) => event.endTime < dateNowUnix());

  upcomingEvents = upcomingEvents.sort((a, b) => a.startTime - b.startTime);
  pastEvents = pastEvents.sort((a, b) => b.startTime - a.startTime);

  upcomingEvents = JSON.parse(JSON.stringify(upcomingEvents));
  pastEvents = JSON.parse(JSON.stringify(pastEvents));

  return {
    props: {
      upcomingEvents,
      pastEvents,
    },
    revalidate: 5,
  };
}
