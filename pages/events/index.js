import MainLayout from "@/components/layouts/MainLayout";

const EventsPage = () => {
  return (
    <MainLayout title="Eventos">
      <div className="content flex justify-center items-center w-full my-16">
        <div className="wrapper max-w-7xl">
          <h1 className="text-2xl text-center font-bold">
            Events 🦑 <br /> Page{" "}
          </h1>
        </div>
      </div>
    </MainLayout>
  );
};

export default EventsPage;
