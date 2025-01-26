"use client";

/**
 * This component renders the Bookings Page, displaying a list of bookings
 * for the logged-in user. If the user is not logged in, they are redirected
 * to the login page.
 */

import BookingTable from '@/components/BookingTable'; // Component to display bookings in a table format
import LoadingBox from '@/components/LoadingBox'; // Component to indicate loading state
import { Booking } from '@/utils/classes'; // Utility class for handling booking data
import { myStyles } from '@/components/styles'; // Custom styles for the page
import { getLoggedAccount } from '@/utils/util_client'; // Utility function to get the logged-in account
import { useRouter } from 'next/navigation'; // Hook for navigation in Next.js
import React, { useEffect, useState } from 'react'; // React imports for state and lifecycle management

const BookingsPage = () => {
  // State to hold the list of bookings (or null if not fetched yet)
  const [bookings, setBookings] = useState<Booking[] | null>(null);

  const router = useRouter(); // Router instance for navigation

  useEffect(() => {
    // Retrieve the logged-in account information
    const loggedAccount = getLoggedAccount();

    if (!loggedAccount) {
      // If no user is logged in, redirect to the login page
      router.push('/login');
      return;
    }

    if (loggedAccount) {
      // Fetch bookings if the user is logged in
      const getBookings = async () => {
        try {
          // Make an API call to fetch bookings for the logged-in user
          const response = await fetch(`/api/bookings/get/${loggedAccount.username}`);

          if (!response.ok) {
            // Handle error response
            alert(response.statusText);
            setBookings([]); // Set an empty bookings list on failure
            return;
          }

          // Parse and transform the response data into Booking objects
          const resData = await response.json();
          const bookingsRes = Booking.fromJSON_array(resData.result);
          setBookings(bookingsRes); // Update the bookings state
        } catch (error) {
          console.error("Error fetching bookings:", error);
          setBookings([]); // Handle network or unexpected errors
        }
      };

      // Fetch bookings only if not already fetched
      if (bookings == null) {
        getBookings();
      }
    }
  }, [bookings, router]); // Dependencies: bookings state and router instance

  return (
    // Render the bookings table or a loading state
    bookings != null ? (
      <div className={myStyles.container_max_width}>
        <div className={`${myStyles.page_title} pb-4`}>Your Bookings</div>
        <div>
          {bookings.length === 0 ? (
            <p>No bookings found.</p> // Message for empty bookings list
          ) : (
            <BookingTable bookings={bookings} /> // Render the bookings table
          )}
        </div>
      </div>
    ) : (
      <LoadingBox /> // Render loading indicator while fetching data
    )
  );
};

export default BookingsPage;
