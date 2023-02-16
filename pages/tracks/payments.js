/* eslint-disable react/jsx-no-target-blank */
import MainLayout from "@/components/layouts/MainLayout";
const PaymentsTrack = () => {
  return (
    <MainLayout title="Tracks">
      <div className="w-full flex justify-center items-center my-4 mx-2">
        <div className="max-w-7xl w-full md:px-8 lg:px-0 lg:mt-8">
          <div className="content flex justify-start  items-center w-full">
            <div className="max-w-7xl w-full mx-auto justify-start  items-center  px-4 sm:py-18 sm:px-6 lg:px-8 xl:px-0  ">
              <h1 className="text-center text-2xl font-bold uppercase">
                Payments Track: $2000 USDC Prize 🏆
              </h1>
              <div className="content my-4">
                <p className="text-center text-base font-semibold">
                  How do we make payments better leveraging blockchain?
                </p>
                <div className="quote">
                  <p className="text-center text-base">
                    From{" "}
                    <a
                      className="underline"
                      target="_blank"
                      href="https://www.linkedin.com/pulse/fintech-food-future-payments-simon-taylor-/?trackingId=rtsz%2Bb2tSLaVLo0SpESpCg%3D%3D"
                    >
                      Simon Taylor
                    </a>
                  </p>
                  <div className="w-full flex flex-col items-center justify-center my-4">
                    <p className="italic w-full text-center max-w-lg">
                      The future of payments is multi-rail Payments are the core
                      primitive of the economy. Everything around you was paid
                      for, bought, or sold with a payment. Every financial
                      service or complex contract usually starts or ends with a
                      payment. And payments are a big deal. EY Estimates the
                      global payments market to be worth $240trn (yes,
                      trillion), of which payment Fintech companies represent a
                      $2.17trn market cap. Payments disruption is less than 1%
                      done. And the landscape is about to get flipped upside
                      down.
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
                    <p className="font-semibold">Consumer</p>
                    <li className="text-left text-base">
                      Easy sending of money peer to peer. Instead of using seed
                      phrases - having profiles linked to IDs.
                    </li>
                    <li className="text-left text-base">
                      Splitting bills with friends.
                    </li>
                    <li className="text-left text-base">
                      Cool ways to send bills or money on money on Whatsapp,
                      telegram, etc.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-full flex flex-col justify-center items-center my-8">
                <div className="max-w-2xl w-full">
                  <ul className="list-disc ">
                    <p className="font-semibold">Merchants</p>
                    <li className="text-left text-base">
                      Solana Pay integrated into local providers like Baz,
                      NuBank, Mercado Pay, etc
                    </li>
                    <li className="text-left text-base">
                      Token rewards for payments.
                    </li>
                    <li className="text-left text-base">
                      Web3 rewards programs.
                    </li>
                    <li className="text-left text-base">
                      Invoice sending with Solana Pay.
                    </li>
                    <li className="text-left text-base">
                      Online payments for Solana Pay leveraging mobile.
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

export default PaymentsTrack;
