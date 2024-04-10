"use client";

import React from "react";
import Image from "next/image";
import "dotenv/config";
import Footer from "@/components/footer";

import { signIn, signOut, useSession } from "next-auth/react";

import NavBar from "@/components/NavBar";

const AboutPage = () => {
  const { data, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex text-5xl min-h-screen flex-col items-center justify-between p-24">
        Please wait
      </div>
    );
  } else if (status !== "authenticated") {
    return (
      <div className="h-screen overscroll-none">
        {/* Navbar */}
        <NavBar navType={0} signIn={signIn} />
        <div className="bg-white py-16 pb-96">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  About KeyKeg - Password Wizard
                </h2>
                <p className="mt-4 text-lg text-gray-500">
                  KeyKeg - Password Wizard is a cutting-edge password management
                  solution designed to keep your online accounts secure and
                  streamline your digital life.
                </p>
                <p className="mt-4 text-lg text-gray-500">
                  Our mission is to provide you with a seamless and worry-free
                  experience when it comes to password security. With our
                  advanced encryption technology and AI-powered password
                  strength analysis, you can rest assured that your sensitive
                  information is protected from potential threats.
                </p>
                <p className="mt-4 text-lg text-gray-500">
                  Whether you're an individual looking to safeguard your
                  personal accounts or a business seeking to secure your
                  corporate data, KeyKeg - Password Wizard has got you covered.
                  Experience the ultimate peace of mind and take control of your
                  online security today.
                </p>
              </div>
              <div className="mt-8 ml-10 lg:mt-0 lg:w-1/2">
                <Image
                  src="/about.jpg"
                  alt="About KeyKeg - Password Wizard"
                  width={800}
                  height={600}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  } else {
    return (
      <div className="h-screen overscroll-none">
        {/* Navbar */}
        <NavBar
          navType={1}
          username={data.user.name}
          image={data.user.image}
          signOut={signOut}
        />
        <div className="bg-white py-16 overflow-hidden pb-96">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  About KeyKeg - Password Wizard
                </h2>
                <p className="mt-4 text-lg text-gray-500">
                  KeyKeg - Password Wizard is a cutting-edge password management
                  solution designed to keep your online accounts secure and
                  streamline your digital life.
                </p>
                <p className="mt-4 text-lg text-gray-500">
                  Our mission is to provide you with a seamless and worry-free
                  experience when it comes to password security. With our
                  advanced encryption technology and AI-powered password
                  strength analysis, you can rest assured that your sensitive
                  information is protected from potential threats.
                </p>
                <p className="mt-4 text-lg text-gray-500">
                  Whether you're an individual looking to safeguard your
                  personal accounts or a business seeking to secure your
                  corporate data, KeyKeg - Password Wizard has got you covered.
                  Experience the ultimate peace of mind and take control of your
                  online security today.
                </p>
              </div>
              <div className="mt-8 ml-10 lg:mt-0 lg:w-1/2">
                <Image
                  src="/about.jpg"
                  alt="About KeyKeg - Password Wizard"
                  width={800}
                  height={600}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
};

export default AboutPage;
