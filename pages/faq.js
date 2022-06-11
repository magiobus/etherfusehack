/* This example requires Tailwind CSS v2.0+ */
const faqs = [
  {
    id: 1,
    question: "¿Qué es Super Happy Dev House?",
    answer:
      "Es un evento libre, dirigido a personas creativas que les interese el desarrollo de software y la tecnología en general.",
  },
  // More questions...
  {
    id: 2,
    question: "¿Qué hacemos en un Super Happy Dev House?",
    answer:
      "Nos reunimos a compartir conocimientos e inquietudes, también desarrollamos y colaboramos.",
  },
  {
    id: 3,
    question: "¿Qué necesito llevar?",
    answer:
      "Lleva tu equipo, computadora, tablet o lo que sea que utilices para trabajar, multicontacto para electricidad y lleva algo de beber para ti y para compartir porque somos bonitas personas :) .",
  },
  {
    id: 4,
    question: "¿Necesito saber programar?",
    answer:
      "¡Para nada! si estás interesado en aprender, es el lugar perfecto para venir a colaborar y tener tu primer contacto con la programación y tecnología.",
  },
  {
    id: 5,
    question: "¿Es un concurso?",
    answer:
      "La respuesta es NO. Aquí nadie pierde y nadie gana, lo que buscamos es colaborar, aprender, crear comunidad, conocer gente chévere y hacer amigos. 🤓",
  },
];

export default function Example() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">
          Preguntas frecuentes
        </h2>
        <div className="mt-12">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-3">
            {faqs.map((faq) => (
              <div key={faq.id}>
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  {faq.question}
                </dt>
                <dd className="mt-2 text-base text-gray-500">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
