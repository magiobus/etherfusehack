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
                  Próximos eventos
                </p>
                <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
                  Acude a un evento cerca de ti. <br />
                  <span className="text-base">
                    No olvides revisar la seccion de{" "}
                    <Link href="/faqs">
                      <a className="underline text-happy-yellow-600">
                        Preguntas Frecuentes
                      </a>
                    </Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <EventsList data={upcomingEvents} />
      </div>

      {/* past events */}
      <div className="content mt-8 flex flex-col justify-center items-center w-full my-0">
        <div className="wrapper max-w-7xl w-full">
          <div className="bg-white">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:py-18 sm:px-6 lg:px-8 ">
              <div className="text-center lg:text-left">
                <p className="mt-1 font-extrabold text-happy-yellow  sm:tracking-tight text-xl">
                  Eventos Anteriores
                </p>
              </div>
            </div>
          </div>
        </div>
        <EventsList data={pastEvents} />
      </div>
    </MainLayout>
  );
};

export default EventsPage;
