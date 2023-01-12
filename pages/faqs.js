import MainLayout from "@/components/layouts/MainLayout";
import faqs from "@/data/faqs.json";
import Link from "next/link";
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
                  iniciar en este mundo. Sólo inscribete y nosotros te
                  mandaremos un correo con los recursos.
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
                  </a>
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
