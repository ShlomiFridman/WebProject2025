// src/app/api/login/route.ts
  
import { getReviewsByEventId } from "../../reviews_module";
import { NextResponse } from "next/server";

// get events - url-params: username
//		if the username is empty (or null) get all events
//		else get the events created by the username
type Params = {
  event_id: number;
}
export async function GET(request: Request, { params }: { params:Promise<Params> }) {
    const {event_id} = await params;
    if (!event_id || isNaN(event_id) || event_id<1) {
        return NextResponse.json(
            { message: "Missing event_id" },
            { status: 400 } // Bad Request
        );
    }
    try{
      const reviewsRes = await getReviewsByEventId(event_id);
      if (reviewsRes == null){
        console.log("Reviews - Got null in get request from module")
        return NextResponse.json(
          {message: "Error durring GET request"}, 
          { status: 500 }); // somehow got null array, it's a bug
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
