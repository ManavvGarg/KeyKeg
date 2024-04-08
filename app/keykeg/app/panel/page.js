"use client";

import React, { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import NavBar from "@/components/NavBar";
import HomePage from "../page";

const PanelPage = () => {
  const { data, status } = useSession();

  //Save Password
  const [newUserSavePass, setNewUserSavePass] = useState("");
  const [newUserPassTag, setNewUserPassTag] = useState("");

  //Prediction Pass
  const [newUserPredPass, setNewUserPredPass] = useState("");

  //Generate Password
  const [newUserGenPass, setNewUserGenPass] = useState("");
  const [isSavingDisabled, setIsSavingDisabled] = useState(true);

  const handlePredPass = () => {
    // Clear the input field
    setNewUserPredPass(" ");
  };

  const handleGenPass = () => {
    fetch("/api/generate")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setNewUserGenPass(data.pass);
      })
      .catch((error) => {
        console.error("There was a problem with the request:", error);
      });
    setIsSavingDisabled(false);
  };

  const handleSavePass = () => {
    // Clear the input field
    setIsSavingDisabled(true);
    setNewUserGenPass("");
  };

  if (status === "loading") {
    return (
      <div className="flex text-5xl min-h-screen flex-col items-center justify-between p-24">
        Loading ho rhi bhai
      </div>
    );
  } else if (status == "unauthenticated") {
    return <HomePage />;
  }

  return (
    <main className="items-center justify-center bg-white overflow-hidden">
      <NavBar navType={2} signOut={signOut} />
      <div className="flex min-h-[100%] h-[100vh] overflow-hidden w-full">
        {/* Left Section - Predict, Generate, Save */}
        <div className="flex-1 p-8 border-r border-gray-300">
          {/* Password Strength Predictor */}
          {/* <div>
            <h2 className="text-2xl font-bold mb-4">
              Password Strength Predictor
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Enter Password:
              </label>
              <input
                type="text"
                value={newUserPredPass}
                onChange={(e) => setNewUserPredPass(e.target.value)}
                className={`mt-1 p-2 border rounded-md w-full`}
              />
            </div>
            <button
              onClick={handlePredPass}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </div> */}

          {/* Password Generator */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-black">
              Password Generator
            </h2>
            <button
              onClick={handleGenPass}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Generate
            </button>
            {newUserGenPass ? (
              <div className="mb-4">
                <label className="block font-medium text-gray-700 text-2xl py-5">
                  Your new generated password:
                </label>
                <input
                  type="text"
                  value={newUserGenPass}
                  readOnly
                  className="mt-1 mb-5 p-2 border border-gray-300 rounded-md w-full text-black font-bold"
                />
                <button
                  onClick={handleSavePass}
                  className={`bg-blue-500 text-white py-2 px-4 rounded-md ${
                    newUserGenPass ? "hover:bg-blue-600" : ""
                  } ${newUserGenPass ? "" : "cursor-not-allowed opacity-50"}`}
                  disabled={isSavingDisabled}
                >
                  Save Password
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
          <hr
            className="my-16"
            style={{
              borderTop: "1px solid gray",
            }}
          />
          {/* Save Password */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-black">
              Save Password
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Enter Password KeyTag (A name which you can remember easily for
                you password):
              </label>
              <input
                type="text"
                value={newUserPassTag}
                onChange={(e) => setNewUserPassTag(e.target.value)}
                className={`mt-1 p-2 border rounded-md w-full text-black`}
              />
              <label className="block text-sm font-medium text-gray-700">
                Enter Password:
              </label>
              <input
                type="password"
                value={newUserSavePass}
                onChange={(e) => setNewUserSavePass(e.target.value)}
                className={`mt-1 p-2 border rounded-md w-full text-black`}
              />
            </div>
            <button
              onClick={handleSavePass}
              className={`bg-blue-500 text-white py-2 px-4 rounded-md ${
                newUserSavePass && newUserPassTag ? "hover:bg-blue-600" : ""
              } ${
                newUserSavePass && newUserPassTag
                  ? ""
                  : "cursor-not-allowed opacity-50"
              }`}
              disabled={newUserPassTag && newUserSavePass}
            >
              Save Password
            </button>
          </div>
        </div>

        {/* Right Section - List Passwords */}
        {/* <div className="flex-1 p-8">
          <h2 className="text-2xl font-bold mt-8 mb-4">Saved Passwords</h2>
          <table className="w-full">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-gray-200">Password KeyTag</th>
                <th className="py-2 px-4 bg-gray-200">Password</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="py-2 px-4">{user.id}</td>
                  <td className="py-2 px-4">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}
      </div>
    </main>
  );
};

export default PanelPage;
