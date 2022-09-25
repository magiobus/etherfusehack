import SocialIcon from "@/components/icons/Social";
const copyrightLabel = `© Etherfuse ${new Date().getFullYear()} `;
const socialLink = [
  {
    name: "Substack",
    href: "https://etherfuse.substack.com",
    icon: "substack",
  },
  {
    name: "Twitter",
    href: "https://twitter.com/etherfuse",
    icon: "twitter",
  },
  {
    name: "Linked In ",
    href: "https://www.linkedin.com/company/etherfuse/",
    icon: "linkedin",
  },
];

const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          {socialLink.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-happy-yellow hover:text-gray-500"
            >
              <div className="iconcontainer cursor-pointer w-6 h-6 text-happy-yellow">
                <SocialIcon type={item.icon} />
              </div>
            </a>
          ))}
        </div>
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-center text-base text-happy-yellow">
            {copyrightLabel}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
