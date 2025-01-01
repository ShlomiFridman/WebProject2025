// src/app/api/login/route.ts
  
import { TR_Event } from "@/utils/classes";
import { getAllEvents, getEventsByCreator } from "./events_module";
import { NextResponse } from "next/server";

// TODO GET - get events - params: username
//		if the username is empty (or null) get all events
//		else get the events created by the username
export async function GET(request: Request){
  const { searchParams } = new URL(request.url);
  const creator = searchParams.get("creator_username");
  let eventsRes : TR_Event[];
  try{
    if (creator){
      eventsRes = await getEventsByCreator(creator);
    }
    else{
      eventsRes = await getAllEvents();
    }
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
    console.log("Events - Got error durring getEvents process")
    return NextResponse.json(
      {message: "Error durring GET request"}, 
      { status: 500 }); // somehow got null array, it's a bug
  }
}

// TODO POST - create event - params: event object

// TODO PUT - update event - params: event id, event object

// TODO DELETE - remove event - params: event id
