"use client"

import EventRow from '@/components/EventRow';
import LoadingBox from '@/components/LoadingBox';
import { TR_Event } from '@/utils/classes';
import { getLoggedAccount } from '@/utils/util_client';
//import { encryptData } from '@/utils/utils';
import React, { useEffect, useState } from 'react';

const MyEventsPage = () => {
  const [events, setEvents] = useState<TR_Event[] | null>(null);

  useEffect(() => {
    const loggedAccount = getLoggedAccount();
    if (!loggedAccount)
      return;

    const getEvents = async () => {
      const response = await fetch(`/api/events/getByUsername/${loggedAccount.username}`);
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

  }, [events]);

  return (
    (events != null) ?
      // TODO create event form
      // TODO fetch user's events from server
      // TODO createNewEvent request
      <div className="max-w-[1000px] my-4 mx-auto">
        <div className="text-3xl text-green-600 font-bold pb-4">My Events</div>
        <div className="event-table">
      <div className="event-row flex items-center justify-between">
        <b></b>
        <h1 className="hidden sm:block pr-4"><b>Details</b></h1> {/* Hidden on small screens */}
        <h1 className="hidden sm:block pr-8"><b>Options</b></h1> {/* Hidden on small screens */}
      </div>
      {events.map((event) => (
        <EventRow key={event.event_id} event={event} />
      ))}
    </div>
      </div>
      : <LoadingBox />
  );
};

export default MyEventsPage;