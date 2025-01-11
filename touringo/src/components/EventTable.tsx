import React from "react";
import EventRow from "./EventRow";
import { TR_Event } from "@/utils/classes";


type EventTableProps = {
  events: TR_Event[];
};

const EventTable: React.FC<EventTableProps> = ({ events }) => {
  return (
    <div className="event-table">
      {events.map((event) => (
        <EventRow key={event.event_id} event={event} />
      ))}
    </div>
  );
};

export default EventTable;