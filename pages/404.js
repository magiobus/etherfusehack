/* eslint-disable @next/next/no-img-element */
// 404.js
import Link from "next/link";
const logoUrl = "/images/shdh_logo.png";

export default function FourOhFour() {
  return (
    <>
      <div className="flex min-h-full flex-col bg-white pt-16 pb-12">
        <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8">
          <div className="flex flex-shrink-0 justify-center">
            <div>
              <Link href="/">
                <a className="flex">
                  <img className="h-8 w-auto sm:h-10" src={logoUrl} alt="" />
                </a>
              </Link>
            </div>
          </div>
          <div className="py-16">
            <div className="text-center">
              <p className="text-4xl font-semibold text-orange-600">404</p>
              <h1 className="my-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                ¡Vaya!
              </h1>
              <p className="mt-2 text-2xl text-gray-500">
                No hemos podido encontrar la página que buscas.
              </p>
              <div className="mt-6">
                <Link
                  href="/"
                  className="text-2xl font-medium text-orange-600 hover:text-orange-500"
                >
                  <a>
                    Ir a Inicio
                    <span aria-hidden="true"> &rarr;</span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
