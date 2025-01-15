// src/app/api/login/route.ts
  
import { TR_Event } from "@/utils/classes";
import { createEvent } from "../events_module";
import { NextResponse } from "next/server";
import { decryptData } from "@/utils/utils";

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
