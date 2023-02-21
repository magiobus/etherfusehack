/* eslint-disable @next/next/no-html-link-for-pages */
import MainLayout from "@/components/layouts/MainLayout";
import faqs from "@/data/faqs.json";
const FaqsPage = () => {
  return (
    <MainLayout fixed={true} title="Preguntas Frecuentes">
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-3xl font-extrabold text-happy-yellow bg-black  sm:tracking-tight lg:text-4xl py-2">
              Preguntas Frecuentes
            </p>
          </div>
          <div className="mt-24">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-3">
              {faqs.map((faq) => (
                <div key={faq.id}>
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    {faq.question}
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">{faq.answer}</dd>
                </div>
              ))}

              <div>
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  ¿Debería de tener conocimientos previos?
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  Lo ideal es entender cómo funciona todo el tema de blockchain,
                  pero ve el fin de semana de hackathon cómo una oportunidad
                  para aprender nuevas cosas. Si no sabes nada de blockchain y
                  solana, te preparamos una serie de recursos para que puedas
                  iniciar en este mundo. Puedes consultarlos dando click{" "}
                  <a href="/resources" className="underline">
                    aquí
                  </a>
                </dd>
              </div>

              <div>
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  ¿Cómo se evaluará el proyecto?
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  <p> Hay varios aspectos a considerar en tu proyecto:</p>
                  <ul className="list-disc pl-5 mt-4 space-y-2">
                    <li>
                      <span className="font-semibold">
                        Utilización de la red de Solana
                      </span>
                      : Se evaluará si el proyecto está construido sobre la red
                      de Solana, no importa si es una testnet.
                    </li>
                    <li>
                      <span className="font-semibold">
                        Información del proyecto
                      </span>
                      : Nos interesa mucho que la idea y solución de tu proyecto
                      pueda ser entendida muy fácilmente.
                    </li>
                    <li>
                      <span className="font-semibold">
                        MVP (Producto Minimo Viable)
                      </span>
                      : No importa que el proyecto no esté terminado
                      completamente, sabemos que son 3 dias. Pero nos encantaría
                      ver proyectos funcionales, que pudieran ser lanzados y
                      usados desde el día 1. El MVP tiene que ser funcional y
                      poder probarse online, no queremos entrar a ver enlaces
                      con botones que no funcionan, presentaciones de power
                      point, ni proyectos que no tienen nada que ver con la
                      temática del hackathon. 💔
                    </li>
                    <li>
                      <span className="font-semibold">Video Demo</span>: Todos
                      los equipos tendrán que entregar un video dando un pequeño
                      tour de su proyecto, explicando su idea y mostrando su MVP
                      funcional. El video debe ser de máximo 3 minutos, subirse
                      a youtube y pegar la liga en el formulario de registro de
                      proyecto.
                    </li>
                  </ul>
                </dd>
              </div>

              <div>
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  Tengo más dudas 😔
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  Ponte en contacto con nosotros vía email a{" "}
                  <a
                    className="text-happy-yellow bg-black"
                    href="mailto:hello@etherfuse.com"
                  >
                    hello@etherfuse.com
                  </a>{" "}
                  o pregunta en nuestro canal de discord , el enlace lo recibes
                  vía email al registrarte en el hackathon.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FaqsPage;
