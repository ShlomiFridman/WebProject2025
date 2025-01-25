"use client";

import React, { useEffect, useState } from "react";
import { Booking, TR_Event } from "@/utils/classes";
import LoadingBox from "./LoadingBox";
import CancelBookingButton from "./bookingButtons/CancelBookingButton";
import Link from "next/link";
import BookingReviewButton from "./bookingButtons/BookingReviewButton";
import { InfoElement } from "@/utils/util_client";

type BookingRowProps = {
  booking: Booking;
};

const BookingRow: React.FC<BookingRowProps> = ({ booking }) => {
  const [event, setEvent] = useState<TR_Event | null>(null);

  // Fetch event details on mount
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
    <div className="booking-row flex flex-col sm:flex-row items-center justify-between p-4 mb-4 transition bg-[#c6e7b3] dark:bg-[var(--box-background)] sm:bg-white hover:bg-[#c6e7b3] hover:rounded-lg hover:shadow-md dark:bg[var(--background)] dark:hover:bg-[var(--box-background)] sm:dark:bg-[#292b2f] sm:dark:hover:bg-[var(--box-background)] dark:hover:shadow-lg">
      {event ? (
        <div className="flex flex-col sm:flex-row sm:items-center w-full">
          <Link href={`/event/${event.event_id}`} className="p-2 outline-dashed rounded outline-1 event-details w-full sm:w-4/5">
            <InfoElement infoMap={booking.infoMap(event)} />
          </Link>
          <div className="mt-4 sm:mt-0 sm:ml-4">
            {/* Cancel Booking Button */}
            <CancelBookingButton booking={booking} />

            {/* BookingReviewButton: Render only if the event is active and has passed */}
            {booking.isActive && booking.hasPassed() ? (
              <BookingReviewButton booking={booking} />
            ) : null}
          </div>
        </div>
      ) : (
        <LoadingBox />
      )}
    </div>
  );
};

export default BookingRow;
