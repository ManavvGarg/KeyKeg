"use client";

import React from "react";
import Image from "next/image";
import "dotenv/config";

import { signIn, signOut, useSession } from "next-auth/react";

import NavBar from "@/components/NavBar";

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
      <div className="bg-white overflow-hidden">
        {/* Navbar */}
        <NavBar navType={0} signIn={signIn} />
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
    </div>
  );
};

export default HomePage;
