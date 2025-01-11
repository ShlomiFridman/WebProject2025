import { NextResponse } from 'next/server';
import { registerAccount } from './users_module';


// register user - body-params: account (type: Account)
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
            result: loggedAccount
        }, {status: 200})
    } catch (err){
        console.error('Register post - Other error:', err);
        return NextResponse.json({
            message: "Error occured during register process"
        }, {status: 500})
    }
}

// TODO add PUT request to update Account data. body-param: username (type: string), updatedAccount (type: Account)

