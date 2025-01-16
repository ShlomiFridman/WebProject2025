"use client";
import React from "react";
import { TR_Event } from "@/utils/classes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/MainContext";
import BookingButton from "./BookButton";

type EventRowProps = {
  event: TR_Event;
};

const EventRow: React.FC<EventRowProps> = ({ event }) => {
  const router = useRouter();
  const { dispatch } = useAppContext();

  const selectEvent = ({ date, time, tickets }: { date: string; time: string; tickets: number }) => {
    dispatch({ type: "SET_SELECTED_EVENT", payload: event });
    router.push(`/event/${event.event_id}?date=${date}&time=${time}&tickets=${tickets}`);
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
        <BookingButton onBook={selectEvent} />
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
