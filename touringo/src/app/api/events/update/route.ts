// src/app/api/login/route.ts
  
import { TR_Event } from "@/utils/classes";
import { updateEvent } from "../events_module";
import { NextResponse } from "next/server";
import { decryptData } from "@/utils/utils";

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
