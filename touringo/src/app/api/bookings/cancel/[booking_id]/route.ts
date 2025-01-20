import { NextResponse } from 'next/server';
import { cancelBookingById } from '../../bookings_module';

// remove booking by it's booking_id - url-params: booking_id
type Params = {
    booking_id: number;
}
export async function PATCH(request: Request, { params }: { params:Promise<Params> }) {
    try {
        const {booking_id} = await params;

        if (!booking_id || isNaN(booking_id) || booking_id<100) {
            return NextResponse.json(
                { message: "Booking ID is missing" },
                { status: 400 } // Bad Request
            );
        }

        const result = await cancelBookingById(booking_id);
        if (!result) {
            return NextResponse.json(
                { message: "Booking not found or already cancelled" },
                { status: 400 } // Not Found
            );
        }

        return NextResponse.json(
            // { message: "Booking cancelled successfully" }, 
            {},
            { status: 200 }); // Success
    } catch (err) {
        console.error("PATCH - Error canceling booking:", err);
        return NextResponse.json(
            { message: "Error occurred while canceling the booking" },
            { status: 500 } // Internal Server Error
        );
    }
}
