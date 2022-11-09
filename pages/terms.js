import MainLayout from "@/components/layouts/MainLayout";

export default function TermsPage() {
  return (
    <MainLayout title="Terminos y Condiciones">
      <div className="relative py-16 bg-white overflow-hidden">
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="text-lg max-w-prose mx-auto">
            <div className="text-center">
              <p className="text-3xl font-extrabold text-happy-yellow bg-black  sm:tracking-tight lg:text-4xl py-2">
                Terminos y Condiciones
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
              Los equipos participantes deberán disponer de su propio software y
              hardware, como laptops, tabletas, hosting y otros elementos. Las
              herramientas tecnológicas frameworks, lenguajes de programación, y
              otros, así como los formatos de deployment o demostración serán
              elegidos por los equipos participantes.
            </p>
            <p className="mt-8 text-xl text-black leading-8">
              Los datos proporcionados por los participantes deben ser
              correctos, veraces y completos, asumiendo toda responsabilidad
              sobre la falta de veracidad o exactitud de los mismos.
            </p>
            <p className="mt-8 text-xl text-black leading-8">
              El participante autoriza a la organización del evento a utilizar
              sus datos personales para fines de comunicación y publicidad. Asi
              como para la difusión de los resultados del evento y envío de
              información a través de medios electrónicos como correo
              electrónico y whatsapp.
            </p>
            <p className="mt-8 text-xl text-black leading-8">
              Los participantes autorizan que la información obtenida a partir
              de su participación en el hackathon se utilice en el material de
              difusión relacionado con el presente Concurso, incluido internet,
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
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
