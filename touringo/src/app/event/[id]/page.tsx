"use client";
import EventRow from '@/components/EventRow';
import GoogleMap from '@/components/GoogleMap';
import LoadingBox from '@/components/LoadingBox';
import ReviewsTable from '@/components/ReviewTable';
import { useAppContext } from '@/context/MainContext';
import { Review, TR_Event } from '@/utils/classes';
import { myStyles } from '@/utils/styles';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const EventPage = () => {
  const { state, dispatch } = useAppContext();
  const [eventData, setEventData] = useState<TR_Event | null>(null);
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const { id } = useParams();
  const router = useRouter();
  const currentPath = usePathname();
  const id_num = Number(id);

  useEffect(() => {
    if (isNaN(id_num)) {
      router.push(`${currentPath}/404`);
      return;
    }
    const getEventData = async () => {
      if (state.selectedEvent && state.selectedEvent.event_id == id_num) {
        setEventData(state.selectedEvent);
        getReviews(state.selectedEvent.event_id);
      }
      else {
        const response = await fetch(`/api/events/getById/${id}`)
        // console.log(response);
        if (!response.ok) {
          alert(response.statusText);
          return;
        }
        if (response.status == 204) {
          router.push(`${currentPath}/404`);
        } else if (response.status == 200) {
          const resData = await response.json();
          const eventRes = TR_Event.fromJSON(resData.result);
          dispatch({ type: "SET_SELECTED_EVENT", payload: eventRes });
          setEventData(eventRes);
          getReviews(eventRes.event_id);
        }
      }
    };

    const getReviews = async (event_id: number) => {
      const response = await fetch(`/api/reviews/getByEventId/${event_id}`)
      // console.log(response);
      if (!response.ok) {
        alert(response.statusText);
        return;
      } else if (response.status == 200) {
        const resData = await response.json();
        const reviews = Review.fromJSON_array(resData.result);
        setReviews(reviews);
      }
    };
    getEventData();
  }, [currentPath, dispatch, id, id_num, router, state.selectedEvent]);

  return (
    <div>
      {eventData != null ? (
        <div>
          <div className="pt-3">
            <Link href="/" className="text-green-500 font-bold hover:underline">← Back to All Events</Link>
          </div>
          <hr className='m-2'/>
          {/* <h1>Welcome to the event Page of {eventData.name}! ID={id}</h1> */}

          <EventRow event={eventData} />

          <div className={`${myStyles.container_max_width} ${myStyles.page_title}`}>Map</div>
          <GoogleMap address={`${eventData.town}, ${eventData.address}`} />
          {/* reviews section */}
          {
            reviews != null?
            <ReviewsTable reviews={reviews}/> : <></>
          }
        </div>
      ) : (
        <LoadingBox />
      )}
    </div>
  );
};

export default EventPage;