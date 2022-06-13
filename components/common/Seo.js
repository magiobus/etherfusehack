import { NextSeo } from "next-seo";

//EDIT ME PLEASE
const data = {
  siteName: "Super Happy Dev House MX",
  title: "Super Happy Dev House MX",
  description:
    "SHDH es un evento informal para desarrolladores, creativos y curiosos de la tecnología. Ven a divertirte, construir tu idea o aprender algo nuevo.",
  url: "https://superhappydevhouse.mx",
  imageUrl:
    "https://res.cloudinary.com/superhappydevhousemx-gmail-com/image/upload/v1655094624/og_rwcjrt.jpg",
  twitter: "@shdevhousemx",
};

const Seo = ({
  subtitle,
  description = data.description,
  url = data.url,
  imageUrl = data.imageUrl,
}) => {
  const title = subtitle ? `${data.title} | ${subtitle}` : `${data.title}`;
  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        url: url,
        locale: "es",
        title: title,
        description: description,
        images: [
          {
            url: imageUrl,
            width: 800,
            height: 600,
            alt: title,
          },
        ],
        site_name: data.siteName,
      }}
      twitter={{
        handle: data.twitter,
        site: data.twitter,
        cardType: "summary_large_image",
      }}
    />
  );
};

export default Seo;
