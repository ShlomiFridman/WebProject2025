import { TR_Event } from "@/utils/classes";
import { createEvent } from "../events_module";
import { NextResponse } from "next/server";
import { decryptData } from "@/utils/utils";

// CreateBodyParam interface that describes the expected decrypted structure
interface CreateBodyParam {
  event: TR_Event; // The decrypted data contains 'event' as the key
}

/**
 * Handles the POST request to create a new event.
 * 
 * This function processes the incoming request, decrypts the provided data, 
 * validates the event data, and attempts to create the new event using the 
 * `createEvent` function. It returns an appropriate response based on the result.
 * 
 * @param request The incoming POST request.
 * @returns A JSON response indicating success or failure.
 */
export async function POST(request: Request) {
  try {
    // Parse the request body and decrypt the data
    const reqBody = await request.json();
    const decryptedData = decryptData(reqBody.data) as CreateBodyParam;

    console.log("Decrypted data:", decryptedData);

    // Extract the 'event' from decrypted data
    const newEvent = decryptedData?.event;

    console.log("Extracted newEvent:", newEvent);

    // Validate the event data
    if (!newEvent) {
      return NextResponse.json(
        { message: "Invalid event data, 'newEvent' not found" },
        { status: 400 } // Bad Request
      );
    }

    // Create the event using the provided event data
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
