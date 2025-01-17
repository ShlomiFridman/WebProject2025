"use client"

import LoadingBox from '@/components/LoadingBox';
import { TR_Event } from '@/utils/classes';
import { getLoggedAccount } from '@/utils/util_client';
import React, { useEffect, useState } from 'react';

const MyEventsPage = () => {
  const [events, setEvents] = useState<TR_Event[] | null>(null);

  useEffect(() => {
    const loggedAccount = getLoggedAccount();
    
  }, [events]);

  const createEvent = (newEvent: TR_Event) => {
    // TODO add POST fetch
  }

  return (
    (events != null != null) ?
      // TODO create event form
      // TODO fetch user's events from server
      // TODO createNewEvent request
      <div className="max-w-[1000px] my-4 mx-auto">
        <div className="text-3xl text-green-600 font-bold pb-4">My Events</div>
        <div>
          lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </div>
      </div>
      : <LoadingBox />
  );
};

export default MyEventsPage;