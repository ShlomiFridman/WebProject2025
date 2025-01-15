"use client";
import React from "react";
import { TR_Event } from "@/utils/classes";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/MainContext";

type EventRowProps = {
  event: TR_Event;
};

const EventRow: React.FC<EventRowProps> = ({ event }) => {
  const router = useRouter();
  const { dispatch } = useAppContext();

  const selectEvent: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    dispatch({ type: "SET_SELECTED_EVENT", payload: event });
    router.push(`/event/${event.event_id}`);
  };

  const openMap = () => {
    const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(`${event.town}, ${event.address}`)}&z=15&output=embed`;
    window.open(mapUrl, "_blank");
  };

  return (
    <div className="event-row flex items-center justify-between p-1 mb-1 transition hover:bg-[#e7ccb3] hover:p-2 hover:rounded-lg hover:shadow-md dark:hover:bg-[var(--box-background)] dark:hover:shadow-lg">

      <div className="flex items-center">
        <div className="max-h-[1000px] mr-4">
          <Image
            priority
            unoptimized
            src={event.images[0].src}
            alt={event.images[0].title}
            width={150}
            height={100}
          />
        </div>
        <div className="event-details">
          <h3 className="text-xl font-bold ">{event.name}</h3>
          <div className="test grid grid-flow-col-dense grid-cols-1 gap-3 content-center">
            <p>{event.description}</p>
            <p>
              <strong>Location:</strong> {event.town}, {event.address}
            </p>
            <p>
              <strong>Rating:</strong> 4/5
            </p>
          </div>
        </div>
      </div>
      <div>
        <Link href="#" onClick={selectEvent}>
          <button
            className="bg-green-500 px-4 py-2 rounded hover:bg-green-700 transition w-full dark:bg-green-700 dark:hover:bg-green-500"
          >
            Book
          </button>
        </Link >
        <br />
        <br />
        <button
          onClick={openMap}
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700 transition w-full dark:bg-blue-700 dark:hover:bg-blue-500"
        >
          Open Map
        </button>
      </div>
    </div>
  );
};

export default EventRow;
