import Link from "next/link";
import Head from "next/head";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import NoAccessErrorPage from "@/components/errors/NoAccessErrorPage";
import LoadingCircle from "@/components/common/LoadingCircle";
import classNames from "@/utils/classNames";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { CalendarIcon } from "@heroicons/react/outline";
import { Toaster } from "react-hot-toast";

const OrganizerLayout = ({ title, children, ...props }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const navigation = [
    {
      name: "Eventos",
      href: "/organizer/events",
      icon: CalendarIcon,
      current: false,
    },
  ];

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-full">
        <LoadingCircle color="#000000" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    console.error("unauthenticated");
    return <NoAccessErrorPage />;
  }

  if (session.user.roles && !session.user.roles.includes("organizer")) {
    console.error("No organizer");
    return <NoAccessErrorPage />;
  }

  return (
    <>
      <Head>
        <title>{title ? `Dashboard | ${title}` : "Dashboard"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-full h-full">
        <Toaster position="bottom-center" />

        <div className="flex flex-col w-full bg-gray-100 " {...props}>
          <Header />
          <div className="w-full max-w-7xl  mx-auto  ">
            <div className="max-w-7xl w-full py-6 sm:px-6  ">
              <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
                <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-2">
                  <nav className="space-y-1">
                    <p className="mb-4 font-bold">Dashboard</p>

                    {navigation.map((item) => {
                      if (router.pathname.includes(item.href)) {
                        item.current = true;
                      }
                      return (
                        <Link key={item.name} href={item.href}>
                          <a
                            className={classNames(
                              item.current
                                ? "bg-black text-happy-yellow hover:text-happy-yellow hover:bg-black"
                                : "text-gray-900 hover:text-gray-900 hover:bg-gray-50",
                              "group rounded-md px-3 py-2 flex items-center text-sm font-medium"
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

                <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-10">
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

export default OrganizerLayout;
