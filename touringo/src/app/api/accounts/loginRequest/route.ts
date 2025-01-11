

// TODO solve password protection, currently it is through URL which is bad 

import { NextResponse } from "next/server";
import { verifyAccount } from "../users_module";
import { Account } from "@/utils/classes";

// TODO use HTTPS format to send information in client side, POST
// check login - url-params: username, password
export async function GET(request: Request){
    try{
        const { searchParams } = new URL(request.url);
        const username = searchParams.get("username")
        const pass = searchParams.get("password")
        if (!username || !pass){
            return NextResponse.json(
                {message: "Username or password are missing"},
                {status: 400} // Bad Request
            )
        }
        const loginRes = await verifyAccount(username, pass) as unknown;
        if (loginRes == null){
            return NextResponse.json({
                message:"Username or password aren't correct"
            },
                {status: 401} // Unauthorized
            );
        }
        const loggedAccount = loginRes as Account
        loggedAccount.password = "######"
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