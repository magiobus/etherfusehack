import MainLayout from "@/components/layouts/MainLayout";

export default function TermsPage() {
  return (
    <MainLayout title="Términos y Condiciones">
      <div className="relative py-16 bg-white overflow-hidden">
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="text-lg max-w-prose mx-auto">
            <div className="text-center">
              <p className="text-3xl font-extrabold text-happy-yellow bg-black  sm:tracking-tight lg:text-4xl py-2">
                Términos y Condiciones
              </p>
            </div>
            <br></br>
          </div>
          <div className="mt-6 prose prose-indigo prose-lg text-black mx-auto max-w-7xl w-full">
            <p className="mt-8 text-xl text-black leading-8">
              Al registrarte en una de las sedes del evento, aceptas los
              siguientes términos y condiciones:
            </p>

            <p className="mt-8 text-xl text-black leading-8">
              Al registrarse en el sitio web para el evento Etherfuse Hackathon,
              el participante confirma que tiene al menos 18 años de edad y
              cumple con la edad mínima para acceder a servicios en línea en su
              país de residencia. Si el participante no cumple con la edad
              mínima, el padre/madre/tutor debe debe hacerse responsable de la
              actividad del menor durante toda la duración y estancia del
              evento.
            </p>
            <p className="mt-8 text-xl text-black leading-8">
              Los datos proporcionados por los participantes deben ser
              correctos, veraces y completos, asumiendo toda responsabilidad
              sobre la falta de veracidad o inexactitud de los mismos.
            </p>
            <p className="mt-8 text-xl text-black leading-8">
              El participante autoriza a la organización del evento a utilizar
              sus datos personales para fines de comunicación y publicidad. Así
              como para la difusión de los resultados del evento y envío de
              información a través de medios electrónicos como correo
              electrónico y whatsapp.
            </p>
            <p className="mt-8 text-xl text-black leading-8">
              Al registrarse en etherfuse hackathon la información de los
              participantes será compartida al equipo de superteamMX, así como a
              los patrocinadores del evento.
            </p>
            <p className="mt-8 text-xl text-black leading-8">
              En el caso de que el evento se lleve a cabo presencialmente en
              alguna institución, se recomienda que los participantes vengan
              preparados con su propio software y hardware, para garantizar la
              continuidad del proceso de desarrollo y presentación de sus
              proyectos durante el hackathon.
            </p>
            <p className="mt-8 text-xl text-black leading-8">
              Los participantes autorizan que la información obtenida a partir
              de su participación en el hackathon se utilice en el material de
              difusión relacionado con el presente concurso, incluido internet,
              sin recibir contraprestación alguna.
            </p>
            <p className="mt-8 text-xl text-black leading-8">
              Los participantes garantizan bajo su exclusiva responsabilidad que
              el contenido que presentan en sus soluciones son de su creación
              original y que no infringe derechos, ni derechos de propiedad
              intelectual de terceros, incluido sin límites, derechos de autor,
              marcas comerciales, patentes, secreto comercial, privacidad y
              publicidad, y que el contenido no es ilegal ni se ha enviado de
              una forma infrinja una obligación contractual que puedan tener con
              un tercero; o que viole cualquier ley o normativa vigente.
            </p>
            <p className="mt-8 text-xl text-black leading-8">
              Los participantes aseguran no haber comercializado ni estar en
              proceso de comercialización con anterioridad a los días del evento
              la solución presentada.
            </p>

            <p className="mt-8 text-xl text-black leading-8">
              La propiedad de la idea pertenece a los desarrolladores, pero el
              ganador dará su consentimiento para que el desarrollo sea
              utilizado y publicado por las instancias que propuso el reto.
            </p>

            <p className="mt-8 text-xl text-black leading-8">
              Las instancias que propuso el reto darán continuidad y seguimiento
              del proyecto con el equipo ganador o participantes posterior al
              cierre del mismo. En los casos que se considere pertinente se
              invitará a los desarrolladores para que expongan en reuniones con
              autoridades y empresas interesadas en la solución y en foros
              locales, nacionales e internacionales.
            </p>
            <p className="mt-8 text-xl text-black leading-8">
              La continuidad del proyecto depende exclusivamente de la
              disponibilidad del equipo ganador, así como de la instancia que
              propuso el reto.
            </p>
            <p className="mt-8 text-xl text-black leading-8">
              Los proyectos serán evaluados por un jurado compuesto por expertos
              en la industria y se basarán en criterios específicos descritos en
              el sitio web.
            </p>
            <p className="mt-8 text-xl text-black leading-8">
              Los premios serán otorgados a los proyectos ganadores y se
              describirán en detalle en el sitio web.
            </p>
            <p className="mt-8 text-xl text-black leading-8">
              Los participantes deben comportarse de manera ética y profesional
              durante todo el evento.
            </p>
            <p className="mt-8 text-xl text-black leading-8">
              Etherfuse Inc. se encarga de proporcionar de manera gratuita el
              proceso de registro, mentorías, alimentos y premios para los
              participantes del evento Etherfuse Hackathon. Por otro lado, en
              caso de que el evento se lleve presencialmente en alguna
              institución, la institución es responsable de proporcionar las
              instalaciones, acceso a internet, equipo de cómputo, servicios
              médicos en caso de emergencia, seguridad en el evento y todo lo
              relacionado a los asistentes.
            </p>
            <p className="mt-8 text-xl text-black leading-8">
              Nos reservamos el derecho de admisión. En especial denegando el
              acceso o expulsando a aquellos ASISTENTES que:
            </p>

            {/* //bullet points */}
            <ul className="list-disc list-inside">
              <li className="mt-4 text-xl text-black leading-8">
                No presenten su entrada cuando el organizador lo requiera, ya
                sea en formato digital o impreso.
              </li>
              <li className="mt-4 text-xl text-black leading-8">
                Hayan modificado, manipulado, falsificado la entrada o la
                presenten deteriorada o sea ilegible.
              </li>
              <li className="mt-4 text-xl text-black leading-8">
                Sea menor de 13 años, no entregue la autorización de su
                padre/madre/tutory y/o a parte de la autorización, no vaya
                acompañado por su madre/padre/tutor/responsable autorizado.
              </li>
              <li className="mt-4 text-xl text-black leading-8">
                Pueda racionalmente presumirse que va a implicar una situación
                de riesgo o peligro para el mismo u otros, por alboroto o por
                estados de intoxicación aparente o potencial,
                responsabilizándose personalmente el portador en todos los casos
                con sus propias acciones y omisiones que causen lesiones a
                terceros o daños a cosas.
              </li>
            </ul>
            <p className="mt-8 text-xl text-black leading-8">
              Etherfuse Inc. se exime de toda responsabilidad por cualquier
              reclamo o demanda relacionados con el evento, incluyendo, pero no
              limitado a, lesiones personales, daños a la propiedad y cualquier
              otro tipo de pérdida o daño. Asistir al evento es bajo su propio
              riesgo y responsabilidad, y al hacerlo, acepta liberar y eximir a
              Etherfuse Inc. de cualquier responsabilidad por cualquier reclamo
              o demanda que pueda surgir. Esta cláusula de limitación de
              responsabilidad es un elemento integral del acuerdo entre la
              organización y los asistentes al evento.
            </p>
            <p className="mt-8 text-xl text-black leading-8">
              La organización del hackathon se reserva el derecho a modificar
              los términos y condiciones en cualquier momento sin previo aviso.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
