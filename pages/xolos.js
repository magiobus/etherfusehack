import { useEffect } from "react";

const XolosPage = () => {
  return null;
};

export async function getStaticProps({ params }) {
  return {
    redirect: {
      destination: "/events/6513725b78e08b60a078f1fc",
      permanent: false,
    },
  };
}

export default XolosPage;
