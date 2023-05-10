import Link from "next/link";
import Head from "next/head";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import NoAccessErrorPage from "@/components/errors/NoAccessErrorPage";
import LoadingCircle from "@/components/common/LoadingCircle";
import { UserCircleIcon, CodeIcon, TicketIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import classNames from "@/utils/classNames";
import { Toaster } from "react-hot-toast";

const AccountLayout = ({ children, ...props }) => {
  const router = useRouter();
  const { status } = useSession();

  const navigation = [
    {
      name: "Mi Cuenta",
      href: "/user/profile",
      icon: UserCircleIcon,
      current: false,
    },
    // {
    //   name: "Mis Tickets",
    //   href: "/user/tickets",
    //   icon: TicketIcon,
    //   current: false,
    // },
    // {
    //   name: "Mis Proyectos",
    //   href: "/user/projects",
    //   icon: CodeIcon,
    //   current: false,
    // },
  ];

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-full">
        <LoadingCircle color="#000000" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <NoAccessErrorPage />;
  }

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-full h-full">
        <div className="flex flex-col w-full bg-gray-100 " {...props}>
          <Header />
          <Toaster position="bottom-center" />
          <div className="w-full max-w-7xl  mx-auto  ">
            <div className="max-w-7xl w-full py-6 sm:px-6  ">
              <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
                <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
                  <nav className="space-y-1">
                    {navigation.map((item) => {
                      if (item.href === router.pathname) {
                        item.current = true;
                      }
                      return (
                        <Link key={item.name} href={item.href}>
                          <a
                            className={classNames(
                              item.current
                                ? "bg-happy-middark text-happy-yellow hover:text-happy-yellow hover:bg-happy-middark"
                                : "text-gray-900 hover:text-gray-900 hover:bg-gray-50",
                              "group rounded-md px-3 py-2 flex items-center text-sm font-medium "
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            <item.icon
                              className={classNames(
                                item.current
                                  ? "text-happy-yellow group-hover:text-happy-yellow"
                                  : "text-gray-400 group-hover:text-gray-500",
                                "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                              )}
                              aria-hidden="true"
                            />
                            <span className="truncate">{item.name}</span>
                          </a>
                        </Link>
                      );
                    })}
                  </nav>
                </aside>

                <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
                  {children}
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default AccountLayout;
