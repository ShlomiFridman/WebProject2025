"use client";
import EventRow from '@/components/EventRow';
import LoadingBox from '@/components/LoadingBox';
import { useAppContext } from '@/context/MainContext';
import { TR_Event } from '@/utils/classes';
import { notFound, useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const EventPage = () => {
  const { state, dispatch } = useAppContext();
  const [eventData, setEventData] = useState<TR_Event|null>(null);
  const {idStr} = useParams();
  const id = Number(idStr);

  useEffect(()=>{
      const getEventData = async () =>{
        if (state.selectedEvent && state.selectedEvent.event_id == id){
          setEventData(state.selectedEvent);
        }
        else {
          const response = await fetch(`/api/events/getById/${idStr}`)
          if (!response.ok){
            alert(response.statusText);
            return;
          }
          if (response.status == 204){
            notFound();
            return;
          }
          const resData = await response.json();
          const eventRes = TR_Event.fromJSON(resData.result);
          dispatch({type:"SET_SELECTED_EVENT", payload: eventRes});
          setEventData(eventRes);
        }
        
      };
      getEventData();
  }, [state.selectedEvent]);

  return (
    eventData != null? 
      <div>
        <h1>Welcome to the event Page of {eventData.name}! ID={id}</h1>
        <EventRow event={eventData} />
      </div>
      :
      <LoadingBox />
  );
};

export default EventPage;