// src/app/api/login/route.ts
  
import { TR_Event } from "@/utils/classes";
import { createEvent, deleteEvent, getAllEvents, getEventsByCreator, updateEvent } from "./events_module";
import { NextResponse } from "next/server";
import { decryptData } from "@/utils/utils";

// get events - url-params: username
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
    console.log("Events - Got error durring getEvents process", err)
    return NextResponse.json(
      {message: "Error durring GET request"}, 
      { status: 500 }); // somehow got null array, it's a bug
  }
}

// create new event - body-params: newEvent (type: TR_Event)
interface CreateBodyParam{
  newEvent: TR_Event;
}
export async function POST(request: Request) {
    try {
        const reqBody = await request.json();
        const data = decryptData(reqBody.data) as CreateBodyParam;

        // Normalize data
        const newEvent = (!data) ? null : reqBody.newEvent;

        // Validate the normalized event data
        if (!newEvent) {
          return NextResponse.json(
              { message: "Invalid event data" },
              { status: 400 } // Bad Request
          );
      }

      // Create the event
      const createdEvent = await createEvent(newEvent);

      console.log("Event successfully created:", createdEvent);

      return NextResponse.json(
        {result: createdEvent}, 
        {status: 201}); // Created
  } catch (err) {
      console.error("Event POST - Error creating a new event:", err);
      return NextResponse.json(
          { message: "Error occurred while creating the event" },
          { status: 500 } // Internal Server Error
      );
  }
}

// PUT - update event - body-params: event_id (type: Number), updatedEvent (type: TR_Event)
interface UpdateBodyParams{
  event_id: number;
  updatedEvent: TR_Event;
}
export async function PUT(request: Request) {
  try {
      const reqBody = await request.json();
      const data = decryptData(reqBody.data) as UpdateBodyParams;

      // Normalize data
      const event_id = (!data) ? null : Number(reqBody.event_id);
      const updatedEvent = (!data) ? null : reqBody.updatedEvent;

      // Validate the normalized event data
      if (!event_id || isNaN(event_id) || event_id<1) {
        return NextResponse.json(
            { message: "Invalid event_id data" },
            { status: 400 } // Bad Request
        );
      }
      else if (!updatedEvent){
        return NextResponse.json(
            { message: "Invalid updatedEvent data" },
            { status: 400 } // Bad Request
        );
      }

      // Create the event
      const updateRes = await updateEvent(event_id, updatedEvent);

      console.log("Event successfully updated:", updateRes);

      return NextResponse.json(
        {result: updateRes}, 
        {status: 200}); // success
  } catch (err) {
      console.error("Event PUT - Error updating the event:", err);
      return NextResponse.json(
          { message: "Error occurred while updating the event" },
          { status: 500 } // Internal Server Error
      );
  }
}

// DELETE - remove event - url-params: event id
export async function DELETE(request: Request){
  const { searchParams } = new URL(request.url);
  const event_id = Number(searchParams.get("event_id"));

  if (isNaN(event_id) || event_id<1) {
    return NextResponse.json(
        { message: "Invalid event_id data" },
        { status: 400 } // Bad Request
    );
  }

  try{

    const deleteRes = await deleteEvent(event_id);
    if (!deleteRes){
      console.log("Events - event was already deleted or unknown id")
      return NextResponse.json(
        {message: "Event was already deleted or unknown id"}, 
        { status: 400 });
    }
    return NextResponse.json(
      {}, 
      { status: 200 }); // success

  } catch(err){
    console.log("Events - Got error durring deleteEvent process", err)
    return NextResponse.json(
      {message: "Error durring event DELETE request"}, 
      { status: 500 }); // somehow got null array, it's a bug
  }
}
