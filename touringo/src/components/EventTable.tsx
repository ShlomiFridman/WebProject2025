import React from "react";
import EventRow from "./EventRow";
import { TR_Event } from "@/utils/classes";


type EventTableProps = {
  events: TR_Event[];
};

const EventTable: React.FC<EventTableProps> = ({ events }) => {
  return (
    <div className="event-table">
      <div className="event-row flex items-center justify-between"><h1><b>Image</b></h1><h1><b>Details</b></h1><h1><b>Options</b></h1></div>
      {events.map((event) => (
        <EventRow key={event.event_id} event={event} />
      ))}
    </div>
  );
};

export default EventTable;