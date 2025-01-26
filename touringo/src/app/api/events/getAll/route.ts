import { TR_Event } from "@/utils/classes";
import { getAllEvents } from "../events_module";
import { NextResponse } from "next/server";

/**
 * Handles the GET request to fetch events.
 * 
 * If the `username` parameter is provided, it fetches the events created by the 
 * specified user. Otherwise, it retrieves all events. Returns a 500 status code if 
 * any error occurs during the retrieval process.
 * 
 * @returns A JSON response containing either the events data or an error message.
 */
export async function GET() {
  let eventsRes: TR_Event[];

  try {
    // Fetch all events using the getAllEvents function
    eventsRes = await getAllEvents();

    // Handle the case where the result is null
    if (eventsRes == null) {
      console.log("Events - Got null in get request from module");
      return NextResponse.json(
        { message: "Error during GET request" },
        { status: 500 } // Internal Server Error
      );
    }

    // Return the fetched events with a success status
    return NextResponse.json(
      { result: eventsRes },
      { status: 200 } // OK
    );
  } catch (err) {
    console.log("Events - Got error during getEvents process", err);
    // Return an error message if an error occurs during the process
    return NextResponse.json(
      { message: "Error during GET request" },
      { status: 500 } // Internal Server Error
    );
  }
}
