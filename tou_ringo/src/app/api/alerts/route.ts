import { NextResponse } from "next/server";
import { getByUsername as getAlertsByUsername, postNewAlert, updateAlertToRead } from "./alerts_module";
import { TR_Alert } from "@/utils/classes";

// GET returns the alerts for the given username - url-params: username
export async function GET(request: Request){
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");
    if (!username){
        return NextResponse.json(
            {message: "Missing username"},
            {status: 400}
        );
    }
    // return all alerts by user
    try{
        const alerts = await getAlertsByUsername(username) as Array<TR_Alert>;
        return NextResponse.json(
            {result: alerts},
            {status: 200}
        );
    } catch (err){
        console.log("Alerts GET - error during get process");
        return NextResponse.json({},{status: 500});
    }
}

// POST create alert - body-params: username (type: string), msg (type: string)
export async function POST(request: Request){
    const reqBody = await request.json();

    const username = reqBody.username;
    const msg = reqBody.msg;
    
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

// PUT updateAlert - body-params: alert (type: number)
export async function PUT(request: Request){
    const reqBody = await request.json();

    const id = Number(reqBody.alert_id);
    
    if (isNaN(id) || id<100){
        return NextResponse.json(
            { message: "invalid alert id" },
            { status: 400 } // Bad Request
        );
    }
    try{
        const updateRes = await updateAlertToRead(id);
        if (!updateRes){
            return NextResponse.json(
                {message: "There isn't an alert with the given id"},
                {status: 400}
            );
        }
        return NextResponse.json(
            {}, 
            {status: 200}); // updated
    } catch (err){
        console.error("Alerts POST - Error creating the new alert:", err);
        return NextResponse.json(
            { message: "Error occurred while creating the new alert" },
            { status: 500 } // Internal Server Error
        );
    }
}
