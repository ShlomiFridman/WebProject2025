import React from "react";
import EventRow from "./EventRow";
import { TR_Event } from "@/utils/classes";
import { usePathname } from "next/navigation";

type EventTableProps = {
  events: TR_Event[];
};

const EventTable: React.FC<EventTableProps> = ({ events }) => {
  const path = usePathname()
  return (
    <div className="event-table">
      <div className="event-row flex items-center justify-between">
        <b></b>
        <h1 className="text-center hidden sm:block pr-4"><b>Details</b></h1> {/* Hidden on small screens */}
        {path != "/" ? <h1 className="hidden sm:block pr-8"><b>Options</b></h1> : <h1></h1> } {/* Hidden on small screens */}
      </div>
      {events.map((event) => (
        <EventRow key={event.event_id} event={event} />
      ))}
    </div>
  );
};

export default EventTable;
