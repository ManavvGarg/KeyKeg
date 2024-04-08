"use client";

import React, { useState } from "react";

const PanelPage = () => {
  const [newUserSavePass, setNewUserSavePass] = useState("");
  const [newUserPredPass, setNewUserPredPass] = useState("");
  const [newUserGenPass, setNewUserGenPass] = useState("");
  const [newUserPassTag, setNewUserPassTag] = useState("");

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
  };

  const handleSavePass = () => {
    // Clear the input field
    setNewUserSavePass(" ");
  };
  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex h-screen w-full">
        {/* Left Section - Add User Form and Users Table */}
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
                disabled={!newUserGenPass}
              >
                Save Password
              </button>
            </div>
          </div>

          {/* Save Password */}
          {/* <div>
            <h2 className="text-2xl font-bold mb-4">Save Password</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Enter Password KeyTag (A name which you can remember easily for
                you password):
              </label>
              <input
                type="text"
                value={newUserPassTag}
                onChange={(e) => setNewUserPassTag(e.target.value)}
                className={`mt-1 p-2 border rounded-md w-full`}
              />
              <label className="block text-sm font-medium text-gray-700">
                Enter Password:
              </label>
              <input
                type="password"
                value={newUserSavePass}
                onChange={(e) => setNewUserSavePass(e.target.value)}
                className={`mt-1 p-2 border rounded-md w-full`}
              />
            </div>
            <button
              onClick={handleSavePass}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </div> */}
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
