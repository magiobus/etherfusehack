import classNames from "@/utils/classNames";

const EventTypeTag = ({ eventType }) => {
  if (!eventType) {
    return null;
  }

  let label = "";
  switch (eventType) {
    case "openmic":
      label = "Open Mic";
      break;
    case "standupcomedy":
      label = "Standup Comedy";
      break;
    case "tournament":
      label = "Torneo";
      break;
    default:
      label = eventType;
  }

  return (
    <p
      className={classNames(
        eventType && "bg-happy-pink",
        "text-white bg-green-400 px-2 rounded-md gont-bold text-sm mt-2"
      )}
    >
      {label}
    </p>
  );
};

export default EventTypeTag;
