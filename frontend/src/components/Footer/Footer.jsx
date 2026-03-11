import React from "react";
// import footerLogo from "../../assets/logo.png";
// import Banner from "../../assets/website/footer-pattern.jpg";
import { FiShoppingBag } from "react-icons/fi";
import { FaMapLocationDot } from "react-icons/fa6";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
} from "react-icons/fa";
import { IoCall } from "react-icons/io5";

// const BannerImg = {
//   backgroundImage: `url(${Banner})`,
//   backgroundPosition: "bottom",
//   backgroundRepeat: "no-repeat",
//   backgroundSize: "cover",
//   height: "100%",
//   width: "100%",
// };

const FooterLinks = [
  {
    title: "Home",
    link: "/#",
  },
  {
    title: "About",
    link: "/#about",
  },
  {
    title: "Contact",
    link: "/#contact",
  },
  {
    title: "Blog",
    link: "/#blog",
  },
];

const Footer = () => {
  return (
    <div className="text-white bg-[#212529]">
      <div className="container">
        <div data-aos="zoom-in" className="grid md:grid-cols-3 pb-44 pt-5">
          {/* company details */}
          <div className="py-8 px-4">
            <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-1">
              <FiShoppingBag size="30" />
              {/* <img src={footerLogo} alt="" className="max-w-[50px]" /> */}
              ShopMe
            </h1>
            <p>
              Your ultimate destination for premium fashion and accessories. We deliver style, quality, and exceptional customer service worldwide.
            </p>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10">
            <div>
              <div className="py-8 px-4">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                  Important Links
                </h1>
                <ul className="flex flex-col gap-3">
                  {FooterLinks.map((link) => (
                    <li
                      className="cursor-pointer hover:text-primary hover:translate-x-1 duration-300 text-gray-200"
                      key={link.title}
                      onClick={() => {
                        if (link.link === "/#") {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        } else {
                          const element = document.querySelector(link.link.replace('/#', '#'));
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }
                      }}
                    >
                      <span>{link.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <div className="py-8 px-4">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                  Links
                </h1>
                <ul className="flex flex-col gap-3">
                  {FooterLinks.map((link) => (
                    <li
                      className="cursor-pointer hover:text-primary hover:translate-x-1 duration-300 text-gray-200"
                      key={link.title}
                      onClick={() => {
                        if (link.link === "/#") {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        } else {
                          const element = document.querySelector(link.link.replace('/#', '#'));
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }
                      }}
                    >
                      <span>{link.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact details */}
            <div className="flex items-center justify-center sm:justify-start">
              <div className="mt-8 sm:mt-6">
                <div className="flex items-center gap-3">
                  <FaMapLocationDot />
                  <p>Andhra Pradesh, India</p>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <IoCall />
                  <p>+91 9392886199</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
