/* eslint-disable react/jsx-no-target-blank */
import MainLayout from "@/components/layouts/MainLayout";
const Remittances = () => {
  return (
    <MainLayout title="Tracks">
      <div className="w-full flex justify-center items-center my-4 mx-2">
        <div className="max-w-7xl w-full md:px-8 lg:px-0 lg:mt-8">
          <div className="content flex justify-start  items-center w-full">
            <div className="max-w-7xl w-full mx-auto justify-start  items-center  px-4 sm:py-18 sm:px-6 lg:px-8 xl:px-0  ">
              <h1 className="text-center text-2xl font-bold uppercase">
                Remittances Track: $2000 USDC Prize 🏆
              </h1>
              <div className="content my-4">
                <p className="text-center text-base font-semibold">
                  How do we improve sending money abroad with blockchain?
                </p>
                <div className="quote">
                  <div className="w-full flex flex-col items-center justify-center my-4">
                    <p className="italic w-full text-center max-w-lg">
                      Mexico had $58 billion of USD remittances sent this year.
                      The second highest after India, and overtaking China. Last
                      year, 6% of all remittances were done with USDC on Bitso,
                      and is expected to increase massively this year. There is
                      a huge opportunity to leverage blockchain technology to
                      remove middlemen, reduce fees, and transform remittances
                      for Mexico and the world. We think that non-custodial
                      solutions can allow people not to need banks to send money
                      home, but also be faster, cheaper and easier. This is just
                      the beginning of a revolution in remittances which we are
                      seeing unfold now. You have an opportunity to be a part of
                      it.
                    </p>
                    <p className="my-4 font-semibold">
                      We are open to all ideas and solutions, but we have come
                      up with some ideas to help get you started.
                    </p>
                  </div>
                </div>
              </div>

              <p className="ideaswelove text-center font-bold">
                Ideas we would love ❤️ to see:
              </p>

              <div className="w-full  flex flex-col justify-center items-center my-8">
                <div className="max-w-2xl w-full">
                  <ul className="list-disc">
                    <p className="font-semibold">Removing the middleman</p>
                    <li className="text-left text-base">
                      Peer to Peer currency matching (something like Paxful, or
                      LocalBitcoins, or Binance)
                    </li>
                    <li className="text-left text-base">
                      Peer to Peer, but with escrows that are on-chain and using
                      USDC
                    </li>
                    <li className="text-left text-base">
                      Social Media bots for Peer to Peer exchange prices.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-full flex flex-col justify-center items-center my-8">
                <div className="max-w-2xl w-full">
                  <ul className="list-disc ">
                    <p className="font-semibold">Accessibility</p>
                    <li className="text-left text-base">
                      Using our current Decaf/MoneyGram integration to send
                      money to people without a smartphone (using just a
                      reference code in a text message - ask us for more
                      details).
                    </li>
                    <li className="text-left text-base">
                      Off-ramps (digital assets {">"} Mexican pesos). Send money
                      to bank accounts, get cash, or coupons.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="howtoapply my-4">
                <p className="ideaswelove text-center font-bold">
                  If you want to apply to this track, register to{" "}
                  <a
                    href="https://hackathon.etherfuse.com"
                    className="underline"
                    target="_blank"
                  >
                    hackathon.etherfuse.com
                  </a>
                </p>
                <p className="ideaswelove text-center">
                  When you submit your project, select the tracks you want to
                  apply to.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Remittances;
