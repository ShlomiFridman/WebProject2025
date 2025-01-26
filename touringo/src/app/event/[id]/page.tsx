"use client";

/**
 * EventPage Component
 * 
 * This component displays detailed information about a specific event, including:
 * - Event details
 * - Location displayed on a Google Map
 * - Reviews related to the event
 * 
 * If the event ID is invalid or data retrieval fails, the user is redirected to a 404 page.
 */

import EventRow from '@/components/EventRow'; // Component for displaying event details
import GoogleMap from '@/components/GoogleMap'; // Component for showing event location on a map
import LoadingBox from '@/components/LoadingBox'; // Component for indicating a loading state
import ReviewsTable from '@/components/ReviewTable'; // Component for displaying reviews
import { useAppContext } from '@/context/MainContext'; // Context hook for app-wide state management
import { Review, TR_Event } from '@/utils/classes'; // Utility classes for event and review data
import { myStyles } from '@/components/styles'; // Custom styles for consistent UI
import Link from 'next/link'; // Link component for navigation
import { useParams, usePathname, useRouter } from 'next/navigation'; // Next.js navigation hooks
import React, { useEffect, useState } from 'react'; // React imports for state and lifecycle management

const EventPage = () => {
  const { state, dispatch } = useAppContext(); // Access global state and dispatch function
  const [eventData, setEventData] = useState<TR_Event | null>(null); // State for event details
  const [reviews, setReviews] = useState<Review[] | null>(null); // State for event reviews

  const { id } = useParams(); // Extract event ID from URL parameters
  const router = useRouter(); // Router instance for navigation
  const currentPath = usePathname(); // Get the current path
  const id_num = Number(id); // Convert the ID parameter to a number

  useEffect(() => {
    // Redirect to a 404 page if the ID is not a valid number
    if (isNaN(id_num)) {
      router.push(`${currentPath}/404`);
      return;
    }

    // Function to fetch event data
    const getEventData = async () => {
      if (state.selectedEvent && state.selectedEvent.event_id === id_num) {
        // Use event data from the global state if available
        setEventData(state.selectedEvent);
        getReviews(state.selectedEvent.event_id);
      } else {
        // Fetch event data from the API
        const response = await fetch(`/api/events/getById/${id}`);
        if (!response.ok) {
          alert(response.statusText); // Handle failed requests
          return;
        }
        if (response.status === 204) {
          router.push(`${currentPath}/404`); // Redirect to 404 if no event data is found
        } else if (response.status === 200) {
          const resData = await response.json();
          const eventRes = TR_Event.fromJSON(resData.result); // Transform JSON into event object
          dispatch({ type: "SET_SELECTED_EVENT", payload: eventRes }); // Update global state
          setEventData(eventRes); // Update local state
          getReviews(eventRes.event_id); // Fetch reviews for the event
        }
      }
    };

    // Function to fetch reviews for the event
    const getReviews = async (event_id: number) => {
      const response = await fetch(`/api/reviews/getByEventId/${event_id}`);
      if (!response.ok) {
        alert(response.statusText); // Handle failed requests
        return;
      }
      if (response.status === 200) {
        const resData = await response.json();
        const reviews = Review.fromJSON_array(resData.result); // Transform JSON into review objects
        setReviews(reviews); // Update reviews state
      }
    };

    getEventData(); // Fetch event data on component mount
  }, [currentPath, dispatch, id, id_num, router, state.selectedEvent]);

  return (
    <div>
      {eventData ? (
        <div>
          {/* Navigation link to return to all events */}
          <div className="pt-3">
            <Link href="/" style={{ color: '#22c55e', fontWeight: 'bold', textDecoration: 'underline' }}>
              ← Back to All Events
            </Link>
          </div>
          <hr className='m-2' />

          {/* Event details */}
          <EventRow event={eventData} />

          {/* Map section */}
          <div className={`${myStyles.container_max_width} ${myStyles.page_title}`}>Map</div>
          <GoogleMap address={`${eventData.town}, ${eventData.address}`} />

          {/* Reviews section */}
          {reviews ? <ReviewsTable reviews={reviews} /> : <></>}
        </div>
      ) : (
        // Display a loading indicator while fetching event data
        <LoadingBox />
      )}
    </div>
  );
};

export default EventPage;
