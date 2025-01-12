// src/app/api/login/route.ts
  
import { TR_Event } from "@/utils/classes";
import { getAllEvents } from "../events_module";
import { NextResponse } from "next/server";

// get events - url-params: username
//		if the username is empty (or null) get all events
//		else get the events created by the username
export async function GET(){
  let eventsRes : TR_Event[];
  try{
    eventsRes = await getAllEvents();
    if (eventsRes == null){
      console.log("Events - Got null in get request from module")
      return NextResponse.json(
        {message: "Error during GET request"}, 
        { status: 500 }); // somehow got null array, it's a bug
    }
    return NextResponse.json(
      {result: eventsRes}, 
      { status: 200 }); // success
  } catch(err){
    console.log("Events - Got error during getEvents process", err)
    return NextResponse.json(
      {message: "Error during GET request"}, 
      { status: 500 }); // somehow got null array, it's a bug
  }
}
