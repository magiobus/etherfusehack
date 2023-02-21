/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-target-blank */
import MainLayout from "@/components/layouts/MainLayout";
const Remittances = () => {
  return (
    <MainLayout title="Tracks">
      <div className="w-full flex justify-center items-center my-4 mx-2">
        <div className="max-w-7xl w-full md:px-8 lg:px-0 lg:mt-8">
          <div className="content flex justify-start  items-center w-full">
            <div className="max-w-7xl w-full mx-auto justify-start  items-center  px-4 sm:py-18 sm:px-6 lg:px-8 xl:px-0  ">
              <img
                src="/landingimages/logos/decaf.png"
                className="w-6/12 lg:w-2/12 mx-auto mb-8"
                alt="Hello Moon IO"
              />
              <h1 className="text-center text-2xl font-bold uppercase">
                Remittances Track: $2000 USDC Prize 🏆
              </h1>
              <div className="content my-4">
                <p className="text-center text-base font-semibold">
                  ¿Cómo podemos mejorar el envío de dinero al extranjero con
                  tecnología blockchain?
                </p>
                <div className="quote">
                  <div className="w-full flex flex-col items-center justify-center my-4">
                    <p className="italic w-full text-center max-w-lg">
                      México tuvo $58 mil millones de dólares de remesas
                      enviadas este año. El segundo más alto después de India, y
                      superando a China. El año pasado, el 6% de todas las
                      remesas se hicieron con USDC en Bitso, y se espera que
                      aumente enormemente este año. Hay una gran oportunidad de
                      aprovechar la tecnología blockchain para eliminar
                      intermediarios, reducir tarifas y transformar las remesas
                      para México y el mundo. Creemos que las soluciones no
                      custodiales pueden permitir a las personas no necesitar
                      bancos para enviar dinero a casa, pero también ser más
                      rápidas, más baratas y más fáciles. Este es solo el
                      comienzo de una revolución en las remesas que estamos
                      viendo desplegarse ahora. Tienes la oportunidad de ser
                      parte de ella
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
                    <p className="font-semibold">
                      Eliminación de intermediarios
                    </p>
                    <li className="text-left text-base">
                      Ideas/soluciones creativas para puntos de intercambio de
                      pesos a USDC, por ejemplo, convertir tiendas regulares en
                      intercambios de efectivo {"<>"} cripto.
                    </li>
                    <li className="text-left text-base">
                      Coincidencia de divisas de persona a persona (algo así
                      como Paxful, o LocalBitcoins, o Binance Peer to Peer, pero
                      con garantías que están en cadena y que usan USDC).
                    </li>
                    <li className="text-left text-base">
                      Bots de redes sociales para precios de intercambio de
                      persona a persona.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-full flex flex-col justify-center items-center my-8">
                <div className="max-w-2xl w-full">
                  <ul className="list-disc ">
                    <p className="font-semibold">Accesibilidad</p>
                    <li className="text-left text-base">
                      Utilizando nuestra integración actual de Decaf/MoneyGram
                      para enviar dinero a personas sin un teléfono inteligente
                      (usando solo un código de referencia en un mensaje
                    </li>
                    <li className="text-left text-base">
                      Mas “Off ramps”. Opciones para USDC a pesos.
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

export default Remittances;
