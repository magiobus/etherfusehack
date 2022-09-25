import MainLayout from "@/components/layouts/MainLayout";
import Link from "next/link";
import EventsList from "@/components/events/EventsList";
import eventsData from "@/data/fakeevents.json";
import clientPromise from "@/lib/mongodb";
import dateNowUnix from "@/utils/dateNowUnix";

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

const EventsPage = ({ upcomingEvents, pastEvents }) => {
  return (
    <MainLayout title="Eventos">
      {/* upcoming events */}
      <div className="content flex flex-col justify-center items-center w-full my-0">
        <div className="wrapper max-w-7xl ">
          <div className="bg-white">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:py-18 sm:px-6 lg:px-8 ">
              <div className="text-center">
                <p className="mt-1 text-4xl font-extrabold text-happy-yellow sm:text-5xl sm:tracking-tight lg:text-6xl">
                  Upcoming events here...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EventsPage;
