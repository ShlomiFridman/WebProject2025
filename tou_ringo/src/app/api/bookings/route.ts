// src/app/api/login/route.ts

import { NextResponse } from 'next/server';
import { getBookingsByUser, postNewBooking, deleteBookingById } from './bookings_module';

// GET - Fetch bookings by username
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
        if (!bookings || bookings.length === 0) {
            return NextResponse.json(
                { message: "No bookings found for the user" },
                { status: 404 } // Not Found
            );
        }

        return NextResponse.json(bookings, { status: 200 }); // Success
    } catch (err) {
        console.error("GET - Error fetching bookings:", err);
        return NextResponse.json(
            { message: "Error occurred while fetching bookings" },
            { status: 500 } // Internal Server Error
        );
    }
}

// POST - Create a new booking
export async function POST(request: Request) {
    try {
        const reqBody = await request.json();

        // Normalize data
        const booking = {
          booking_id: parseInt(reqBody.booking_id?.$numberInt || reqBody.booking_id),
          creator_username: reqBody.creator_username,
          event_id: parseInt(reqBody.event_id?.$numberInt || reqBody.event_id),
          date: reqBody.date,
          amount: parseInt(reqBody.amount?.$numberInt || reqBody.amount),
        };

        // Validate the normalized booking data
        if (!booking.booking_id || !booking.creator_username || !booking.event_id || !booking.date || !booking.amount) {
          return NextResponse.json(
              { message: "Invalid booking data" },
              { status: 400 } // Bad Request
          );
      }

      // Create the booking
      const createdBooking = await postNewBooking(booking);

      console.log("Booking successfully created:", createdBooking);

      return NextResponse.json(createdBooking, { status: 201 }); // Created
  } catch (err) {
      console.error("POST - Error creating a new booking:", err);
      return NextResponse.json(
          { message: "Error occurred while creating the booking" },
          { status: 500 } // Internal Server Error
      );
  }
}

// DELETE - Remove a booking by ID
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const booking_id_string = searchParams.get('booking_id');
        const booking_id = Number(booking_id_string);

        if (!booking_id) {
            return NextResponse.json(
                { message: "Booking ID is missing" },
                { status: 400 } // Bad Request
            );
        }

        const result = await deleteBookingById(booking_id);
        if (!result) {
            return NextResponse.json(
                { message: "Booking not found or already deleted" },
                { status: 404 } // Not Found
            );
        }

        return NextResponse.json({ message: "Booking deleted successfully" }, { status: 200 }); // Success
    } catch (err) {
        console.error("DELETE - Error deleting booking:", err);
        return NextResponse.json(
            { message: "Error occurred while deleting the booking" },
            { status: 500 } // Internal Server Error
        );
    }
}
