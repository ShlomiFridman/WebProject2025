"use client";
import React from "react";
import { Booking } from "@/utils/classes";
import LoadingBox from "./LoadingBox";

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
  
  return (
    booking ? 
      <div className="event-row flex items-center">
        Booking Row Id={booking.booking_id}
      </div>
      : <LoadingBox/>
  );
};

export default EventRow;
