import { NextResponse } from 'next/server';
import { getBookingsByUser } from '../../bookings_module';

// get bookings by username - url-params: username
type Params = {
    username: string;
}
export async function GET(request: Request, { params }: { params:Promise<Params> }) {
    try {
        const {username} = await params;

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
