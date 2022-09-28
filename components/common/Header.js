/* eslint-disable @next/next/no-img-element */
import { Fragment } from "react";
import Link from "next/link";
import { Popover, Transition, Menu } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useSession, signOut } from "next-auth/react";
import classNames from "@/utils/classNames";

//HEADER SETUP
const logoUrl = "/images/etherfuse_squarelogo.jpeg";
const navigation = {
  categories: [],
  pages: [
    { name: "Sedes", href: "/events" },
    { name: "Agenda", href: "/#schedule" },
    { name: "Sponsors", href: "/#sponsors" },
    { name: "Team", href: "/#organizers" },
    { name: "Faqs", href: "/faqs" },
  ],
};

const Header = ({ fixed = false }) => {
  const { data: session } = useSession();

  return (
    <Popover className={`relative bg-black `}>
      <div
        className={`absolute inset-0 shadow  pointer-events-none `}
        aria-hidden="true"
      />
      <div className={`${fixed && "fixed z-50"}  bg-black  w-full z-50 `}>
        {/* DESKTOP */}
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-5 sm:px-6 sm:py-4 lg:px-8 md:justify-start md:space-x-10 ">
          <div>
            <Link href="/">
              <a className="flex">
                <img className="h-8 w-auto sm:h-10" src={logoUrl} alt="" />
              </a>
            </Link>
          </div>
          <div className="flex space-x-2 -mr-2 -my-2 md:hidden">
            {session ? (
              <SessionMenu session={session} />
            ) : (
              <Popover.Button className="bg-happy-pink rounded-md p-2 inline-flex items-center justify-center text-happy-yellow  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-happy-pink">
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            )}
          </div>
          <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
            <Popover.Group as="nav" className="flex space-x-10">
              {navigation.pages.map((page) => (
                <Link key={page.name} href={page.href}>
                  <a className="text-base font-medium text-happy-yellow">
                    {page.name}
                  </a>
                </Link>
              ))}
            </Popover.Group>
            {/* HEADER DEKTOP RIGHT SECTION BUTTONS */}
            <SessionMenu session={session} />
          </div>

          {session ? null : (
            <div className="linkcontainer hidden md:block">
              <Link href="/auth/signin">
                <a>
                  <button className="text-normal font-semibold  text-happy-yellow px-2 py-1 rounded-md  ">
                    Iniciar Sesión
                  </button>
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE */}
      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-black divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5 sm:pb-8 bg-happy-pink">
              <div className="flex items-center justify-between">
                <div>
                  <Link href="/">
                    <a>
                      {" "}
                      <img className="h-8 w-auto" src={logoUrl} alt="logo" />
                    </a>
                  </Link>
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-black rounded-md p-2 inline-flex items-center justify-center text-happy-yellow   focus:outline-none focus:ring-2 focus:ring-inset focus:ring-happy-pink">
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className="py-6 px-5 bg-happy-pink-600">
              <div className="grid grid-cols-1 gap-4 gap-y-8">
                {navigation.pages.map((page) => (
                  <Link key={page.name} href={page.href}>
                    <a className="rounded-md text-base font-medium text-happy-yellow">
                      {page.name}
                    </a>
                  </Link>
                ))}
                {session ? null : (
                  <Link href="/auth/signin">
                    <a>
                      <button className="text-normal font-semibold  text-happy-yellow  rounded-md  ">
                        Iniciar Sesión
                      </button>
                    </a>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

const SessionMenu = ({ session }) => {
  return (
    <div className="flex items-center md:ml-12">
      {session ? (
        <Menu as="div" className="ml-3 relative">
          <div>
            <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-offset-2  focus:ring-white">
              <span className="sr-only">Open user menu</span>
              {session.user.image ? (
                <img
                  className="h-8 w-8 rounded-full"
                  src={session.user.image}
                  alt=""
                />
              ) : (
                <img
                  className="h-8 w-8 rounded-full"
                  src={`https://avatars.dicebear.com/api/micah/${session.user.email}.svg?background=%23ffffff`}
                  alt=""
                />
              )}
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-black ring-1 ring-black ring-opacity-5 focus:outline-none z-40">
              <Menu.Item>
                {({ active }) => (
                  <Link href="/user/profile">
                    <a
                      className={classNames(
                        active ? "bg-black" : "",
                        "block px-4 py-2 text-sm text-happy-yellow"
                      )}
                    >
                      Mi Cuenta
                    </a>
                  </Link>
                )}
              </Menu.Item>

              {session.user.roles.includes("admin") && (
                <Menu.Item>
                  {({ active }) => (
                    <Link href="/admin/dashboard">
                      <a
                        className={classNames(
                          active ? "bg-black" : "",
                          "block px-4 py-2 text-sm text-happy-yellow"
                        )}
                      >
                        Admin Dashboard
                      </a>
                    </Link>
                  )}
                </Menu.Item>
              )}

              <Menu.Item>
                {({ active }) => (
                  <div
                    className={classNames(
                      active ? "bg-black" : "",
                      "block px-4 py-2 text-sm text-happy-yellow cursor-pointer"
                    )}
                    onClick={() => signOut()}
                  >
                    Salir
                  </div>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      ) : (
        <></>
        // <Link href="/auth/signin">
        //   <a>Sign In </a>
        // </Link>
      )}
    </div>
  );
};

export default Header;
