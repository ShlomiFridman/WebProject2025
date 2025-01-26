import { getReviewsByBookingId } from "../../reviews_module";
import { NextResponse } from "next/server";

// get events - url-params: username
//		if the username is empty (or null) get all events
//		else get the events created by the username
type Params = {
  booking_id: number;
}
export async function GET(request: Request, { params }: { params:Promise<Params> }) {
    const {booking_id} = await params;
    if (!booking_id || isNaN(booking_id) || booking_id<1) {
        return NextResponse.json(
            { message: "Missing event_id" },
            { status: 400 } // Bad Request
        );
    }
    try{
      const reviewsRes = await getReviewsByBookingId(booking_id);
      if (reviewsRes == null){
        return new NextResponse(
          null,
          {status: 204} // no content
        );
      }
      return NextResponse.json(
        {result: reviewsRes}, 
        { status: 200 }); // success
    } catch(err){
      console.log("Reviews - Got error durring getReviews process", err)
      return NextResponse.json(
        {message: "Error durring GET request"}, 
        { status: 500 }); // somehow got null array, it's a bug
    }
}
