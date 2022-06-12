import MainLayout from "@/components/layouts/MainLayout";
import eventsData from "@/data/fakeevents.json";

const EventDetailPage = ({ event }) => {
  console.log("event detail page", event);
  return (
    <MainLayout>
      <p>Event detail page</p>
    </MainLayout>
  );
};

export default EventDetailPage;

export async function getStaticProps({ params }) {
  //TODO: get event data from database
  const event = eventsData.find((event) => event.id === params.id);
  if (event) {
    return {
      props: {
        event: event,
      },
      revalidate: 5,
    };
  } else {
    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  const data = JSON.parse(JSON.stringify(eventsData));
  const paths = data.map((event) => ({
    params: {
      id: event.id,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
}
