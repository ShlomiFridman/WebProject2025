

// TODO solve password protection, currently it is through URL which is bad 

import { NextResponse } from "next/server";
import { verifyAccount } from "../users_module";
import { Account } from "@/utils/classes";
import { decryptData } from "@/utils/utils";

// TODO use HTTPS format to send information in client side, POST
// check login - body-params: username (type: String), password (type: String)
interface LoginBodyParams{
    username: string;
    password: string;
}
export async function PUT(request: Request){
    try{
        const reqBody = await request.json();
        const data = decryptData(reqBody.data) as LoginBodyParams;
        const username = (!data) ? null : data.username;
        const pass = (!data) ? null : data.password;
        if (!username || !pass){
            return NextResponse.json(
                {message: "Username or password are missing"},
                {status: 400} // Bad Request
            )
        }
        const loginRes = await verifyAccount(username, pass) as unknown;
        if (loginRes == null){
            return NextResponse.json({
                message:"Username or password incorrect"
            },
                {status: 401} // Unauthorized
            );
        }
        const loggedAccount = loginRes as Account
        loggedAccount.password = "##########"
        return NextResponse.json(
            {result: loggedAccount},
            {status: 200})
    } catch (err){
        console.error('Login GET - Other error:', err);
        return NextResponse.json({
            message: "Error occured during login process"
        }, {status: 500})
    }
}