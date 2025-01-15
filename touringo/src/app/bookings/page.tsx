"use client"

import LoadingBox from '@/components/LoadingBox';
import { useAppContext } from '@/context/MainContext';
import { Booking } from '@/utils/classes';
import React, { useEffect, useState } from 'react';

const BookingsPage = () => {
    const {state} = useAppContext();
    const [bookings, setBookings] = useState<Booking[]|null>(null);
  
    useEffect(()=>{
        const getEvents = async () =>{
          if (!state.loggedAccount)
            return;
          const response = await fetch(`/api/bookings/get/${state.loggedAccount?.username}`)
          if (!response.ok){
            alert(response.statusText);
            setBookings([]);
            return;
          }
          const resData = await response.json();
          const bookingsRes = Booking.fromJSON_array(resData.result);
          setBookings(bookingsRes);
        };
        if (bookings == null)
          getEvents();
    }, []);
    
  return (
    bookings!=null?
      <div className="max-w-[1000px] my-4 mx-auto">
        <div className="text-3xl text-green-600 font-bold pb-4">Booking</div>
        <div>
          lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </div>
      </div>
      : <LoadingBox/>
  );
};

export default BookingsPage;