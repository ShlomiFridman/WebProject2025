import { NextResponse } from 'next/server';
import { verifyAccount, registerAccount } from './users_module';

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
        const loggedAccount = await verifyAccount(username, pass);
        if (loggedAccount == null){
            return NextResponse.json({
                message:"Username or password aren't correct"
            },
                {status: 401} // Unauthorized
            );
        }
        return NextResponse.json({}, {status: 200})
    } catch (err){
        return NextResponse.json({
            message: "Error occured during login process"
        }, {status: 500})
    }
}

export async function POST(request: Request){
    try{
        const reqBody = await request.json();
        const account = reqBody.account;
        const loggedAccount = await registerAccount(account);
        if (loggedAccount == 422){
            return NextResponse.json({
                message:"username already taken"
            },
                {status: 422 } // Not Acceptable
            );
        }
        return NextResponse.json({
            account: loggedAccount
        }, {status: 200})
    } catch (err){
        return NextResponse.json({
            message: "Error occured during register process"
        }, {status: 500})
    }
}