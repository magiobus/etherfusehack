import { useRouter } from "next/router";
import { useEffect } from "react";

const Xolos = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/events/6513725b78e08b60a078f1fc");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default Xolos;
