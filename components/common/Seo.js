import { NextSeo } from "next-seo";

//EDIT ME PLEASE
const data = {
  siteName: "Etherfuse Hackathon",
  title: "Etherfuse Hackathon",
  description:
    "Participa en el hackathon de etherfuse, pronto cerca de tu ciudad",
  url: "https://hackathon.etherfuse.com",
  imageUrl: "/og.jpg",
  twitter: "@etherfuse",
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
            url: imageUrl ? imageUrl : data.imageUrl,
            width: 1200,
            height: 630,
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
