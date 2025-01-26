import { TR_Event } from "@/utils/classes";
import { getEventById } from "../../events_module";
import { NextResponse } from "next/server";

/**
 * Handles the GET request to fetch a specific event by its ID.
 * 
 * If the `id` parameter is invalid or missing, a 400 status code is returned with
 * an error message. If the event is found, it is returned in the response with a 200 
 * status. If no event is found, a 204 status code with no content is returned.
 * 
 * @param request The HTTP request object
 * @param params The URL parameters, expected to contain the event id
 * @returns A JSON response with the event data or an error message
 */
type Params = {
  id: number;
}

export async function GET(request: Request, { params }: { params: Promise<Params> }) {
  const { id } = await params;

  // Check if the id is valid
  if (!id || isNaN(id)) {
    return NextResponse.json(
      { message: "Missing or invalid event_id" },
      { status: 400 } // Bad Request
    );
  }

  let eventRes: TR_Event;

  try {
    // Fetch the event by its ID
    eventRes = await getEventById(id);

    // If the event does not exist, return 204 (No Content)
    if (eventRes == null) {
      return new NextResponse(null, { status: 204 }); // No Content
    }

    // Return the event data with a success status
    return NextResponse.json(
      { result: eventRes },
      { status: 200 } // OK
    );
  } catch (err) {
    // Handle any errors that occur during the process
    console.log("Events - Got error during getEvents process", err);
    return NextResponse.json(
      { message: "Error during GET request" },
      { status: 500 } // Internal Server Error
    );
  }
}
