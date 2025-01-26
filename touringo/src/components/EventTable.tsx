import React from "react";
import EventRow from "./EventRow"; // Import the EventRow component
import { TR_Event } from "@/utils/classes"; // Import the TR_Event class from utilities

type EventTableProps = {
  events: TR_Event[]; // The prop is an array of TR_Event objects
};

const EventTable: React.FC<EventTableProps> = ({ events }) => {
  return (
    <div className="event-table">
      <div className="event-row flex items-center justify-between">
        <b></b> {/* Empty space for formatting */}
        <h1 className="hidden sm:block pr-4"><b>Details</b></h1> {/* Header for event details */}
        <h1 className="hidden sm:block pr-8"><b>Options</b></h1> {/* Header for options */}
      </div>
      {events.map((event) => (
        // Render an EventRow for each event in the array
        <EventRow key={event.event_id} event={event} />
      ))}
    </div>
  );
};

export default EventTable;
