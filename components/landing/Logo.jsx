import Image from "next/image";

const logo = "/landingimages/etherfuse_hackathon.png";

export function Logo(props) {
  return (
    <div className="w-18" {...props}>
      <Image
        src={logo}
        alt="Logo"
        width={420}
        height={152}
        layout="responsive"
      />
    </div>
  );
}
