import MainLayout from "@/components/layouts/MainLayout";
import Link from "next/link";

const BigChar = ({children}) => {
  return (
    <span className="text-happy-yellow text-6xl font-bold">{children}</span>
  );
}

const Stairs = ({children}) => {
  return (
    <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 text-left grid grid-cols-4 grid-rows-4 grid-flow-col"> 
      {children.map((c, idx) => {
        return (
          <div className="text-center" style={{
            gridRowStart: `${idx + 1}`,
            gridColumnStart: `${idx + 1}`,
          }} key={`step_${idx}`}>
            {c}
          </div>
        );
      })} 
    </h1>
  );
}

export default function MainPage() {
  return (
    <MainLayout fixed={true}>
      <div className="relative bg-gray-50 h-full ">
        <main className="lg:relative">
          <div className="mx-auto max-w-7xl w-full- pt-16 pb-20 text-center lg:py-48 lg:text-left">
            <div className="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                <Stairs>
                  <span className="">
                    <BigChar>S</BigChar>uper
                  </span>
                  <span className="">
                    <BigChar>H</BigChar>appy
                  </span>
                  <span className="">
                    <BigChar>D</BigChar>ev
                  </span>
                  <span className="">
                    <BigChar>H</BigChar>ouse
                  </span>
                </Stairs>
                <span className="block  xl:inline text-happy-yellow-600">
                  🇲🇽
                </span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
                SHDH es un evento informal para desarrolladores, creativos y
                curiosos de la tecnología 🤓. Ven a divertirte, construir tu
                idea o aprender algo nuevo.
              </p>
              <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow w-1/2 mx-auto">
                  <Link href="/events">
                    <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-happy-yellow-600 hover:bg-happy-yellow-700 md:py-4 md:text-lg md:px-10">
                      Ver Eventos
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="relative w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
            <img
              className="absolute inset-0 w-full h-full object-cover"
              src="/images/shdhmx.jpg"
              alt="shdhmx"
            />
          </div>
        </main>
      </div>
    </MainLayout>
  );
}
