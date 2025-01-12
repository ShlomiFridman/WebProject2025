import { NextResponse } from 'next/server';
import { postNewBooking } from '../bookings_module';
import { Booking } from '@/utils/classes';
import { decryptData } from '@/utils/utils';

// create new booking - body-params: booking (type: Booking)
interface CreateBodyParam{
    booking: Booking;
}
export async function POST(request: Request) {
    try {
        const reqBody = await request.json();
        const data = decryptData(reqBody.data) as CreateBodyParam;
        
        // Normalize data
        const booking = (!data) ? null : data.booking;

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

