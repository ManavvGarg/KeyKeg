"use client";

import React from "react";
import Image from "next/image";

import { signIn, signOut, useSession } from "next-auth/react";

import NavBar from "@/components/NavBar";

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
        <NavBar navType={0} signIn={signIn} />
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

      <NavBar navType={1} username={data.user.name} signOut={signOut} />
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
