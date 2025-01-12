import { NextResponse } from "next/server";
import { postNewAlert } from "../alerts_module";
import { TR_Alert } from "@/utils/classes";
import { decryptData } from "@/utils/utils";


// POST create alert
interface createBodyParams{
    username: string;
    msg: string;
}
export async function POST(request: Request){
    const reqBody = await request.json();
    const data = decryptData(reqBody.data) as createBodyParams;
    const username = (!data) ? null : data.username;
    const msg = (!data) ? null : data.msg;
    
    if (!username){
        return NextResponse.json(
            { message: "Missing alert username" },
            { status: 400 } // Bad Request
        );
    }
    if (!msg){
        return NextResponse.json(
            { message: "Missing alert message" },
            { status: 400 } // Bad Request
        );
    }
    try{
        const newAlert = await postNewAlert(username, msg) as TR_Alert;
        
      return NextResponse.json(
        {result: newAlert}, 
        {status: 201}); // Created
    } catch (err){
        console.error("Alerts POST - Error creating the new alert:", err);
        return NextResponse.json(
            { message: "Error occurred while creating the new alert" },
            { status: 500 } // Internal Server Error
        );
    }
}
