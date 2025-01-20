"use client"

import BookingTable from '@/components/BookingTable';
import LoadingBox from '@/components/LoadingBox';
import { Booking } from '@/utils/classes';
import { getLoggedAccount } from '@/utils/util_client';  // Assuming this gets the logged-in user
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const BookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loggedAccount = getLoggedAccount();  // Get the logged-in account
    if (!loggedAccount) {
      // alert("You must login first!");
      router.push('/login');
      return;
    }
    if (loggedAccount) {
      const getBookings = async () => {
        const response = await fetch(`/api/bookings/get/${loggedAccount.username}`);
        if (!response.ok) {
          alert(response.statusText);
          setBookings([]);
          return;
        }
        const resData = await response.json();
        const bookingsRes = Booking.fromJSON_array(resData.result);
        setBookings(bookingsRes);
      };

      if (bookings == null) {
        getBookings();
      }
    }
  }, [bookings, router]);

  return (
    (bookings != null) ?
      <div className="max-w-[1000px] my-4 mx-auto">
        <div className="text-3xl text-green-600 font-bold pb-4">Your Bookings</div>
        <div>
          {bookings.length === 0 ? (
            <p>No bookings found.</p>
          ) : (
            <BookingTable bookings={bookings} />
          )}
        </div>
      </div>
      : <LoadingBox />
  );
};

export default BookingsPage;