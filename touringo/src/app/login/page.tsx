"use client"

import { useEffect, useState } from 'react';
import { useAppContext } from '@/context/MainContext';
import { Account } from '@/utils/classes';
import { encryptData } from '@/utils/utils';
import {logAccount} from "@/utils/util_client";
import React from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {

  // Local state for managing form input
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {dispatch} = useAppContext();

  useEffect(()=>{
    dispatch({type:'SET_LOGGED_ACCOUNT', payload:null});
    logAccount(null);
  },[dispatch]);

  // Handle form input changes
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // Function to log user details
  const logAttempt = (username: string, password: string) => {
    console.log('User Details:');
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
  };

  // Handle login button click
  const onBtnClick: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    logAttempt(username, password); // Log user details to console
    loginRequest(username, password);
  };

  const loginRequest = (username: string, password: string) => {
    setIsLoading(true);
    setError(null);

    // Prepare data for sending
    const requestData = { 
      data: encryptData({ username, password })
    };

    fetch('/api/accounts/login', {
      method: 'PUT',
      body: JSON.stringify(requestData),
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
          console.log(`Logged account set: ${username}`);
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
        <h1 className="text-2xl font-semibold text-center mb-4 text-black">Login</h1>

        {/* Error message */}
        {error && (
          <div className="mb-4 text-red-500 text-sm">
            <p>{error}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={onBtnClick}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Login button */}
          <button
            type='submit'
            disabled={isLoading}
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-400"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Optionally add a link to register or other actions */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">Don&apos;t have an account? <a href="/register" className="text-green-500">Register</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

