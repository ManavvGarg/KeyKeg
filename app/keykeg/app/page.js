"use client";

import React from "react";
import Image from "next/image";
import "dotenv/config";

import { signIn, signOut, useSession } from "next-auth/react";

import NavBar from "@/components/NavBar";
import Footer from "@/components/footer";

const HomePage = () => {
  const { data, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex text-5xl min-h-screen flex-col items-center justify-between p-24">
        Please wait
      </div>
    );
  } else if (status !== "authenticated") {
    return (
      <div className="bg-white">
        {/* Navbar */}
        <NavBar navType={0} signIn={signIn} />

        {/* Hero Section */}
        <div className="flex relative bg-gradient-to-r from-blue-800 to-purple-700">
          <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Image
                src="/hero.png"
                alt="Password Security"
                width={100}
                height={100}
                className="flex justify-center items-center align-middle mx-[45%]"
              />
              <br />
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                <span className="block">KeyKeg - Password Wizard</span>
                <span className="block">Secure, Strong, and Smart</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                The ultimate password management solution that securely stores
                your passwords, generates strong and unique passwords, and
                utilizes artificial intelligence to analyze and classify
                password strength.
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
          <div className="absolute inset-0">
            <div className="bg-white h-1/3 sm:h-2/3"></div>
          </div>
          <div className="relative max-w-7xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Powerful Features
              </h2>
              <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                KeyKeg - Password Wizard offers a comprehensive set of features
                to ensure your online security and password management needs are
                met.
              </p>
            </div>
            <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
              <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-shrink-0">
                  <Image
                    src="/passStorage.jpg"
                    alt="Password Storage"
                    width={400}
                    height={300}
                    className="h-48 w-full object-cover"
                  />
                </div>
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-xl font-semibold text-gray-900">
                      Secure Password Storage
                    </p>
                    <p className="mt-3 text-base text-gray-500">
                      Store your passwords securely with industry-standard
                      encryption, ensuring your sensitive information is
                      protected from prying eyes.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-shrink-0">
                  <Image
                    src="/passGen.jpg"
                    alt="Password Generator"
                    width={400}
                    height={300}
                    className="h-48 w-full object-cover"
                  />
                </div>
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-xl font-semibold text-gray-900">
                      Strong Password Generator
                    </p>
                    <p className="mt-3 text-base text-gray-500">
                      Generate strong and unique passwords with customizable
                      length, character sets, and complexity levels to enhance
                      your online security.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-shrink-0">
                  <Image
                    src="/aiPass.jpg"
                    alt="Password Strength Analysis"
                    width={400}
                    height={300}
                    className="h-48 w-full object-cover"
                  />
                </div>
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-xl font-semibold text-gray-900">
                      AI-Powered Password Strength Analysis
                    </p>
                    <p className="mt-3 text-base text-gray-500">
                      Utilize our advanced AI technology to analyze and classify
                      the strength of your passwords, ensuring you stay one step
                      ahead of potential security threats.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  /* data return:
{
  user: {
    email,
    name,
    image
  }
} 
*/
  return (
    <div className="bg-white">
      {/* Navbar */}
      <NavBar
        navType={1}
        username={data.user.name}
        image={data.user.image}
        signOut={signOut}
      />

      {/* Hero Section */}
      <div className="flex relative bg-gradient-to-r from-blue-800 to-purple-700">
        <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Image
              src="/hero.png"
              alt="Password Security"
              width={100}
              height={100}
              className="flex justify-center items-center align-middle mx-[45%]"
            />
            <br />
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              <span className="block">KeyKeg - Password Wizard</span>
              <span className="block">Secure, Strong, and Smart</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              The ultimate password management solution that securely stores
              your passwords, generates strong and unique passwords, and
              utilizes artificial intelligence to analyze and classify password
              strength.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="absolute inset-0">
          <div className="bg-white h-1/3 sm:h-2/3"></div>
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Powerful Features
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              KeyKeg - Password Wizard offers a comprehensive set of features to
              ensure your online security and password management needs are met.
            </p>
          </div>
          <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
              <div className="flex-shrink-0">
                <Image
                  src="/passStorage.jpg"
                  alt="Password Storage"
                  width={400}
                  height={300}
                  className="h-48 w-full object-cover"
                />
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <p className="text-xl font-semibold text-gray-900">
                    Secure Password Storage
                  </p>
                  <p className="mt-3 text-base text-gray-500">
                    Store your passwords securely with industry-standard
                    encryption, ensuring your sensitive information is protected
                    from prying eyes.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
              <div className="flex-shrink-0">
                <Image
                  src="/passGen.jpg"
                  alt="Password Generator"
                  width={400}
                  height={300}
                  className="h-48 w-full object-cover"
                />
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <p className="text-xl font-semibold text-gray-900">
                    Strong Password Generator
                  </p>
                  <p className="mt-3 text-base text-gray-500">
                    Generate strong and unique passwords with customizable
                    length, character sets, and complexity levels to enhance
                    your online security.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
              <div className="flex-shrink-0">
                <Image
                  src="/aiPass.jpg"
                  alt="Password Strength Analysis"
                  width={400}
                  height={300}
                  className="h-48 w-full object-cover"
                />
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <p className="text-xl font-semibold text-gray-900">
                    AI-Powered Password Strength Analysis
                  </p>
                  <p className="mt-3 text-base text-gray-500">
                    Utilize our advanced AI technology to analyze and classify
                    the strength of your passwords, ensuring you stay one step
                    ahead of potential security threats.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
