import { NextResponse } from "next/server";
import { getByUsername as getAlertsByUsername} from "../../alerts_module";
import { TR_Alert } from "@/utils/classes";

// GET returns the alerts for the given username - url-params: username
type Params = {
    username: string;
}
export async function GET(request: Request, {params}: {params:Promise<Params>}){
    const {username} = await params;
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
        console.log("Alerts GET - error during get process", err);
        return NextResponse.json({},{status: 500});
    }
}
