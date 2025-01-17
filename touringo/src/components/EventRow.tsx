"use client";
import React from "react";
import { TR_Event } from "@/utils/classes";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAppContext } from "@/context/MainContext";
import BookingButton from "./BookButton";

type EventRowProps = {
  event: TR_Event;
};

const EventRow: React.FC<EventRowProps> = ({ event }) => {
  const path = usePathname();
  const router = useRouter();
  const { dispatch } = useAppContext();

  const createBooking = ({ date, tickets }: { date: string; tickets: number }) => {
    router.push(`/event/${event.event_id}?date=${date}&tickets=${tickets}`);
  };

  const selectEvent = () =>{
    if (path == `/event/${event.event_id}`)
      return;
    dispatch({ type: "SET_SELECTED_EVENT", payload: event });
    router.push(`/event/${event.event_id}`);

  } 

  const openMap = () => {
    const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(`${event.town}, ${event.address}`)}&z=15&output=embed`;
    window.open(mapUrl, "_blank");
  };

  return (
    <div onClick={()=>selectEvent()} className="event-row flex flex-col sm:flex-row items-center justify-between p-4 mb-4 transition bg-[#e7ccb3] dark:bg-[var(--box-background)]  sm:bg-white hover:bg-[#e7ccb3] hover:rounded-lg hover:shadow-md dark:bg[var(--background)] dark:hover:bg-[var(--box-background)] sm:dark:bg-[#292b2f] sm:dark:hover:bg-[var(--box-background)] dark:hover:shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center w-full">
        <div className="max-h-[1000px] mb-4 sm:mb-0 sm:mr-4 sm:w-1/5">
          <Image
            priority
            unoptimized
            src={event.images[0].src}
            alt={event.images[0].title}
            width={150}
            height={100}
          />
        </div>
        <div className="event-details w-full sm:w-4/5">
          <h3 className="text-xl font-bold">{event.name}</h3>
          <div className="grid grid-cols-1 gap-3 mt-2 sm:mt-0 sm:grid-cols-2">
            <p>{event.description}</p>
            <div>
              <p>
                <strong>Location:</strong> {event.town}, {event.address}
              </p>
              <p>
                <strong>Rating:</strong> 4/5
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 sm:mt-0 sm:ml-4">
        <BookingButton onBook={createBooking} />
        <br />
        <br />
        <button
          onClick={openMap}
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700 transition w-full dark:bg-blue-700 dark:hover:bg-blue-500"
        >
          Open in maps
        </button>
      </div>
    </div>
  );
};

export default EventRow;
