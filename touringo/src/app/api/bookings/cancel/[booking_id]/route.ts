import { NextResponse } from 'next/server';
import { cancelBookingById } from '../../bookings_module';

/**
 * Type representing the URL parameters for the booking cancellation request.
 */
type Params = {
  booking_id: number;
};

/**
 * Handles the PATCH request for canceling a booking by its booking ID.
 * 
 * Validates the booking ID from the URL parameters and attempts to cancel the corresponding booking.
 * Responds with success or an appropriate error message.
 * 
 * @param request - The incoming HTTP request object.
 * @param params - The URL parameters containing the `booking_id`.
 * @returns A JSON response indicating success or failure with the corresponding status code.
 */
export async function PATCH(request: Request, { params }: { params: Promise<Params> }) {
  try {
    // Extract and validate booking ID from URL parameters
    const { booking_id } = await params;

    if (!booking_id || isNaN(booking_id) || booking_id < 100) {
      return NextResponse.json(
        { message: "Booking ID is missing or invalid" },
        { status: 400 } // Bad Request
      );
    }

    // Attempt to cancel the booking
    const result = await cancelBookingById(booking_id);
    if (!result) {
      return NextResponse.json(
        { message: "Booking not found or already cancelled" },
        { status: 400 } // Not Found
      );
    }

    // Return success response
    return NextResponse.json(
      {}, // Empty response body for success
      { status: 200 } // Success
    );
  } catch (err) {
    console.error("PATCH - Error canceling booking:", err);
    return NextResponse.json(
      { message: "Error occurred while canceling the booking" },
      { status: 500 } // Internal Server Error
    );
  }
}
