// src/app/api/login/route.ts
  
import { TR_Event } from "@/utils/classes";
import { getEventById } from "../../events_module";
import { NextResponse } from "next/server";

// get events - url-params: username
//		if the username is empty (or null) get all events
//		else get the events created by the username
type Params = {
  id: number;
}
export async function GET(request: Request, { params }: { params:Params }) {
    const {id} = await params;
    if (!id && isNaN(id)) {
        return NextResponse.json(
            { message: "Missing or invalid event_id" },
            { status: 400 } // Bad Request
        );
    }
    let eventRes : TR_Event;
    try{
      eventRes = await getEventById(id);
      if (eventRes == null){
        return new NextResponse(
          null,
          {status: 204} // no content
        );
      }
      return NextResponse.json(
        {result: eventRes}, 
        { status: 200 }); // success
    } catch(err){
      console.log("Events - Got error durring getEvents process", err)
      return NextResponse.json(
        {message: "Error durring GET request"}, 
        { status: 500 }); // somehow got null array, it's a bug
    }
}
