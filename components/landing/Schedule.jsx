import { useEffect, useState } from "react";
import Image from "next/future/image";
import { Tab } from "@headlessui/react";
import clsx from "clsx";

import { Container } from "@/components/landing/Container";

const schedule = [
  {
    date: "Octubre 5",
    dateTime: "2023-06-02",
    summary: "Primer día de hackathon",
    timeSlots: [
      {
        name: "Inaguración del evento 💂‍♀️",
        description: "",
        start: "5:00PM",
        end: "5:30PM",
      },
      {
        name: "Keynote Bienvenida 👋",
        description: "Conoce a los sponsors del evento",
        start: "5:30PM",
        end: "6:00PM",
      },
      {
        name: "Registra de equipos 🤝",
        description: "Forma tu equipo para trabajar",
        start: "6:30PM",
        end: " 7:00PM",
      },
      {
        name: "Hacking 🚀",
        description: "Comienza a trabajar en tu proyecto",
        start: "7:00PM",
        end: "11:00PM",
      },
    ],
  },
  {
    date: "Octubre 6",
    dateTime: "2023-06-03",
    summary: "Segundo día de hackathon",
    timeSlots: [
      {
        name: "Office Hours 🤓",
        description: "",
        start: "11:00AM",
        end: "1:00PM",
      },
      {
        name: "Hacking 🚀",
        description: "Comienza a trabajar en tu proyecto",
        start: "1:00PM",
        end: "8:00PM",
      },
      {
        name: "Prepara tu pitch 🤓",
        description: "Ve a discord y aprende de los mejores",
        start: "8:00PM",
        end: "11:00PM",
      },
    ],
  },
  {
    date: "Octubre 7",
    dateTime: "2023-06-04",
    summary: "Tercer día de hackathon",
    timeSlots: [
      {
        name: "Hacking 🚀",
        description: "Continúa trabajando en tu proyecto",
        start: "11:00AM",
        end: "1:00PM",
      },
      {
        name: "Entrega de proyectos 📦",
        description: "Envía tu proyecto para ser evaluado",
        start: "1:00PM",
        end: "2:00PM",
      },

      {
        name: "Ceremonia de premiación 🏆",
        description:
          "La ceremonia de premiación se llevará a cabo el día 20 de octubre 2023",
        start: "---",
        end: "---",
      },
    ],
  },
];

function ScheduleTabbed() {
  let [tabOrientation, setTabOrientation] = useState("horizontal");

  useEffect(() => {
    let smMediaQuery = window.matchMedia("(min-width: 640px)");

    function onMediaQueryChange({ matches }) {
      setTabOrientation(matches ? "vertical" : "horizontal");
    }

    onMediaQueryChange(smMediaQuery);
    smMediaQuery.addEventListener("change", onMediaQueryChange);

    return () => {
      smMediaQuery.removeEventListener("change", onMediaQueryChange);
    };
  }, []);

  return (
    <Tab.Group
      as="div"
      className="mx-auto grid max-w-2xl grid-cols-1 gap-y-6 sm:grid-cols-2 lg:hidden"
      vertical={tabOrientation === "vertical"}
    >
      <Tab.List className="-mx-4 flex gap-x-4 gap-y-10 overflow-x-auto pl-4 pb-4 sm:mx-0 sm:flex-col sm:pb-0 sm:pl-0 sm:pr-8">
        {({ selectedIndex }) =>
          schedule.map((day, dayIndex) => (
            <div
              key={day.dateTime}
              className={clsx(
                "relative w-3/4 flex-none pr-4 sm:w-auto sm:pr-0",
                dayIndex !== selectedIndex && "opacity-70"
              )}
            >
              <DaySummary
                day={{
                  ...day,
                  date: (
                    <Tab className="[&:not(:focus-visible)]:focus:outline-none ">
                      <span className="absolute inset-0 " />
                      {day.date}
                    </Tab>
                  ),
                }}
              />
            </div>
          ))
        }
      </Tab.List>
      <Tab.Panels>
        {schedule.map((day) => (
          <Tab.Panel
            key={day.dateTime}
            className="[&:not(:focus-visible)]:focus:outline-none"
          >
            <TimeSlots day={day} />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}

function DaySummary({ day }) {
  return (
    <>
      <h3 className="text-2xl font-semibold tracking-tight text-happy-yellow bg-happy-middark px-2">
        <time dateTime={day.dateTime}>{day.date}</time>
      </h3>
      <p className="mt-1.5 text-base tracking-tight text-black">
        {day.summary}
      </p>
    </>
  );
}

function TimeSlots({ day, className }) {
  return (
    <ol
      role="list"
      className={clsx(
        className,
        "space-y-8 bg-white/60 py-14 px-10 text-center shadow-xl shadow-blue-900/5 backdrop-blur"
      )}
    >
      {day.timeSlots.map((timeSlot, timeSlotIndex) => (
        <li
          key={timeSlot.start}
          aria-label={`${timeSlot.name} talking about ${timeSlot.description} at ${timeSlot.start} - ${timeSlot.end} CST`}
        >
          {timeSlotIndex > 0 && (
            <div className="mx-auto mb-8 h-px w-48 bg-indigo-500/10" />
          )}
          <h4 className="text-lg font-semibold tracking-tight text-black">
            {timeSlot.name}
          </h4>
          {timeSlot.description && (
            <p className="mt-1 tracking-tight text-black">
              {timeSlot.description}
            </p>
          )}
          <p className="mt-1 font-mono text-sm text-slate-500">
            <time dateTime={`${day.dateTime}T${timeSlot.start}-08:00`}>
              {timeSlot.start}
            </time>{" "}
            -{" "}
            <time dateTime={`${day.dateTime}T${timeSlot.end}-08:00`}>
              {timeSlot.end}
            </time>{" "}
            CST
          </p>
        </li>
      ))}
    </ol>
  );
}

function ScheduleStatic() {
  return (
    <div className="hidden lg:grid lg:grid-cols-3 lg:gap-x-8">
      {schedule.map((day) => (
        <section key={day.dateTime}>
          <DaySummary day={day} />
          <TimeSlots day={day} className="mt-10" />
        </section>
      ))}
    </div>
  );
}

export function Schedule() {
  return (
    <section id="schedule" aria-label="Schedule" className=" sm:py-20 lg:py-0">
      <Container className="relative z-10">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-4xl lg:pr-24">
          <h2 className="font-display text-4xl font-medium tracking-tighter text-happy-yellow bg-happy-middark px-2 py-2 sm:text-5xl">
            3 días de hackathon para crear soluciones digitales con Solana
            blockchain.
          </h2>
        </div>
      </Container>
      <div className="relative mt-14 sm:mt-24">
        <div className="absolute inset-x-0 -top-40 -bottom-32 overflow-hidden bg-indigo-50">
          <Image
            className="absolute left-full top-0 -translate-x-1/2 sm:left-1/2 sm:translate-y-[-15%] sm:translate-x-[-20%] md:translate-x-0 lg:translate-x-[5%] lg:translate-y-[4%] xl:translate-y-[-8%] xl:translate-x-[27%]"
            src="/landingimages/background.jpg"
            alt=""
            width={918}
            height={1495}
            unoptimized
          />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white" />
        </div>
        <Container className="relative">
          <ScheduleTabbed />
          <ScheduleStatic />
        </Container>
      </div>
    </section>
  );
}
