"use client";

import EventRow from '@/components/EventRow';
import CreateEventForm from '@/components/CreateEventForm/CreateEventForm';
import LoadingBox from '@/components/LoadingBox';
import { TR_Event } from '@/utils/classes';
import { getLoggedAccount } from '@/utils/util_client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { myStyles } from '@/components/styles';

const MyEventsPage = () => {
  const [events, setEvents] = useState<TR_Event[] | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false); // Form visibility
  const router = useRouter();

  useEffect(() => {
    const loggedAccount = getLoggedAccount();
    if (!loggedAccount) {
      router.push('/login');
      return;
    }

    const fetchEvents = async () => {
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

    if (events == null) fetchEvents();
  }, [events, router]);

  const handleEventCreated = () => {
    setEvents(null);
    setShowCreateForm(false); // Hide form after event is created
  };


  return (
    <div className={myStyles.container_max_width}>
      <div className="flex items-center justify-between pb-4">
        <div className={myStyles.page_title}>My Events</div>
        <button
          onClick={() => setShowCreateForm((prev) => !prev)}
          className={`mt-2 px-6 py-2 h-full ${myStyles.button_green} rounded-lg`}
        >
          {showCreateForm ? 'Cancel' : 'Create Event'}
        </button>
      </div>

      {/* Conditionally render the form */}
      {showCreateForm && <CreateEventForm onEventCreated={handleEventCreated} onSuccess={function (): void {
        alert("Event has been created!")
      }} />}

      {/* User Events */}
      <div>
        {events != null ? (
          events.length === 0 ? (
            <div className="flex justify-center w-full">No events found</div>
          ) : (
            <div className="event-table">
              <div className='event-row flex items-center justify-between'>
                <h1></h1>
                <h1 className="hidden sm:block pr-4"><b>Details</b></h1>
                <h1 className="hidden sm:block pr-8"><b>Options</b></h1>
              </div>
              {events.map((event) => (
                <EventRow key={event.event_id} event={event} />
              ))}
            </div>
          )
        ) : (
          <LoadingBox />
        )}
      </div>
    </div>
  );
};

export default MyEventsPage;
