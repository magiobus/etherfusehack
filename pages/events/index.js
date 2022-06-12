import MainLayout from "@/components/layouts/MainLayout";
import Link from "next/link";
import EventsList from "@/components/events/EventsList";
import eventsList from "@/data/fakeevents.json";

const EventsPage = () => {
  return (
    <MainLayout title="Eventos">
      <div className="content flex flex-col justify-center items-center w-full my-0">
        <div className="wrapper max-w-7xl">
          <div className="bg-white">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:py-18 sm:px-6 lg:px-8">
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
        <EventsList data={eventsList} />
      </div>
    </MainLayout>
  );
};

export default EventsPage;
