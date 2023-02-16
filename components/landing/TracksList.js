import { CreditCardIcon, CashIcon } from "@heroicons/react/outline";

const actions = [
  {
    title: "Payments 💸",
    href: "/tracks/payments",
    icon: CreditCardIcon,
    iconForeground: "text-black",
    iconBackground: "bg-happy-yellow",
    description:
      "¿Cómo podemos mejorar la experiencia de pagos usando blockchain?",
    subdescription: "Aplica y gana $2000 USDC",
  },
  {
    title: "Remittances 💸",
    href: "/tracks/remittances",
    icon: CashIcon,
    iconForeground: "text-black",
    iconBackground: "bg-happy-yellow",
    description:
      "¿Cómo podemos mejorar la experiencia de remesas usando blockchain?",
    subdescription: "Aplica y gana $2000 USDC",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const TracksList = () => {
  return (
    <div className="wrapper my-12">
      <div className="title mb-2">
        <h2 className="text-2xl font-bold ">Hackathon Tracks 🏆</h2>
        <p className="italic">
          Tu proyecto también puede participar a uno de los siguientes tracks:
        </p>
      </div>
      <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
        {actions.map((action, actionIdx) => (
          <div
            key={action.title}
            className={classNames(
              actionIdx === 0
                ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none"
                : "",
              actionIdx === 1 ? "sm:rounded-tr-lg" : "",
              actionIdx === actions.length - 2 ? "sm:rounded-bl-lg" : "",
              actionIdx === actions.length - 1
                ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
                : "",
              "relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
            )}
          >
            <div>
              <span
                className={classNames(
                  action.iconBackground,
                  action.iconForeground,
                  "rounded-lg inline-flex p-3 ring-4 ring-white"
                )}
              >
                <action.icon className="h-6 w-6" aria-hidden="true" />
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium">
                <a href={action.href} className="focus:outline-none">
                  {/* Extend touch target to entire panel */}
                  <span className="absolute inset-0" aria-hidden="true" />
                  {action.title}
                </a>
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                <span className="font-bold"> {action.subdescription}</span>{" "}
                <br />
                {action.description}
              </p>
            </div>
            <span
              className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
              aria-hidden="true"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
              </svg>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TracksList;
