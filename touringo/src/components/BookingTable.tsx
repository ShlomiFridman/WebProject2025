"use client"

import React from "react";
import BookingRow from "./BookingRow"; // Import the BookingRow component
import { Booking } from "@/utils/classes"; // Import the Booking class from utilities

type BookingTableProps = {
  bookings: Booking[]; // The prop is an array of Booking objects
};

const BookingTable: React.FC<BookingTableProps> = ({ bookings }) => {
  return (
    <div className="booking-table">
      <div className="booking-row flex items-center justify-between">
        <b></b> {/* Empty space for formatting */}
        <b>Booking Details</b> {/* Header for booking details */}
        <h1 className="hidden sm:block pr-4"><b>Event Details</b></h1> {/* Event details header visible on larger screens */}
      </div>
      {bookings.map((booking) => (
        // Render a BookingRow for each booking in the array
        <BookingRow key={booking.booking_id} booking={booking} />
      ))}
    </div>
  );
};

export default BookingTable;
