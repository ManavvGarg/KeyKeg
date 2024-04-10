"use client";

import React, { useState, useEffect, useLayoutEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import NavBar from "@/components/NavBar";
import HomePage from "../page";
import Footer from "@/components/footer";

const PasswordCell = ({ password, index, handleRefresh, refeshState }) => {
  const { data, status } = useSession();

  //fetch saved passwords
  const [showPassword, setShowPassword] = useState(false);
  //delete password
  const handleDeleteEntry = async (passwordTag, email) => {
    const deleteEntryData = {
      userEmail: email,
      passwordTag: passwordTag,
    };
    await fetch("/api/deletePass", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deleteEntryData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      })
      .catch((error) => {
        console.error("There was a problem with the request:", error);
      });

    handleRefresh();
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <tr
      key={index}
      style={{ borderBottom: "1px solid black" }}
      className="justify-center items-center"
    >
      <td
        className="py-2 px-4 font-bold text-black"
        style={{
          borderRight: "1px solid gray",
          borderLeft: "1px solid gray",
        }}
      >
        {index + 1}
      </td>
      <td
        className="py-2 px-2 font-bold text-black"
        style={{ borderRight: "1px solid gray" }}
      >
        {password.passwordTag}
      </td>
      <td
        className="py-2 px-4 text-black font-bold"
        style={{ borderRight: "1px solid gray" }}
      >
        {showPassword ? (
          <input type="text" value={password.passwordHash} readOnly />
        ) : (
          <input type="password" value={password.passwordHash} readOnly />
        )}

        <button onClick={handleTogglePassword} className="float-end">
          {showPassword ? "🔐" : "👁️"}
        </button>
      </td>
      <td
        className="py-2 px-4 ml-2 flex"
        style={{ borderRight: "1px solid gray" }}
      >
        <button
          onClick={() => {
            handleDeleteEntry(password.passwordTag, data.user.email);
          }}
          className={`bg-red-500 text-white py-2 px-2 m-auto h-max rounded-md hover:bg-red-600 ${
            !refeshState ? "hover:bg-red-700" : ""
          } ${!refeshState ? "" : "cursor-not-allowed opacity-50"}`}
          disabled={refeshState}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

const PanelPage = () => {
  const { data, status } = useSession();

  //fetch saved passwords
  const [savedPasswords, setSavedPasswords] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    // Set refreshing state to trigger useEffect
    setRefreshing(true);
    // Reset refreshing state after a short delay to allow useEffect to fetch data
    setTimeout(() => {
      setRefreshing(false);
    }, 5000); // Adjust the delay as needed
  };

  useEffect(() => {
    // Fetch data from MongoDB
    if (status == "authenticated" && refreshing) {
      fetch(
        `/api/saved_passwords/?email=${encodeURIComponent(data.user.email)}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // Update state with fetched data
          setSavedPasswords(data.pass);
        })
        .catch((error) => {
          console.error("There was a problem with the request:", error);
        });
    }
  }, [refreshing]);

  //Save Password
  const [newUserSavePass, setNewUserSavePass] = useState("");
  const [newUserPassTag, setNewUserPassTag] = useState("");
  const [saveRefreshing, setSaveRefreshing] = useState(false);

  const handleSavePass = async () => {
    setSaveRefreshing(true);
    // Reset refreshing state after a short delay to allow useEffect to fetch data
    setTimeout(() => {
      setSaveRefreshing(false);
    }, 5000);
    const passwordData = {
      userEmail: data.user.email,
      passwordTag: newUserPassTag,
      passwordData: newUserSavePass,
    };
    await fetch("/api/savePass", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(passwordData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      })
      .catch((error) => {
        console.error("There was a problem with the request:", error);
      });
    // Clear the input field
    setNewUserSavePass("");
    setNewUserPassTag("");
    handleRefresh();
  };

  //Prediction Pass
  const [newUserPredPass, setNewUserPredPass] = useState("");
  const [newUserPredPassAnalysis, setNewUserPredPassAnalysis] = useState("");

  const handlePredPass = async () => {
    await fetch(
      `https://11mnv-keykeg.hf.space/predict?password=${newUserPredPass}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setNewUserPredPassAnalysis(
          `Password: ${newUserPredPass}|Analysis: ${data.prediction}`
        );
      })
      .catch((error) => {
        console.error("There was a problem with the request:", error);
      });
    // Clear the input field
    setNewUserPredPass("");
  };

  //Generate Password
  const [newUserGenPass, setNewUserGenPass] = useState("");
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

  if (status === "loading") {
    return (
      <div className="flex text-5xl min-h-screen flex-col items-center justify-between p-24">
        Please wait
      </div>
    );
  } else if (status == "unauthenticated") {
    return <HomePage />;
  }

  return (
    <main className="items-center justify-center bg-white">
      <NavBar navType={2} signOut={signOut} />
      <div className="flex min-h-[100%] h-[100vh] overflow-hidden w-full">
        {/* Left Section - Predict, Generate, Save */}
        <div className="flex-1 p-8 border-r border-gray-300">
          {/* Password Strength Predictor */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-black">
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
                className={`mt-1 p-2 border rounded-md w-full text-black font-bold`}
              />
            </div>
            <button
              onClick={handlePredPass}
              className={`bg-blue-500 text-white py-2 px-4 rounded-md ${
                newUserPredPass ? "hover:bg-blue-600" : ""
              } ${newUserPredPass ? "" : "cursor-not-allowed opacity-50"}`}
              disabled={!newUserPredPass}
            >
              Submit
            </button>

            {newUserPredPassAnalysis ? (
              <div className="mb-4">
                <label className="block font-medium text-gray-700 text-l pt-4">
                  {newUserPredPassAnalysis.split("|")[0]}
                  <br />
                  {newUserPredPassAnalysis.split("|")[1]}
                </label>
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

          {/* Password Generator */}
          <div>
            <div>
              <h2 className="text-2xl font-bold mb-3 text-black float-start">
                Password Generator
              </h2>
              <button
                onClick={handleGenPass}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 float-end"
              >
                Generate
              </button>
            </div>
            <br />
            <br />
            {newUserGenPass ? (
              <div className="mb-4">
                <label className="block font-medium text-gray-700 text-l pt-4">
                  Your new generated password:
                </label>
                <input
                  type="text"
                  value={newUserGenPass}
                  readOnly
                  className="mt-1 mb-5 p-2 border border-gray-300 rounded-md w-full text-black font-bold"
                />
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
                className={`mt-1 p-2 border rounded-md w-full text-black font-bold`}
              />
              <label className="block text-sm font-medium text-gray-700">
                Enter Password:
              </label>
              <input
                type="password"
                value={newUserSavePass}
                onChange={(e) => setNewUserSavePass(e.target.value)}
                className={`mt-1 p-2 border rounded-md w-full text-black font-bold`}
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
              disabled={(!newUserPassTag && !newUserSavePass) || saveRefreshing}
            >
              Save Password
            </button>
          </div>
        </div>

        {/* Right Section - List Passwords */}
        <div className="flex-1 p-8">
          <div className="flex mb-4">
            <div className="flex-1 justify-start">
              <h2 className="text-2xl font-bold mt-8 mb-4 text-black">
                Saved Passwords
              </h2>
            </div>
            <div className="flex justify-end float-right">
              <button
                onClick={handleRefresh}
                className={`bg-blue-500 text-white py-2 px-2 m-auto h-max rounded-md hover:bg-blue-600 ${
                  !refreshing ? "hover:bg-blue-600" : ""
                } ${!refreshing ? "" : "cursor-not-allowed opacity-50"}`}
                disabled={refreshing}
              >
                Refresh
              </button>
            </div>
          </div>
          <table className="w-full">
            <thead>
              <tr>
                <th
                  className="py-2 px-4 bg-blue-500"
                  style={{
                    borderRight: "1px solid black",
                    borderLeft: "1px solid black",
                    borderCollapse: "collapse",
                  }}
                >
                  S. No
                </th>
                <th
                  className="py-2 px-4 bg-blue-500"
                  style={{
                    borderRight: "1px solid black",
                    borderLeft: "1px solid black",
                    borderCollapse: "collapse",
                  }}
                >
                  Password KeyTag
                </th>
                <th
                  className="py-2 px-4 bg-blue-500"
                  style={{
                    borderLeft: "1px solid black",
                    borderCollapse: "collapse",
                  }}
                >
                  Password
                </th>
                <th
                  className="py-2 px-4 bg-blue-500"
                  style={{
                    borderLeft: "1px solid black",
                    borderRight: "1px solid black",
                    borderCollapse: "collapse",
                  }}
                ></th>
              </tr>
            </thead>
            <tbody>
              {savedPasswords && savedPasswords.length > 0 ? (
                savedPasswords.map((password, index) => (
                  <PasswordCell
                    key={index}
                    index={index}
                    password={password}
                    handleRefresh={handleRefresh}
                    refreshing={refreshing}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={3}>
                    <h2 className="py-2 px-4 font-bold text-black">
                      Click on the refresh button to refresh this table and to
                      grab all your passwords. <br />
                      If you still dont see any saved passwords. Save a password
                      to list them here.
                    </h2>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default PanelPage;
