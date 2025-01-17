"use client"

import React, { useEffect, useState } from "react";
import { Booking, TR_Event } from "@/utils/classes";
import { formatDate } from "@/utils/utils";
import LoadingBox from "./LoadingBox";


type BookingRowProps = {
  booking: Booking;
};

const BookingRow: React.FC<BookingRowProps> = ({ booking }) => {
  const [event, setEvent] = useState<TR_Event | null>(null);

  useEffect(() => {
    const getEventDetails = async () => {
      const response = await fetch(`/api/events/getById/${booking.event_id}`);
      if (response.ok) {
        const resData = await response.json();
        const eventRes = TR_Event.fromJSON(resData.result);
        setEvent(eventRes);
      }
    };

    if (booking && booking.event_id) {
      getEventDetails();
    }
  }, [booking]);

  return (
    <div className="booking-row flex flex-col sm:flex-row items-center justify-between p-4 mb-4 transition bg-[#e7ccb3] dark:bg-[var(--box-background)] sm:bg-white hover:bg-[#e7ccb3] hover:rounded-lg hover:shadow-md dark:bg[var(--background)] dark:hover:bg-[var(--box-background)] sm:dark:bg-[#292b2f] sm:dark:hover:bg-[var(--box-background)] dark:hover:shadow-lg">
      {event ? (
        <div className="flex flex-col sm:flex-row sm:items-center w-full">
          <div className="event-details w-full sm:w-4/5">
            <h3 className="text-xl font-bold">{event.name}</h3>
            <p><strong>Booking ID:</strong> {booking.booking_id}</p>
            <p><strong>Event Date:</strong> {formatDate(booking.date)}</p>
            <p><strong>Location:</strong> {event.town}, {event.address}</p>
            <p><strong>Time:</strong> {event.openingTime.slice(0, 5)} - {event.closingTime.slice(0, 5)}</p>
          </div>
        </div>
      ) : (
        <LoadingBox />
      )}
    </div>
  );
};

export default BookingRow;
