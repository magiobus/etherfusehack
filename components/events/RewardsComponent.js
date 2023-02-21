/* eslint-disable @next/next/no-img-element */
import TracksList from "@/components/landing/TracksList";

const RewardsComponent = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="max-w-7xl  w-full md:px-8 lg:px-0 lg:mt-8">
        <div className="content flex justify-start  items-center w-full">
          <div className="max-w-7xl w-full mx-auto  px-4 sm:py-18 sm:px-6 lg:px-8 xl:px-0  ">
            <div className="w-full">
              <TracksList />
              <div className="grid grid-cols-1 lg:grid-cols-2 space-y-4 lg:space-y-0">
                <div className="wrapper mx-2 " id="tracks">
                  <div className="title mb-2">
                    <h2 className="text-2xl font-bold ">
                      🇲🇽 SuperTeamMX Bounties 💰
                    </h2>
                    <p className="italic">
                      Participa en las recompensas que SuperTeamMX tiene para
                      ti:
                    </p>
                  </div>
                  <div className="imagecontainer">
                    <a
                      target="_blank"
                      href="https://mx.superteam.fun/win-an-open-bounty"
                      rel="noreferrer"
                    >
                      {" "}
                      <img
                        src="/landingimages/superteam.png"
                        alt="superteam etherfuse hackathon"
                        className=" object-cover hover:opacity-90"
                      />
                    </a>
                  </div>
                </div>
                <div className="wrapper mx-2" id="tracks">
                  <div className="title mb-2">
                    <h2 className="text-2xl font-bold ">
                      🇲🇽 Solana Challenges 🙌🏼
                    </h2>
                    <p className="italic">
                      Participa en los retos que Solana tiene para ti:
                    </p>
                  </div>
                  <div className="imagecontainer ">
                    <a
                      target="_blank"
                      href="https://dev-challenger.solanau.org/events/etherfuse-superteam-hackathon-mx/challenges"
                      rel="noreferrer"
                    >
                      {" "}
                      <img
                        src="/landingimages/challenges.jpg"
                        alt="superteam etherfuse hackathon"
                        className=" object-cover hover:opacity-90"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsComponent;
