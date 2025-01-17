"use client"

import LoadingBox from '@/components/LoadingBox';
import { Booking, TR_Event } from '@/utils/classes';
import { getLoggedAccount } from '@/utils/util_client';
import React, { useEffect, useState } from 'react';

const BookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[] | null>(null);
  const [events, setEvents] = useState<TR_Event[] | null>(null);

  useEffect(() => {
    const loggedAccount = getLoggedAccount();
    const getBookings = async () => {
      if (!loggedAccount)
        return;
      const response = await fetch(`/api/bookings/get/${loggedAccount.username}`)
      if (!response.ok) {
        alert(response.statusText);
        setBookings([]);
        return;
      }
      const resData = await response.json();
      const bookingsRes = Booking.fromJSON_array(resData.result);
      setBookings(bookingsRes);
    };
    const getEvents = async () => {
      const response = await fetch("/api/events/getAll");
      if (!response.ok) {
        alert(response.statusText);
        setEvents([]);
        return;
      }
      const resData = await response.json();
      const eventsRes = TR_Event.fromJSON_array(resData.result);
      setEvents(eventsRes);
    };
    if (events == null) {
      getEvents();
    }
    if (bookings == null){
      getBookings();
      getEvents();
    }
  }, [bookings, events]);

  return (
    (events != null && bookings != null) ?
      // TODO display all events with bookings, if an event have multiple bookings to it, display it as many times
      // TODO each row will have 'cancel booking' button
      <div className="max-w-[1000px] my-4 mx-auto">
        <div className="text-3xl text-green-600 font-bold pb-4">Booking</div>
        <div>
          lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </div>
      </div>
      : <LoadingBox />
  );
};

export default BookingsPage;