import Image from "next/image";
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-white py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-between items-center">
        {/* Logo Section */}
        <div className="mb-6 md:mb-0">
          <h2 className="text-3xl font-bold">Sillage D'or</h2>
          <p className="text-gray-400 mt-2">Indulge in luxury</p>
        </div>

        <div>
          <Image src={"/logo.png"} width={200} height={200} alt="logo" />
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <div className="flex gap-4 mt-2">
            <a
              href="#"
              className="text-gray-400 hover:text-gray-200 transition text-2xl"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-200 transition text-2xl"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-200 transition text-2xl"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-200 transition text-2xl"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-8 text-center text-gray-500 text-sm border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Sillage D'or. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
