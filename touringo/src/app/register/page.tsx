"use client"

import { useAppContext } from '@/context/MainContext';
import { Account } from '@/utils/classes';
import { encryptData } from '@/utils/utils';
// src/app/login/page.tsx
import React from 'react';


const RegisterPage = () => {
  const {dispatch} = useAppContext();

  const onBtnClick: React.MouseEventHandler<HTMLButtonElement> = (e)=>{
    e.preventDefault();
    const testAccount = new Account("bob","bobby", "Ron", "BIOOOOOOOOOOOOOO", "NOTHING!");
    registerRequest(testAccount)
    // loginRequest("admin","adminPass");
  }
  const registerRequest = (newAccount: Account) => {
    fetch('/api/accounts/register', {
        method: 'POST',
        body: JSON.stringify(
          {data:encryptData(
            {
              account: newAccount
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
          console.log(`Account Registered: ${account.username}`);
          console.log(account);
          dispatch({type:'SET_LOGGED_ACCOUNT', payload:account})
        }
      }).catch((err)=>{
        console.log(err);
      })
      
  }

  return (
    <div>
      <h1>Welcome to the Register Page!</h1>
      <button onClick={onBtnClick}>Click me!</button>
    </div>
  );
};

export default RegisterPage;
