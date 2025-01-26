"use client"; // Enables client-side rendering for the component

// Import necessary components, utilities, and hooks
import EventRow from '@/components/EventRow';
import CreateEventForm from '@/components/CreateEventForm/CreateEventForm';
import LoadingBox from '@/components/LoadingBox'; // Loading state display
import { TR_Event } from '@/utils/classes'; // Event class for type consistency
import { getLoggedAccount } from '@/utils/util_client'; // Utility to retrieve logged-in user
import { useRouter } from 'next/navigation'; // Next.js router for navigation
import React, { useEffect, useState } from 'react';
import { myStyles } from '@/components/styles'; // Custom styles for UI consistency

const MyEventsPage = () => {
  // Local states
  const [events, setEvents] = useState<TR_Event[] | null>(null); // Stores user events
  const [showCreateForm, setShowCreateForm] = useState(false); // Toggles visibility of event creation form
  const router = useRouter();

  // Fetch user-specific events on component mount
  useEffect(() => {
    const loggedAccount = getLoggedAccount();
    if (!loggedAccount) {
      router.push('/login'); // Redirect unauthenticated users to the login page
      return;
    }

    // Async function to fetch events
    const fetchEvents = async () => {
      const response = await fetch(`/api/events/getByUsername/${loggedAccount.username}`);
      if (!response.ok) {
        alert(response.statusText); // Alert on server errors
        setEvents([]); // Fallback to an empty event list
        return;
      }
      const resData = await response.json();
      const eventsRes = TR_Event.fromJSON_array(resData.result); // Parse response into TR_Event objects
      setEvents(eventsRes);
    };

    if (events == null) fetchEvents(); // Fetch events only if not already loaded
  }, [events, router]);

  /**
   * Handles the successful creation of an event.
   * Resets the event list to trigger a refresh and hides the form.
   */
  const handleEventCreated = () => {
    setEvents(null); // Reset events to trigger re-fetch
    setShowCreateForm(false); // Hide event creation form
  };

  return (
    <div className={myStyles.container_max_width}>
      {/* Page Header */}
      <div className="flex items-center justify-between pb-4">
        <div className={myStyles.page_title}>My Events</div>
        {/* Button to toggle event creation form */}
        <button
          onClick={() => setShowCreateForm((prev) => !prev)}
          className={`mt-2 px-6 py-2 h-full ${myStyles.button_green} rounded-lg`}
        >
          {showCreateForm ? 'Cancel' : 'Create Event'}
        </button>
      </div>

      {/* Event Creation Form */}
      {showCreateForm && (
        <CreateEventForm
          onEventCreated={handleEventCreated} // Callback to refresh event list
          onSuccess={() => alert('Event has been created!')} // Alert success
        />
      )}

      {/* User Events Section */}
      <div>
        {/* Conditional rendering based on event state */}
        {events != null ? (
          events.length === 0 ? (
            <div className="flex justify-center w-full">No events found</div>
          ) : (
            <div className="event-table">
              {/* Event Table Header */}
              <div className="event-row flex items-center justify-between">
                <h1></h1>
                <h1 className="hidden sm:block pr-4"><b>Details</b></h1>
                <h1 className="hidden sm:block pr-8"><b>Options</b></h1>
              </div>
              {/* Event Rows */}
              {events.map((event) => (
                <EventRow key={event.event_id} event={event} />
              ))}
            </div>
          )
        ) : (
          // Show loading box while events are being fetched
          <LoadingBox />
        )}
      </div>
    </div>
  );
};

export default MyEventsPage;
