/* eslint-disable @next/next/no-img-element */

const Instructions = () => {
  return (
    <div className="container w-full mt-12">
      <img
        src="/landingimages/instructions.png"
        alt="Instructions etherfuse hackathon"
        className="w-full hidden sm:block"
      />
      <img
        src="/landingimages/instructionsmobile.png"
        alt="Instructions etherfuse hackathon"
        className="w-full sm:hidden"
      />
    </div>
  );
};

export default Instructions;
