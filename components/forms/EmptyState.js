import { PlusIcon } from "@heroicons/react/solid";
import Link from "next/link";
const EmptyState = ({ title, description, buttonText, buttonUrl, icon }) => {
  return (
    <div className="text-center">
      {icon && (
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-happy-yellow text-white">
          {icon}
        </div>
      )}
      <h3 className="mt-2 text-sm font-medium text-black">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      )}
      {buttonText && buttonUrl && (
        <div className="mt-6">
          <Link href={buttonUrl}>
            <a>
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-transparent bg-happy-middark px-4 py-2 text-sm font-medium text-happy-yellow shadow-sm hover:bg-happy-middark focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              >
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                {buttonText}
              </button>
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default EmptyState;
