// src/app/api/login/route.ts

import { cancelEvent } from "../../events_module";
import { NextResponse } from "next/server";

// PATCH - cancel event - url-params: event id
type Params = {
  event_id: number;
} 
export async function PATCH(request: Request, { params }: { params:Promise<Params> }){
  const {event_id} = await params;

  if (!event_id || isNaN(event_id) || event_id<100) {
    return NextResponse.json(
        { message: "Invalid event_id data" },
        { status: 400 } // Bad Request
    );
  }

  try{

    const deleteRes = await cancelEvent(event_id);
    if (!deleteRes){
      console.log("Events - event was already cancelled or unknown id")
      return NextResponse.json(
        {message: "Event was already cancelled or unknown id"}, 
        { status: 400 });
    }
    return NextResponse.json(
      {}, 
      { status: 200 }); // success

  } catch(err){
    console.log("Events - Got error durring cancelEvent process", err)
    return NextResponse.json(
      {message: "Error trying to cancel event"}, 
      { status: 500 }); // somehow got null array, it's a bug
  }
}
