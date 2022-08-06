import SocialIcon from "@/components/icons/Social";
const copyrightLabel = `©${new Date().getFullYear()} Super Happy Dev House`;
const socialLink = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/Super-Happy-Dev-House-MX-100137369414135/",
    icon: "facebook",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/shdevhousemx/",
    icon: "instagram",
  },
  {
    name: "Twitter",
    href: "https://twitter.com/shdevhousemx",
    icon: "twitter",
  },
  {
    name: "Spotify",
    href: "https://open.spotify.com/playlist/01xP6Xj5QApYX1gijJGJec?si=0bb421c8fb07442a",
    icon: "spotify",
  },
];

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          {socialLink.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-400 hover:text-gray-500"
            >
              <div className="iconcontainer cursor-pointer w-6 h-6 text-gray-400">
                <SocialIcon type={item.icon} />
              </div>
            </a>
          ))}
        </div>
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-center text-base text-gray-400">
            {copyrightLabel}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
