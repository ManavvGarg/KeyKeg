"use client"

import React, { useState } from 'react';

const PanelPage = () => {
  const [users, setUsers] = useState([
    { id: 1, email: 'user1@example.com' },
    { id: 2, email: 'user2@example.com' },
  ]);

  const [newUserEmail, setNewUserEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  // Function to validate an email address
  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to handle the "Add User" form submission
  const handleAddUser = () => {
    if (!isEmailValid(newUserEmail)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    // Clear previous error message
    setEmailError('');

    // Dummy logic - Add user to the list
    const newUser = { id: users.length + 1, email: newUserEmail };
    setUsers((prevUsers) => [...prevUsers, newUser]);

    // Clear the input field
    setNewUserEmail('');
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="flex h-screen w-full">
        {/* Left Section - Add User Form and Users Table */}
        <div className="flex-1 p-8 border-r border-gray-300">
          <h2 className="text-2xl font-bold mb-4">Add User</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email ID:</label>
            <input
              type="text"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              className={`mt-1 p-2 border rounded-md w-full ${
                emailError ? 'border-red-500' : ''
              }`}
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>
          <button
            onClick={handleAddUser}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
          <h2 className="text-2xl font-bold mt-8 mb-4">Users</h2>
          <table className="w-full">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-gray-200">ID</th>
                <th className="py-2 px-4 bg-gray-200">Email</th>
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
        </div>

        {/* Right Section - Blog Actions */}
        <div className="flex-1 p-8">
          <h2 className="text-2xl font-bold mb-4">Blog Actions</h2>
          <button
            onClick={() => console.log('Add a Blog')}
            className="bg-green-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-green-600"
          >
            Add a Blog
          </button>
          <button
            onClick={() => console.log('Delete a Blog')}
            className="bg-red-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-red-600"
          >
            Delete a Blog
          </button>
          <button
            onClick={() => console.log('Update a Blog')}
            className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600"
          >
            Update a Blog
          </button>
        </div>
      </div>
    </main>
  );
};

export default PanelPage;
