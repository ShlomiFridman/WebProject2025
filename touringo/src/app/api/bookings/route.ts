import { NextResponse } from 'next/server';
import { getBookingsByUser, postNewBooking, deleteBookingById } from './bookings_module';

// get bookings by username - url-params: username
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const username = searchParams.get('username'); // get username=? from URL as String

        if (!username) {
            return NextResponse.json(
                { message: "Bad Request" },
                { status: 400 } // Bad Request
            );
        }

        const bookings = await getBookingsByUser(username);
        return NextResponse.json(
            {result: bookings}, 
            { status: 200 }); // Success
    } catch (err) {
        console.error("Bookings GET - Error fetching bookings:", err);
        return NextResponse.json(
            { message: "Error occurred while fetching bookings" },
            { status: 500 } // Internal Server Error
        );
    }
}

// create new booking - body-params: booking (type: Booking)
export async function POST(request: Request) {
    try {
        const reqBody = await request.json();

        // Normalize data
        const booking = reqBody.booking;

        // Validate the normalized booking data
        if (!booking) {
          return NextResponse.json(
              { message: "Invalid booking data" },
              { status: 400 } // Bad Request
          );
      }

      // Create the booking
      const createdBooking = await postNewBooking(booking);

      console.log("Booking successfully created:", createdBooking);

      return NextResponse.json(
        {result: createdBooking}, 
        {status: 201}); // Created
  } catch (err) {
      console.error("Bookings POST - Error creating a new booking:", err);
      return NextResponse.json(
          { message: "Error occurred while creating the booking" },
          { status: 500 } // Internal Server Error
      );
  }
}

// remove booking by it's booking_id - url-params: booking_id
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const booking_id_string = searchParams.get('booking_id');
        const booking_id = Number(booking_id_string);

        if (!booking_id_string) {
            return NextResponse.json(
                { message: "Booking ID is missing" },
                { status: 400 } // Bad Request
            );
        }

        const result = await deleteBookingById(booking_id);
        if (!result) {
            return NextResponse.json(
                { message: "Booking not found or already deleted" },
                { status: 400 } // Not Found
            );
        }

        return NextResponse.json(
            { message: "Booking deleted successfully" }, 
            { status: 200 }); // Success
    } catch (err) {
        console.error("DELETE - Error deleting booking:", err);
        return NextResponse.json(
            { message: "Error occurred while deleting the booking" },
            { status: 500 } // Internal Server Error
        );
    }
}
