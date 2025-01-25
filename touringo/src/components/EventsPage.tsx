"use client";

import EventTable from "@/components/EventTable";
import LoadingBox from "@/components/LoadingBox";
import { TR_Event } from "@/utils/classes";
import { myStyles } from "@/components/styles";
import { useEffect, useState } from "react";

const HomePage: React.FC = () => {
  const [events, setEvents] = useState<TR_Event[] | null>(null);

  useEffect(() => {
    const getEvents = async () => {
      const response = await fetch("/api/events/getAll");
      if (!response.ok) {
        alert(response.statusText);
        setEvents([]);
        return;
      }
      const resData = await response.json();
      const eventsRes = TR_Event.fromJSON_array(resData.result);
      setEvents(eventsRes.filter(ev => (ev.isActive)));
    };
    if (events == null){
      getEvents();
    }
  }, [events]);

  return (
    <div className={myStyles.container_max_width}> {/* Centers the content on small screens */}
      <div className={myStyles.page_title}>Events</div>
      <div className="pb-4">Local tourist attractions, restaurants, and cultural events</div>
      <div className="flex justify-center">
        {/* Center content on smaller screens */}
        {events != null ? (
          <>
            {
              events.length>0? <EventTable events={events} /> : <strong>There aren&apos;t any events</strong>
            }
          </>
        ) : (
          <LoadingBox />
        )}
      </div>
    </div>
  );
};

export default HomePage;
