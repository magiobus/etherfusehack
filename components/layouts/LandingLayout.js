import Head from "next/head";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Seo from "@/components/common/Seo";

const Landinglayout = ({
  title,
  description,
  imageUrl,
  children,
  fixed = false,
  ...rest
}) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Seo subtitle={title} description={description} imageUrl={imageUrl} />
      <div className="min-h-full h-full">
        <div className="flex flex-col w-full bg-gray-100 " {...rest}>
          <div className="flex flex-col w-full" {...rest}>
            <Header fixed={fixed} />
            <div className={`my-0 ${fixed && " pt-20 lg:pt-14"}`}>
              {children}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Landinglayout;
