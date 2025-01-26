import { NextResponse } from 'next/server';
import { postNewBooking } from '../bookings_module';
import { Booking } from '@/utils/classes';
import { decryptData } from '@/utils/utils';

/**
 * Interface representing the structure of the create booking request body parameters.
 */
interface CreateBodyParam {
  booking: Booking;
}

/**
 * Handles the POST request for creating a new booking.
 * 
 * Validates and decrypts the incoming request body, normalizes the booking data,
 * and attempts to create the booking in the database. Responds with the created
 * booking details or an appropriate error message.
 * 
 * @param request - The incoming HTTP request object.
 * @returns A JSON response with the created booking or an error message with the appropriate status code.
 */
export async function POST(request: Request) {
  try {
    // Parse the request body
    const reqBody = await request.json();

    // Decrypt and extract booking data
    const data = decryptData(reqBody.data) as CreateBodyParam;
    const booking = (!data) ? null : data.booking;

    // Validate the presence of booking data
    if (!booking) {
      return NextResponse.json(
        { message: "Invalid booking data" },
        { status: 400 } // Bad Request
      );
    }

    // Attempt to create the booking
    const createdBooking = await postNewBooking(booking);
    console.log("Booking successfully created:", createdBooking);

    // Return success response with the created booking
    return NextResponse.json(
      { result: createdBooking },
      { status: 201 } // Created
    );
  } catch (err) {
    console.error("Bookings POST - Error creating a new booking:", err);
    return NextResponse.json(
      { message: "Error occurred while creating the booking" },
      { status: 500 } // Internal Server Error
    );
  }
}
