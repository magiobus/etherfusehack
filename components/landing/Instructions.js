/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

const Instructions = () => {
  return (
    <div className="container w-full mt-12">
      <img
        src="/landingimages/instructions.jpeg"
        alt="Instructions etherfuse hackathon"
        className="w-full hidden sm:block"
      />
      <img
        src="/landingimages/instructionsmobile.jpeg"
        alt="Instructions etherfuse hackathon"
        className="w-full sm:hidden"
      />
    </div>
  );
};

export default Instructions;
