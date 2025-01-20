"use client";

import React, { useEffect, useState } from "react";
import { Booking, TR_Event, Review } from "@/utils/classes";
import { formatDate, encryptData } from "@/utils/utils";
import LoadingBox from "./LoadingBox";
import CancelBookingButton from "./bookingButtons/CancelBookingButton";
import Link from "next/link";

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

  // Create review request
  const createReview = (review: Review) => {
    const requestData = {
      data: encryptData({ newReview: review }),
    };
    fetch("/api/reviews/create", {
      method: "POST",
      body: JSON.stringify(requestData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        const badRequestError = 400 <= response.status && response.status < 500;
        if (!response.ok && !badRequestError) {
          alert(response.statusText);
          throw new Error("Unknown Error");
        }
        return response.json();
      })
      .then((resBody) => {
        if (resBody.message) {
          alert(resBody.message);
        } else {
          const newReview = resBody.result as Review;
          console.log(`Review created for event_id=${newReview.event_id}`);
          // TODO: Handle success response
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="booking-row flex flex-col sm:flex-row items-center justify-between p-4 mb-4 transition bg-[#e7ccb3] dark:bg-[var(--box-background)] sm:bg-white hover:bg-[#e7ccb3] hover:rounded-lg hover:shadow-md dark:bg[var(--background)] dark:hover:bg-[var(--box-background)] sm:dark:bg-[#292b2f] sm:dark:hover:bg-[var(--box-background)] dark:hover:shadow-lg">
      {event ? (
        <div className="flex flex-col sm:flex-row sm:items-center w-full">
          <Link href={`/event/${event.event_id}`} className="event-details w-full sm:w-4/5">
            <div>
              <h3 className="text-xl font-bold">{event.name}</h3>
              <p>
                <strong>Booking ID:</strong> {booking.booking_id} ({booking.amount} tickets)
              </p>
              <p>
                <strong>Date:</strong> {formatDate(booking.date)}
              </p>
              <p>
                <strong>Location:</strong> {event.town}, {event.address}
              </p>
              <p>
                <strong>Time:</strong> {event.openingTime.slice(0, 5)} -{" "}
                {event.closingTime.slice(0, 5)}
              </p>
            </div>
          </Link>
          <div className="actions flex gap-2 mt-4 sm:mt-0">
            {/* Cancel Booking Button */}
            <CancelBookingButton booking={booking} />

            {/* Review Event Button */}
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() =>
                createReview(
                  new Review(
                    booking.booking_id,
                    "admin1", // Replace with dynamic username if available
                    booking.event_id,
                    5, // Example rating
                    "Great event!", // Example comment
                    new Date().toISOString().split("T")[0] // Current date
                  )
                )
              }
            >
              Review Event
            </button>
          </div>
        </div>
      ) : (
        <LoadingBox />
      )}
    </div>
  );
};

export default BookingRow;
