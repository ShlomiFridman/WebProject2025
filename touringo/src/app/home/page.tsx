"use client"

import EventTable from "@/components/EventTable";
import LoadingBox from "@/components/LoadingBox";
import { TR_Event } from "@/utils/classes";
import { useEffect, useState } from "react";


const HomePage: React.FC = () => {
  const [events, setEvents] = useState<TR_Event[]|null>(null);

  useEffect(()=>{
      const getEvents = async () =>{
        const response = await fetch("/api/events/getAll")
        if (!response.ok){
          alert(response.statusText);
          setEvents([]);
          return;
        }
        const resData = await response.json();
        const eventsRes = TR_Event.fromJSON_array(resData.result);
        setEvents(eventsRes);
      };
      if (events == null)
        getEvents();
  }, []);

  return (
      <div className="max-w-[1000px] my-4">
        <div className="text-3xl text-green-600 font-bold pb-4">Welcome to TouRingo!</div>
        <div className="AttractionsTitle">Attractions</div>
        <div>
          {events!=null? <EventTable events={events} /> : <LoadingBox/>}
        </div>

      </div>
  );
};

export default HomePage;

