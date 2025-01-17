import { NextResponse } from 'next/server';
import { updateAccount } from '../accounts_module';
import { Account } from '@/utils/classes';
import { decryptData } from '@/utils/utils';


// PUT request for Account update
interface UpdateBodyParam{
    username: string;
    updatedAccount: Account;
}
export async function PUT(request: Request){
    try{
        const reqBody = await request.json();
        const data = decryptData(reqBody.data) as UpdateBodyParam;
        const username = (!data) ? null : data.username;
        const account = (!data) ? null : data.updatedAccount;
        if (!username)
            return NextResponse.json({
                message:"missing username"
            },
                {status: 400 }
            );
        if (!account)
            return NextResponse.json({
                message:"missing updated account data"
            },
                {status: 400 }
            );
        const updateRes = await updateAccount(username, account) as boolean;
        if (!updateRes){
            return NextResponse.json({
                message:"Unknown account username"
            },
                {status: 422 } // Not Acceptable
            );
        }
        account.password = "##########";
        account.username = username;
        return NextResponse.json({
            result: account
        }, {status: 200})
    } catch (err){
        console.error('Update PUT - Other error:', err);
        return NextResponse.json({
            message: "Error occured during update process"
        }, {status: 500})
    }
}