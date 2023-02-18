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
                  ¿Cómo podemos mejorar los pagos aprovechando la tecnología
                  blockchain?
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
                      El futuro de los pagos es multi-rail Los pagos son el
                      primitivo fundamental de la economía. Todo lo que te rodea
                      fue pagado, comprado o vendido con un pago. Cada servicio
                      financiero o contrato complejo suele comenzar o terminar
                      con un pago. Y los pagos son muy importantes. EY estima
                      que el mercado global de pagos vale $240 billones (sí,
                      billones), de los cuales las empresas Fintech de pago
                      representan una capitalización de mercado de $2,17
                      billones. La interrupción de los pagos está en menos del
                      1% de progreso. Y el panorama está a punto de ser
                      totalmente cambiado.
                    </p>
                    <p className="my-4 font-semibold">
                      Estamos abiertos a todas las ideas y soluciones, pero
                      hemos elaborado algunas ideas para ayudarte a comenzar.
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
                    <p className="font-semibold">Consumidor</p>
                    <li className="text-left text-base">
                      Facilidad para enviar dinero de persona a persona. En
                      lugar de usar frases semilla, tener perfiles vinculados a
                      identificaciones.
                    </li>
                    <li className="text-left text-base">
                      Dividir las cuentas con amigos.
                    </li>
                    <li className="text-left text-base">
                      Formas creativas de enviar facturas o dinero por medio de
                      Whatsapp, telegrama, etc.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-full flex flex-col justify-center items-center my-8">
                <div className="max-w-2xl w-full">
                  <ul className="list-disc ">
                    <p className="font-semibold">Comerciantes</p>
                    <li className="text-left text-base">
                      Solana Pay integrado en proveedores locales como Baz,
                      NuBank, Mercado Pago, etc.
                    </li>
                    <li className="text-left text-base">
                      Recompensas con token por los pagos.
                    </li>
                    <li className="text-left text-base">
                      Programas de recompensas Web3.
                    </li>
                    <li className="text-left text-base">
                      Envío de facturas con Solana Pay.
                    </li>
                    <li className="text-left text-base">
                      Pagos en línea para Solana Pay aprovechando el móvil.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="howtoapply my-4">
                <p className="ideaswelove text-center font-bold">
                  Si quieres aplicar a este track, regístrate en{" "}
                  <a
                    href="https://hackathon.etherfuse.com"
                    className="underline"
                    target="_blank"
                  >
                    hackathon.etherfuse.com
                  </a>
                </p>
                <p className="ideaswelove text-center">
                  Cuando envíes tu proyecto, selecciona los tracks a los que te
                  gustaría aplicar.
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
