import dateNowUnix from "./dateNowUnix";

const isExpired = (event) => {
  const now = dateNowUnix();
  console.log("now", now);
  const eventUnix = event.startTime;
  console.log("eventUnix", eventUnix);
  if (now > eventUnix) {
    return true;
  } else {
    return false;
  }
};

export { isExpired };
