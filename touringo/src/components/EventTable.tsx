import React from "react";
import EventRow from "./EventRow";

type Event = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  location: string;
  rating: number;
};

type EventTableProps = {
  events: Event[];
};

const EventTable: React.FC<EventTableProps> = ({ events }) => {
  return (
    <div className="event-table">
      {events.map((event) => (
        <EventRow key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventTable;