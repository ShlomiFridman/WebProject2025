"use client";

/**
 * LoginPage Component
 * 
 * This component handles user login functionality, including:
 * - Collecting user credentials (username and password)
 * - Sending login requests to the server
 * - Managing form states (e.g., loading, errors)
 * - Providing user feedback (error messages, loading indicators)
 * 
 * It also handles password visibility toggling and redirects the user to the home page upon successful login.
 */

import { useEffect, useState } from 'react';
import { useAppContext } from '@/context/MainContext'; // App-wide context for managing state
import { Account } from '@/utils/classes'; // Account class for type consistency
import { encryptData } from '@/utils/utils'; // Utility to encrypt user credentials
import { logAccount } from '@/utils/util_client'; // Function to log account information locally
import React from 'react';
import { useRouter } from 'next/navigation'; // Next.js router for navigation
import { myStyles } from '@/components/styles'; // Custom styles for consistent UI
import { mySvgs } from '@/components/svgs'; // Icons for UI elements

const LoginPage = () => {
  const router = useRouter();
  const { dispatch } = useAppContext(); // Access the global dispatch function

  // Local state for managing form input and UI behavior
  const [username, setUsername] = useState(''); // State for username input
  const [password, setPassword] = useState(''); // State for password input
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState<string | null>(null); // State for error messages

  // Clear any logged-in account when the component mounts
  useEffect(() => {
    dispatch({ type: 'SET_LOGGED_ACCOUNT', payload: null }); // Reset the logged-in account
    logAccount(null); // Log the account as null in local storage or context
  }, [dispatch]);

  /**
   * Handles the username input change event.
   * @param e React.ChangeEvent<HTMLInputElement> - Input change event
   */
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  /**
   * Handles the password input change event.
   * @param e React.ChangeEvent<HTMLInputElement> - Input change event
   */
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  /**
   * Logs the user's login attempt to the console.
   * @param username string - Entered username
   * @param password string - Entered password
   */
  const logAttempt = (username: string, password: string) => {
    console.log('User Details:');
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
  };

  /**
   * Handles the login form submission.
   * @param e React.FormEvent<HTMLFormElement> - Form submission event
   */
  const onBtnClick: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault(); // Prevent form's default submission
    logAttempt(username, password); // Log the credentials
    loginRequest(username, password); // Initiate the login request
  };

  /**
   * Sends a login request to the server.
   * @param username string - Entered username
   * @param password string - Entered password
   */
  const loginRequest = (username: string, password: string) => {
    setIsLoading(true);
    setError(null); // Reset error state

    const requestData = {
      data: encryptData({ username, password }), // Encrypt credentials before sending
    };

    fetch('/api/accounts/login', {
      method: 'PUT',
      body: JSON.stringify(requestData),
      headers: { 'Content-Type': 'application/json' }, // Specify JSON content type
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status >= 400 && response.status < 500) {
            return response.json(); // Handle client-side errors
          }
          throw new Error('Unknown Error'); // Handle server-side errors
        }
        return response.json();
      })
      .then((resBody) => {
        if (resBody.message) {
          setError(resBody.message); // Display server-provided error messages
        } else {
          const account = resBody.result as Account;
          dispatch({ type: 'SET_LOGGED_ACCOUNT', payload: account }); // Set logged-in account in context
          logAccount(account); // Log account details locally
          router.push('/'); // Redirect to the home page
        }
      })
      .catch(() => {
        setError('An error occurred. Please try again.'); // Handle unexpected errors
      })
      .finally(() => {
        setIsLoading(false); // Reset loading state
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-700">
      <div className="bg-gray-200 dark:bg-gray-500 p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center mb-4 text-black">Login</h1>

        {/* Display error messages if any */}
        {error && (
          <div className="mb-4 text-red-500 text-sm">
            <p>{error}</p>
          </div>
        )}

        {/* Login form */}
        <form onSubmit={onBtnClick}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter your username"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-2 flex items-center text-gray-500 focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? mySvgs.eyeOpen_icon : mySvgs.eyeClosed_icon}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full ${myStyles.button_blue} py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-400`}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Registration link */}
        <div className="mt-4 text-center">
          <p className="text-sm dark:text-gray-200 text-gray-600">
            Don&apos;t have an account? <a href="/register" className="text-green-600 dark:text-green-300">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
