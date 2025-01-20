"use client";

import React, { useEffect, useState } from "react";
import { Booking, TR_Event, Review } from "@/utils/classes";
import { formatDate, encryptData } from "@/utils/utils";
import LoadingBox from "./LoadingBox";
import CancelBookingButton from "./bookingButtons/CancelBookingButton";
import Link from "next/link";
import BookingReviewButton from "./bookingButtons/BookingReviewButton";
import { getLoggedAccount } from "@/utils/util_client";

type BookingRowProps = {
  booking: Booking;
};

const BookingRow: React.FC<BookingRowProps> = ({ booking }) => {
  const [event, setEvent] = useState<TR_Event | null>(null);
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [activeReviewBookingId, setActiveReviewBookingId] = useState<string | null>(null);

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

  // Fetch logged-in account's username
  useEffect(() => {
    const account = getLoggedAccount();
    if (account) {
      setUsername(account.username);
    } else {
      alert("User not logged in.");
    }
  }, []);

  // Handle review creation
  const createReview = async (rating: number, feedback: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/reviews/create", {
        method: "POST",
        body: JSON.stringify({
          data: encryptData({
            newReview: new Review(
              booking.booking_id,
              username || "unknown",
              booking.event_id,
              rating,
              feedback,
              new Date().toISOString().split("T")[0]
            ),
          }),
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const resBody = await response.json();
        if (resBody.result) {
          console.log(`Review created successfully:`, resBody.result);
          return true;
        }
        alert(resBody.message || "Review creation failed.");
        return false;
      } else {
        alert(`Failed to create review: ${response.statusText}`);
        return false;
      }
    } catch (error) {
      console.error("Error creating review:", error);
      alert("An unexpected error occurred while submitting the review.");
      return false;
    }
  };

  // Handle toggling the active review state (and closing previously opened forms)
  const handleReviewToggle = (bookingId: string) => {
    // If the clicked review form is already open, close it; if not, open it and close others
    setActiveReviewBookingId(prevBookingId =>
      prevBookingId === bookingId ? null : bookingId
    );
  };

  return (
    <div className="booking-row flex flex-col sm:flex-row items-center justify-between p-4 mb-4 transition bg-[#c6e7b3] dark:bg-[var(--box-background)] sm:bg-white hover:bg-[#c6e7b3] hover:rounded-lg hover:shadow-md dark:bg[var(--background)] dark:hover:bg-[var(--box-background)] sm:dark:bg-[#292b2f] sm:dark:hover:bg-[var(--box-background)] dark:hover:shadow-lg">
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
          <div className="mt-4 sm:mt-0 sm:ml-4"> 
            {/* Cancel Booking Button actions flex gap-2 mt-4 sm:mt-0*/}
            <CancelBookingButton booking={booking} />

            {/* BookingReviewButton for Review creation */}
            <BookingReviewButton
              isActive={activeReviewBookingId === String(booking.booking_id)} // Show review form only if this booking is selected
              onToggle={() => handleReviewToggle(String(booking.booking_id))} // Toggle the review form
              onSubmit={(rating, feedback) => createReview(rating, feedback)} // Handle review submission
            />
          </div>
        </div>
      ) : (
        <LoadingBox />
      )}
    </div>
  );
};

export default BookingRow;
