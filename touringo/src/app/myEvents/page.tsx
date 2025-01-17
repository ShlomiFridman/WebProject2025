"use client"

import LoadingBox from '@/components/LoadingBox';
import { TR_Event } from '@/utils/classes';
import { getLoggedAccount } from '@/utils/util_client';
import { encryptData } from '@/utils/utils';
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

  const createEvent = (newEvent: TR_Event) => {
    // TODO add POST fetch
    fetch('/api/events/create', {
      method: 'POST', // Assuming it's a POST request for registration
      body: JSON.stringify({ data: encryptData({ newEvent: newEvent }) }),
      headers: {
        'Content-Type': 'application/json', // Ensure the backend understands the JSON body
      },
    })
      .then((response) => {
        const badRequestError = response.status >= 400 && response.status < 500;
        if (!response.ok && !badRequestError) {
          alert(response.statusText);
          throw new Error('Unknown Error');
        }
        return response.json();
      })
      .then((resBody) => {
        if (resBody.message) {
          alert(resBody.message);
        } else {
          const eventRes = resBody.result as TR_Event;
          console.log(eventRes);
          // TODO handle success
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const cancelEvent = (event_id: number) => {
    
    fetch(`/api/events/cancel/${event_id}`, {
      method: 'PATCH'
    }).then((response)=>{
      const badRequestError = (400 <= response.status && response.status < 500);
      if (!response.ok && !badRequestError) {
        alert(response.statusText);
        throw new Error("Unknown Error");
      }
      return response.json();
    }).then((resBody)=>{
      if (resBody.message){
        alert(resBody.message);
      } else{
        console.log(`Booking cancelled: ${event_id}`);
        // TODO handle success
      }
    }).catch((err)=>{
      console.log(err);
    })
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