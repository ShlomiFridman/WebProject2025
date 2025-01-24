"use client";

import { useState } from 'react';
import { useAppContext } from '@/context/MainContext';
import { Account } from '@/utils/classes';
import { encryptData } from '@/utils/utils';
import React from 'react';
import { logAccount } from '@/utils/util_client';
import { useRouter } from 'next/navigation';
import { myStyles } from '@/utils/styles';

const RegisterPage = () => {
  const { dispatch } = useAppContext();
  const router = useRouter();

  // Local state for managing form input
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  // const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle form input changes
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setEmail(e.target.value);
  // };

  // Handle register button click
  const onBtnClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const account: Account = new Account(username, password, username, "empty", "empty");
    console.log(account);
    registerRequest(account);
  };

  const registerRequest = (account: Account) => {
    setIsLoading(true);
    setError(null);

    fetch('/api/accounts/register', {
      method: 'POST', // Assuming it's a POST request for registration
      body: JSON.stringify({data: encryptData({ account:account })}),
      headers: {
        'Content-Type': 'application/json', // Ensure the backend understands the JSON body
      },
    })
      .then((response) => {
        const badRequestError = response.status >= 400 && response.status < 500;
        if (!response.ok && !badRequestError) {
          alert(response.statusText);
          throw new Error('Unknown Error');
        }
        return response.json();
      })
      .then((resBody) => {
        if (resBody.message) {
          setError(resBody.message);
        } else {
          const account = resBody.result as Account;
          console.log(`Registered account set: ${account.username}`);
          dispatch({ type: 'SET_LOGGED_ACCOUNT', payload: account });
          logAccount(account);
          router.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        setError('An error occurred. Please try again.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-700">
      <div className="bg-gray-200 dark:bg-gray-500 p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center mb-4 text-black">Register</h1>

        {/* Error message */}
        {error && (
          <div className="mb-4 text-red-500 text-sm">
            <p>{error}</p>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter your username"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> */}

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              {/* Password input */}
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
              />

              {/* Show/Hide button with SVG */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-2 flex items-center text-gray-500 focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.697 0-8.5-3.53-10-7a17.916 17.916 0 014.197-5.153M9.555 9.554a2.1 2.1 0 103 3M15.798 15.798c-1.332 1.332-3.531.346-5.798-1.926m2.223-5.032L19 5m0 0a17.916 17.916 0 01-4.197 5.153C12.53 10.396 14.47 12 15.798 15.798z"
                    />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13l4.197-5.153A17.908 17.908 0 0012 5c-4.697 0-8.5 3.53-10 7 1.5 3.47 5.303 7 10 7a17.916 17.916 0 004.197-5.153L15 13z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 8.94 7.234 6 12 6c4.697 0 8.5 3.53 10 7-1.5 3.47-5.303 7-10 7-4.717 0-8.232-3.159-9.524-6.938M3.051 3.05l17.898 17.898" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Register button */}
          <button
            onClick={onBtnClick}
            disabled={isLoading}
            className={myStyles.button_blue}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>

        {/* Optionally add a link to login or other actions */}
        <div className="mt-4 text-center">
          <p className="text-sm dark:text-gray-200 text-gray-600">Already have an account? <a href="/login" className="text-green-500">Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
