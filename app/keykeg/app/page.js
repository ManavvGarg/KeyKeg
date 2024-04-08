"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { signIn, signOut, useSession } from "next-auth/react";

const HomePage = () => {
  const { data, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex text-5xl min-h-screen flex-col items-center justify-between p-24">
        Loading ho rhi bhai
      </div>
    );
  } else if (status !== "authenticated") {
    return (
      <div className="bg-white">
        {/* Navbar */}
        <nav className="bg-white py-7 h-[6rem] font-bold shadow-lg shadow-blue-100">
          <div className="container mx-auto flex justify-between items-center">
            <div>
              <ul className="flex space-x-4">
                <li>
                  <Link href="/" className="text-black">
                    KeyKeg
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-black">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-black">
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <ul className="flex space-x-4 space-y-4">
                <li>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    onClick={() => signIn("google")}
                  >
                    Login
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Div 1: Image on the right */}
        <div className="flex items-center h-screen">
          <div className="flex-1 p-8">{/* Content for Div 1 */}</div>
          <div className="flex-1">
            <Image
              src="/path/to/image1.jpg"
              alt="Image 1"
              layout="responsive"
              width={500}
              height={500}
            />
          </div>
        </div>

        {/* Div 2: Image on the left */}
        <div className="flex items-center h-screen">
          <div className="flex-1">
            <Image
              src="/path/to/image2.jpg"
              alt="Image 2"
              layout="responsive"
              width={500}
              height={500}
            />
          </div>
          <div className="flex-1 p-8">{/* Content for Div 2 */}</div>
        </div>

        {/* Div 3: Image in the middle */}
        <div className="flex items-center justify-center h-screen">
          <Image
            src="/path/to/image3.jpg"
            alt="Image 3"
            layout="responsive"
            width={500}
            height={500}
          />
        </div>
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
      <nav className="bg-white py-5 h-[6rem] font-bold shadow-lg shadow-blue-500/50">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <ul className="flex space-x-4">
              <li>
                <Link href="/" className="text-black">
                  KeyKeg
                </Link>
              </li>
              <li>
                <Link href="/" className="text-black">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-black">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <ul className="flex space-x-4 space-y-4">
              <li className="text-black py-4">Welcome {data.user.name}</li>
              <li>
                <Link
                  href="/panel"
                  className="text-black py-2 px-4 rounded-md hover:bg-blue-600 hover:text-white"
                >
                  Go to Dashboard
                </Link>
              </li>
              <li>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded my-[-1rem]"
                  onClick={() => signOut()}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Div 1: Image on the right */}
      <div className="flex items-center h-screen">
        <div className="flex-1 p-8">{/* Content for Div 1 */}</div>
        <div className="flex-1">
          <Image
            src="/path/to/image1.jpg"
            alt="Image 1"
            layout="responsive"
            width={500}
            height={500}
          />
        </div>
      </div>

      {/* Div 2: Image on the left */}
      <div className="flex items-center h-screen">
        <div className="flex-1">
          <Image
            src="/path/to/image2.jpg"
            alt="Image 2"
            layout="responsive"
            width={500}
            height={500}
          />
        </div>
        <div className="flex-1 p-8">{/* Content for Div 2 */}</div>
      </div>

      {/* Div 3: Image in the middle */}
      <div className="flex items-center justify-center h-screen">
        <Image
          src="/path/to/image3.jpg"
          alt="Image 3"
          layout="responsive"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};

export default HomePage;
