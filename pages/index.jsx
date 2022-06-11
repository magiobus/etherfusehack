import MainLayout from "@/components/layouts/MainLayout";
import Link from "next/link";

const BigChar = ({children}) => {
  return (
    <span className="text-happy-yellow text-4xl sm:text-5xl font-bold">{children}</span>
  );
}

const Stairs = ({children}) => {
  return (
    <div className="text-3xl sm:text-4xl tracking-tight font-extrabold text-left grid grid-cols-4 grid-rows-4 grid-flow-col"> 
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
    </div>
  );
}

export default function MainPage() {
  return (
    <MainLayout fixed={true}>
      <div className="relative h-full">
        <div className="z-20 py-24 relative mx-auto w-full text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl md:w-1/2 mx-auto">
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
            <span className="block xl:inline">
              🇲🇽
            </span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-lg text-white sm:text-xl md:mt-5 md:max-w-3xl">
          <strong className="text-happy-yellow">SHDH</strong> es un evento informal para desarrolladores, creativos y
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
        <div className="z-10 top-0 absolute w-full h-full brightness-50">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src="/images/shdhmx.jpg"
            alt="shdhmx"
          />
        </div>
      </div>
    </MainLayout>
  );
}
