"use client"
import React from "react";
import { TR_Event } from "@/utils/classes";
import Link from "next/link";
import Image from "next/image";

type EventRowProps = {
  event: TR_Event;
};

const EventRow: React.FC<EventRowProps> = ({ event }) => {
  return (
    <Link href={"/event/"+event.event_id}>
      <div  className="event-row">
        {/* Inline style to control the image size */}
        <div className="max-h-[100px]">
          <Image
            priority
            unoptimized
            src={event.images[0].src} 
            alt={event.images[0].title}
            width={150}   // Image width in pixels
            height={100}  // Image height in pixels
            />
        </div>
        <div className="event-details">
          <h3>{event.name}</h3>
          <p>{event.description}</p>
          <p><strong>Location:</strong> {event.town}, {event.address}</p>
          <p><strong>Rating:</strong> 4/5</p> {/* TODO get reviews from server and calc average */}
        </div>
        {/* Booking form */}
        {/* TODO add booking form for the event */}
      </div>
    </Link>
  );
};

export default EventRow;
