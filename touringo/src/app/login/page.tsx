"use client"

import { useAppContext } from '@/context/MainContext';
import { Account } from '@/utils/classes';
import { encryptData } from '@/utils/utils';
// src/app/login/page.tsx
import React from 'react';


const LoginPage = () => {
  const {dispatch} = useAppContext();

  const onBtnClick: React.MouseEventHandler<HTMLButtonElement> = (e)=>{
    e.preventDefault();
    loginRequest("bob","bobby");
  }
  const loginRequest = (username: string, password: string) => {
    fetch('/api/accounts/login', {
        method: 'PUT',
        body: JSON.stringify(
          {data:encryptData(
            {
              username: username, 
              password: password
            })
          }
        )
      }).then((response)=>{
        const badRequestError = (400 <= response.status && response.status < 500);
        if (!response.ok && !badRequestError) {
          alert(response.statusText);
          throw new Error("Unknown Error");
        }
        return response.json();
      }).then((resBody)=>{
        if (resBody.message){
          alert(resBody.message);
        } else{
          const account = resBody.result as Account;
          console.log(`Logged account set: ${username}`);
          dispatch({type:'SET_LOGGED_ACCOUNT', payload:account})
        }
      }).catch((err)=>{
        console.log(err);
      })
      
  }

  return (
    <div>
      <h1>Welcome to the Login Page!</h1>
      <button onClick={onBtnClick}>Click me!</button>
    </div>
  );
};

export default LoginPage;
