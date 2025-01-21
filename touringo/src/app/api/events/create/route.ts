import { TR_Event } from "@/utils/classes";
import { createEvent } from "../events_module";
import { NextResponse } from "next/server";
import { decryptData } from "@/utils/utils";

// CreateBodyParam interface that describes the expected decrypted structure
interface CreateBodyParam {
  event: TR_Event; // The decrypted data contains 'event' as the key
}

export async function POST(request: Request) {
  try {
    const reqBody = await request.json();
    
    // Decrypt data and assert it to the correct type
    const decryptedData = decryptData(reqBody.data) as CreateBodyParam;

    console.log("Decrypted data:", decryptedData);

    // Access the 'event' property from decryptedData
    const newEvent = decryptedData?.event;

    console.log("Extracted newEvent:", newEvent);

    // Validate the newEvent data
    if (!newEvent) {
      return NextResponse.json(
        { message: "Invalid event data, 'newEvent' not found" },
        { status: 400 } // Bad Request
      );
    }

    // Create the event
    const createdEvent = await createEvent(newEvent);

    console.log("Event successfully created:", createdEvent);

    return NextResponse.json(
      { result: createdEvent },
      { status: 201 } // Created
    );
  } catch (err) {
    console.error("Event POST - Error creating a new event:", err);
    return NextResponse.json(
      { message: "Error occurred while creating the event" },
      { status: 500 } // Internal Server Error
    );
  }
}
