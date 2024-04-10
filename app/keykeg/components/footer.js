import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-800 to-purple-700 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/hero.png"
            alt="KeyKeg - Password Wizard"
            width={20}
            height={20}
            className="mr-2"
          />
          <span className="text-white font-semibold">
            KeyKeg - Password Wizard
          </span>
        </div>
        <div>
          <p className="text-white text-sm">
            &copy; 2024{" "}
            <span role="img" aria-label="Copyright">
              &#169;
            </span>{" "}
            Manav Garg, VIT Chennai
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
