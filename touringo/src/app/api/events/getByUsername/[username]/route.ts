// src/app/api/login/route.ts
  
import { TR_Event } from "@/utils/classes";
import { getEventsByCreator } from "../../events_module";
import { NextResponse } from "next/server";

// get events - url-params: username
//		if the username is empty (or null) get all events
//		else get the events created by the username
type Params = {
  username: string;
}
export async function GET(request: Request, { params }: { params:Promise<Params> }) {
    const {username} = await params;
    if (!username) {
        return NextResponse.json(
            { message: "Missing username" },
            { status: 400 } // Bad Request
        );
    }
    let eventsRes : TR_Event[];
    try{
      eventsRes = await getEventsByCreator(username);
      if (eventsRes == null){
        console.log("Events - Got null in get request from module")
        return NextResponse.json(
          {message: "Error durring GET request"}, 
          { status: 500 }); // somehow got null array, it's a bug
      }
      return NextResponse.json(
        {result: eventsRes}, 
        { status: 200 }); // success
    } catch(err){
      console.log("Events - Got error durring getEvents process", err)
      return NextResponse.json(
        {message: "Error durring GET request"}, 
        { status: 500 }); // somehow got null array, it's a bug
    }
}
