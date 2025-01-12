import { NextResponse } from "next/server";
import { updateAlertToRead } from "../../alerts_module";

// PUT updateAlert
type Params = {
    alert_id: number;
}
export async function PATCH(request: Request, {params}: {params:Params}){
    const { alert_id } = await params;
    
    if (!alert_id || isNaN(alert_id) || alert_id<100){
        return NextResponse.json(
            { message: "invalid alert id" },
            { status: 400 } // Bad Request
        );
    }
    try{
        const updateRes = await updateAlertToRead(alert_id);
        if (!updateRes){
            return NextResponse.json(
                {message: "There isn't an alert with that id"},
                {status: 400}
            );
        }
        return NextResponse.json(
            {}, 
            {status: 200}); // updated
    } catch (err){
        console.error("Alerts PATCH - Error marking alert as read:", err);
        return NextResponse.json(
            { message: "Error occurred while marking the alert as read" },
            { status: 500 } // Internal Server Error
        );
    }
}
