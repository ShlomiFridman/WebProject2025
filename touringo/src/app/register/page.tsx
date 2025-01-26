"use client";

import { useState } from 'react';
import { useAppContext } from '@/context/MainContext';  // Custom hook to access global app context
import { Account } from '@/utils/classes';  // Import the Account class
import { encryptData } from '@/utils/utils';  // Utility function to encrypt account data
import React from 'react';
import { logAccount } from '@/utils/util_client';  // Utility for logging account info
import { useRouter } from 'next/navigation';  // Next.js router hook for navigation
import { myStyles } from '@/components/styles';  // Custom styles
import { mySvgs } from '@/components/svgs';  // SVG icons for show/hide password

const RegisterPage = () => {
  const { dispatch } = useAppContext();  // Access app dispatch function to update global state
  const router = useRouter();  // Initialize router for navigation

  // Local state to handle form inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);  // Toggle password visibility
  const [isLoading, setIsLoading] = useState(false);  // Track loading state during registration
  const [error, setError] = useState<string | null>(null);  // Track any errors during registration

  // Handle username input changes
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  // Handle password input changes
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // Register button click handler
  const onBtnClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const account: Account = new Account(username, password, username, "empty", "empty");  // Create an Account instance
    console.log(account);
    registerRequest(account);  // Call function to send registration request
  };

  // Function to send the registration request to the API
  const registerRequest = (account: Account) => {
    setIsLoading(true);  // Set loading state
    setError(null);  // Clear previous errors

    fetch('/api/accounts/register', {
      method: 'POST',  // Use POST method for registration
      body: JSON.stringify({data: encryptData({ account: account })}),  // Encrypt account data before sending
      headers: {
        'Content-Type': 'application/json',  // Indicate that the body contains JSON data
      },
    })
      .then((response) => {
        // Handle response errors
        const badRequestError = response.status >= 400 && response.status < 500;
        if (!response.ok && !badRequestError) {
          alert(response.statusText);  // Alert if an unknown error occurs
          throw new Error('Unknown Error');
        }
        return response.json();  // Parse response as JSON
      })
      .then((resBody) => {
        if (resBody.message) {
          setError(resBody.message);  // Set error if the response contains an error message
        } else {
          const account = resBody.result as Account;  // Extract the account data from the response
          console.log(`Registered account set: ${account.username}`);
          dispatch({ type: 'SET_LOGGED_ACCOUNT', payload: account });  // Dispatch account to global state
          logAccount(account);  // Log the account info
          router.push("/");  // Navigate to the home page upon successful registration
        }
      })
      .catch((err) => {
        console.log(err);
        setError('An error occurred. Please try again.');  // Set a generic error message
      })
      .finally(() => {
        setIsLoading(false);  // Reset loading state
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-700">
      <div className="bg-gray-200 dark:bg-gray-500 p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center mb-4 text-black">Register</h1>

        {/* Error message display */}
        {error && (
          <div className="mb-4 text-red-500 text-sm">
            <p>{error}</p>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={(e) => e.preventDefault()}>  {/* Prevent form default submission */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium dark:text-gray-200 text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}  // Handle username changes
              placeholder="Enter your username"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium dark:text-gray-200 text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}  // Toggle between text and password input
                id="password"
                value={password}
                onChange={handlePasswordChange}  // Handle password input changes
                placeholder="Enter your password"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
              />

              {/* Password visibility toggle button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}  // Toggle showPassword state
                className="absolute inset-y-0 right-2 flex items-center text-gray-500 focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? mySvgs.eyeOpen_icon : mySvgs.eyeClosed_icon}  {/* Show the appropriate icon based on visibility */}
              </button>
            </div>
          </div>

          {/* Register Button */}
          <button
            onClick={onBtnClick}  // Trigger the registration process
            disabled={isLoading}  // Disable the button while loading
            className={`w-full ${myStyles.button_blue} py-2 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-400`}
          >
            {isLoading ? 'Registering...' : 'Register'}  {/* Show loading text if isLoading is true */}
          </button>
        </form>

        {/* Optionally add a link to login or other actions */}
        <div className="mt-4 text-center">
          <p className="text-sm dark:text-gray-200 text-gray-600">Already have an account? <a href="/login" className="text-green-600 dark:text-green-300">Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
