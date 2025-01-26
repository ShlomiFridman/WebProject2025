import { TR_Event } from "@/utils/classes";
import { getEventsByCreator } from "../../events_module";
import { NextResponse } from "next/server";

/**
 * Handles the GET request to fetch events created by a specific user.
 * 
 * If the `username` parameter is missing, a 400 status code is returned with an
 * error message. If the `username` is valid, the function fetches events created by 
 * that user and returns them in the response. If no events are found, a 500 error is 
 * returned.
 * 
 * @param request The HTTP request object
 * @param params The URL parameters, expected to contain the username
 * @returns A JSON response containing the events or an error message
 */
type Params = {
  username: string;
}

export async function GET(request: Request, { params }: { params: Promise<Params> }) {
  const { username } = await params;

  // Validate the presence of the username
  if (!username) {
    return NextResponse.json(
      { message: "Missing username" },
      { status: 400 } // Bad Request
    );
  }

  let eventsRes: TR_Event[];

  try {
    // Fetch events created by the specified username
    eventsRes = await getEventsByCreator(username);

    // If no events are found, log an error and return a 500 status code
    if (eventsRes == null) {
      console.log("Events - Got null in get request from module");
      return NextResponse.json(
        { message: "Error during GET request" },
        { status: 500 } // Internal Server Error
      );
    }

    // Return the events with a success status code
    return NextResponse.json(
      { result: eventsRes },
      { status: 200 } // OK
    );
  } catch (err) {
    // Log any errors during the process and return a 500 error
    console.log("Events - Got error during getEvents process", err);
    return NextResponse.json(
      { message: "Error during GET request" },
      { status: 500 } // Internal Server Error
    );
  }
}
