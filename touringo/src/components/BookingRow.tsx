"use client";

import React, { useEffect, useState } from "react";
import { Booking, TR_Event } from "@/utils/classes"; // Import necessary classes
import LoadingBox from "./LoadingBox"; // A loading spinner component
import CancelBookingButton from "./bookingButtons/CancelBookingButton"; // A button to cancel the booking
import Link from "next/link"; // Link component for navigation
import BookingReviewButton from "./bookingButtons/BookingReviewButton"; // A button for booking reviews
import { InfoElement } from "@/utils/util_client"; // A component that displays event info

type BookingRowProps = {
  booking: Booking; // The booking object passed as a prop
};

const BookingRow: React.FC<BookingRowProps> = ({ booking }) => {
  const [event, setEvent] = useState<TR_Event | null>(null); // State for storing the event details
  const linkClasses = "p-2 outline-dashed rounded outline-1 event-details w-full sm:w-4/5"; // Styling for the event link

  // Fetch event details when the component mounts or when the booking changes
  useEffect(() => {
    const getEventDetails = async () => {
      const response = await fetch(`/api/events/getById/${booking.event_id}`);
      if (response.ok) {
        const resData = await response.json();
        const eventRes = TR_Event.fromJSON(resData.result); // Parse the event data
        setEvent(eventRes); // Update the state with the event details
      }
    };

    if (booking && booking.event_id) {
      getEventDetails(); // Fetch event data
    }
  }, [booking]); // Dependency array ensures the effect runs when `booking` changes

  return (
    <div className="booking-row flex flex-col sm:flex-row items-center justify-between p-4 mb-4 transition bg-[#c6e7b3] dark:bg-[var(--box-background)] sm:bg-white hover:bg-[#c6e7b3] hover:rounded-lg hover:shadow-md dark:bg[var(--background)] dark:hover:bg-[var(--box-background)] sm:dark:bg-[#292b2f] sm:dark:hover:bg-[var(--box-background)] dark:hover:shadow-lg">
      {event ? (
        // Render the booking row if event data is available
        <div className="flex flex-col sm:flex-row sm:items-center w-full">

          <Link
            href={`/event/${event.event_id}`} // Link to the event details page
            className={linkClasses} // Apply link styling
            prefetch
          >
            <InfoElement infoMap={booking.infoMap(event)} /> {/* Display event info */}
          </Link>

          <div className="mt-4 sm:mt-0 sm:ml-4">
            {/* Render the Cancel Booking Button */}
            <CancelBookingButton booking={booking} />

            {/* Render the BookingReviewButton if the booking is active and the event has passed */}
            {booking.isActive && booking.hasPassed() ? (
              <BookingReviewButton booking={booking} />
            ) : null}
          </div>
        </div>
      ) : (
        // Show LoadingBox while the event data is being fetched
        <LoadingBox />
      )}
    </div>
  );
};

export default BookingRow;
