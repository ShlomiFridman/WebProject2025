import { cancelEvent } from "../../events_module";
import { NextResponse } from "next/server";

// PATCH - cancel event - url-params: event id
type Params = {
  event_id: number;
} 

/**
 * Handles the PATCH request to cancel an event by its event_id.
 * 
 * Validates the provided `event_id`, then attempts to cancel the event using the 
 * `cancelEvent` function. Responds with appropriate success or error messages 
 * depending on the outcome.
 * 
 * @param request The incoming request object.
 * @param params The URL parameters, containing the `event_id`.
 * @returns A JSON response indicating success or failure.
 */
export async function PATCH(request: Request, { params }: { params: Promise<Params> }) {
  const { event_id } = await params;

  // Validate event_id
  if (!event_id || isNaN(event_id) || event_id < 100) {
    return NextResponse.json(
        { message: "Invalid event_id data" },
        { status: 400 } // Bad Request
    );
  }

  try {
    // Attempt to cancel the event
    const deleteRes = await cancelEvent(event_id);

    if (!deleteRes) {
      console.log("Events - event was already cancelled or unknown id");
      return NextResponse.json(
        { message: "Event was already cancelled or unknown id" },
        { status: 400 } // Bad Request
      );
    }

    // Successful cancellation
    return NextResponse.json(
      {}, 
      { status: 200 } // Success
    );

  } catch (err) {
    console.log("Events - Got error during cancelEvent process", err);
    return NextResponse.json(
      { message: "Error trying to cancel event" }, 
      { status: 500 } // Internal Server Error
    );
  }
}
