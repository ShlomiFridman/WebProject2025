"use client";
import EventRow from '@/components/EventRow';
import LoadingBox from '@/components/LoadingBox';
import { useAppContext } from '@/context/MainContext';
import { TR_Event } from '@/utils/classes';
import { useParams, usePathname ,useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const EventPage = () => {
  const { state, dispatch } = useAppContext();
  const [eventData, setEventData] = useState<TR_Event|null>(null);
  const {id} = useParams();
  const router = useRouter();
  const currentPath = usePathname();
  const id_num = Number(id);

  useEffect(()=>{
      if (isNaN(id_num)){
        router.push(`${currentPath}/404`);
        return;
      }
      const getEventData = async () =>{
        if (state.selectedEvent && state.selectedEvent.event_id == id_num){
          setEventData(state.selectedEvent);
        }
        else {
          const response = await fetch(`/api/events/getById/${id}`)
          // console.log(response);
          if (!response.ok){
            alert(response.statusText);
            return;
          }
          if (response.status == 204){
            router.push(`${currentPath}/404`);
          } else if (response.status == 200){
            const resData = await response.json();
            const eventRes = TR_Event.fromJSON(resData.result);
            dispatch({type:"SET_SELECTED_EVENT", payload: eventRes});
            setEventData(eventRes);
          }
        }
        
      };
      getEventData();
  }, [id_num]);

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