import { NextResponse } from 'next/server';
import { getBookingsByUser } from '../../bookings_module';

/**
 * Type representing the URL parameters for fetching bookings by username.
 */
type Params = {
  username: string;
};

/**
 * Handles the GET request for fetching bookings by username.
 * 
 * Validates the presence of the username parameter, fetches the bookings associated with the username,
 * and responds with the bookings or an appropriate error message.
 * 
 * @param request - The incoming HTTP request object.
 * @param params - The URL parameters containing the `username`.
 * @returns A JSON response with the fetched bookings or an error message with the appropriate status code.
 */
export async function GET(request: Request, { params }: { params: Promise<Params> }) {
  try {
    // Extract and validate the username from URL parameters
    const { username } = await params;

    if (!username) {
      return NextResponse.json(
        { message: "Bad Request" },
        { status: 400 } // Bad Request
      );
    }

    // Fetch bookings associated with the username
    const bookings = await getBookingsByUser(username);

    // Return success response with the bookings
    return NextResponse.json(
      { result: bookings },
      { status: 200 } // Success
    );
  } catch (err) {
    console.error("Bookings GET - Error fetching bookings:", err);
    return NextResponse.json(
      { message: "Error occurred while fetching bookings" },
      { status: 500 } // Internal Server Error
    );
  }
}
