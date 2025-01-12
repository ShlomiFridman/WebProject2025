import { NextResponse } from 'next/server';
import { registerAccount } from '../users_module';
import { Account } from '@/utils/classes';
import { decryptData } from '@/utils/utils';


// register user
interface RegisterBodyParam{
    account: Account
}
export async function POST(request: Request){
    try{
        const reqBody = await request.json();
        const data = decryptData(reqBody.data) as RegisterBodyParam;
        const account = (!data) ? null : data.account;
        if (!account)
            return NextResponse.json({
                message:"missing account data"
            },
                {status: 400 }
            );
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
