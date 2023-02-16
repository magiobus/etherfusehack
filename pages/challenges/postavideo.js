/* eslint-disable react/jsx-no-target-blank */
import MainLayout from "@/components/layouts/MainLayout";
const Postavideo = () => {
  return (
    <MainLayout title="Tracks">
      <div className="w-full flex justify-center items-center my-4 mx-2">
        <div className="max-w-7xl w-full md:px-8 lg:px-0 lg:mt-8">
          <div className="content flex justify-start  items-center w-full">
            <div className="max-w-7xl w-full mx-auto justify-start  items-center  px-4 sm:py-18 sm:px-6 lg:px-8 xl:px-0  ">
              <h1 className="text-center text-2xl font-bold uppercase">
                Challenge: Post A Video - $250 USDC Prize
              </h1>
              <div className="content my-4">
                <p className="text-center text-base font-semibold">
                  The best video posted on social media with #DecafWallet
                </p>
              </div>

              <div className="w-full  flex flex-col justify-center items-center my-8">
                <div className="max-w-2xl w-full">
                  <ul className="list-disc">
                    <p className="font-semibold"></p>
                    <li className="text-left text-base">
                      For the video we want to see users withdrawing pesos at
                      any MoneyGram location (using the Decaf Wallet).
                    </li>
                    <li className="text-left text-base">
                      Users sending USDC via DecafLink in Whatsapp.
                    </li>
                  </ul>
                </div>
              </div>

              <p className="ideaswelove text-center font-bold">
                Ask the Decaf Team if you want us to airdrop you some USDC to
                test.
              </p>

              <p className="ideaswelove text-center font-bold">
                Bonus: If you send USDC to a family or friend and they post a
                video with #DecafWallet, we will send them another $10 USDC.
              </p>

              <p className="text-center my-4">
                Here is an example:
                <a
                  className="underline"
                  href="https://twitter.com/yosoybartsolo/status/1624783866207645696?s=20"
                  target="_blank"
                >
                  https://twitter.com/yosoybartsolo/status/1624783866207645696?s=20
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Postavideo;
