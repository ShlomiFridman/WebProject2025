"use client";
import React from "react";
import { Booking, Review } from "@/utils/classes";
import LoadingBox from "./LoadingBox";
import { encryptData } from "@/utils/utils";

type BookingRowProps = {
  booking: Booking;
};

const EventRow: React.FC<BookingRowProps> = ({ booking }) => {

    const cancelRequest = (booking_id: number) => {
        fetch(`/api/bookings/cancel/${booking_id}`, {
            method: 'PATCH'
          }).then((response)=>{
            const badRequestError = (400 <= response.status && response.status < 500);
            if (!response.ok && !badRequestError) {
              alert(response.statusText);
              throw new Error("Unknown Error");
            }
            return response.json();
          }).then((resBody)=>{
            if (resBody.message){
              alert(resBody.message);
            } else{
              console.log(`Booking cancelled: ${booking_id}`);
            }
          }).catch((err)=>{
            console.log(err);
          })
    }
  cancelRequest(404);

  const createReview = (review: Review) => {
      const requestData = { 
        data: encryptData({ newReview:review })
      };
    fetch("/api/reviews/create",{
      method: "POST",
      body: JSON.stringify(requestData),
      headers: {
        'Content-Type': 'application/json', // Ensure the backend understands the JSON body
      },
    }).then((response)=>{
      const badRequestError = (400 <= response.status && response.status < 500);
      if (!response.ok && !badRequestError) {
        alert(response.statusText);
        throw new Error("Unknown Error");
      }
      return response.json();
    }).then((resBody)=>{
      if (resBody.message){
        alert(resBody.message);
      } else{
        const review = resBody.result as Review;
        console.log(`review created for event_id=${review.event_id}`);
        // TODO handle on success
      }
    }).catch((err)=>{
      console.log(err);
    })
  }
  createReview(new Review("admin1",201, 3, "HI", "2023-01-01"));
  
  return (
    booking ? 
      <div className="event-row flex items-center">
        Booking Row Id={booking.booking_id}
      </div>
      : <LoadingBox/>
  );
};

export default EventRow;
