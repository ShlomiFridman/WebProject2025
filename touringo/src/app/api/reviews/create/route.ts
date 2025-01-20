// src/app/api/login/route.ts

import { Review } from "@/utils/classes";
import { createReview } from "../reviews_module";
import { NextResponse } from "next/server";
import { decryptData } from "@/utils/utils";

// create new event - body-params: newEvent (type: TR_Event)
interface CreateBodyParam {
  newReview: Review;
}
export async function POST(request: Request) {
  try {
    const reqBody = await request.json();
    const data = decryptData(reqBody.data) as CreateBodyParam;

    // Normalize data
    const newReview = (!data) ? null : data.newReview;

    // Validate the normalized event data
    if (!newReview) {
      return NextResponse.json(
        { message: "Invalid review data" },
        { status: 400 } // Bad Request
      );
    }

    // Create the event
    const createdReview = await createReview(newReview);

    if (createdReview == null) {
      return NextResponse.json({
        message: "Booking already has a review!"
      },
        { status: 422 } // Not Acceptable
      );
    }

    console.log("Review successfully created:", createdReview);

    return NextResponse.json(
      { result: createdReview },
      { status: 201 }); // Created
  } catch (err) {
    console.error("Review POST - Error creating a new review:", err);
    return NextResponse.json(
      { message: "Error occurred while creating the review" },
      { status: 500 } // Internal Server Error
    );
  }
}
