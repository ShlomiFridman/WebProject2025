"use client"

import React from "react";
import BookingRow from "./BookingRow";
import { Booking } from "@/utils/classes";

type BookingTableProps = {
  bookings: Booking[];
};

const BookingTable: React.FC<BookingTableProps> = ({ bookings }) => {
  return (
    <div className="booking-table">
      <div className="booking-row flex items-center justify-between">
        <b>Booking Details</b>
        <h1 className="hidden sm:block pr-4"><b>Event Details</b></h1>
      </div>
      {bookings.map((booking) => (
        <BookingRow key={booking.booking_id} booking={booking} />
      ))}
    </div>
  );
};

export default BookingTable;
