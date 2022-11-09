import dateNowUnix from "./dateNowUnix";

const isExpired = (event) => {
  const now = dateNowUnix();
  const eventUnix = event.startTime;
  if (now > eventUnix) {
    return true;
  } else {
    return false;
  }
};

export { isExpired };
