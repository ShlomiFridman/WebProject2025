"use client";
import LoadingBox from '@/components/LoadingBox';
import { useAppContext } from '@/context/MainContext';
import { TR_Event } from '@/utils/classes';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const EventPage = () => {
  const { state } = useAppContext();
  const [eventData, setEventData] = useState<TR_Event|null>(null);
  const {id} = useParams();

  useEffect(()=>{
      const getEventData = async () =>{
        const eventData = state.selectedEvent;
        setEventData(eventData);
      };
      getEventData();
  }, [state.selectedEvent]);

  return (
    eventData != null? 
      <div>
        <h1>Welcome to the event Page of {eventData.name}! ID={id}</h1>
      </div>
      :
      <LoadingBox />
  );
};

export default EventPage;