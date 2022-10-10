import dateNowUnix from "./dateNowUnix";

const isExpired = (expiresAt) => {
  const now = dateNowUnix();
  if (now > expiresAt) {
    return true;
  } else {
    return false;
  }
};

export { isExpired };
