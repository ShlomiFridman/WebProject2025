"use client";
import React, { useEffect, useState } from "react";
import { TR_Event } from "@/utils/classes";
import { usePathname, useRouter } from "next/navigation";
import { useAppContext } from "@/context/MainContext";
import BookingButton from "./bookingButtons/BookButton";
import { getLoggedAccount, ImageElement, InfoElement } from "@/utils/util_client";
import CancelEventButton from "./eventsButtons/CancelEventButton";
import { myStyles } from "@/utils/styles";

type EventRowProps = {
  event: TR_Event;
};

const EventRow: React.FC<EventRowProps> = ({ event }) => {
  const eventInstance = event instanceof TR_Event ? event : TR_Event.fromJSON(event);
  const path = usePathname();
  const router = useRouter();
  const { dispatch } = useAppContext();
  const [username, setUsername] = useState<string | null>(null);

  const inEventPaga = (): boolean => {
    return path == `/event/${event.event_id}`;
  }

  const selectEvent = () => {
    if (inEventPaga()) return;
    dispatch({ type: "SET_SELECTED_EVENT", payload: event });
    router.push(`/event/${event.event_id}`);
  };

  const openMap = () => {
    const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(`${event.town}, ${event.address}`)}&z=15&output=embed`;
    window.open(mapUrl, "_blank");
  };

  useEffect(() => {
    const loggedAccount = getLoggedAccount();
    if (loggedAccount)
      setUsername(loggedAccount.username);
  }, []);

  return (
    <div className={myStyles.eventRow}>
      <div onClick={() => selectEvent()} className={`${myStyles.eventRowSelected} ${!inEventPaga() ? 'cursor-pointer' : ''}`}>
        <div className="max-h-[1000px] mb-4 sm:mb-0 sm:mr-4 sm:w-1/5">
          {event.images[0].src ? (
            <ImageElement
              src={event.images[0].src}
              title={event.images[0].title}
            />
          ) : (
            <div className="no-image">No image available</div> // Fallback content when there is no image
          )}
        </div>
        <div className="w-full sm:w-4/5">
          <h3 className="text-xl font-bold">{event.name}</h3>
          <div className="grid grid-cols-1 gap-3 mt-2 sm:mt-0 sm:grid-cols-2">
            <p>{event.description}</p>
            <InfoElement infoMap={event.infoMap()}/>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 mt-2 sm:mt-0 sm:grid-cols-1">
        {(username) ? <>
          {username != event.creator_username ?
            <BookingButton event={event} />
            : <>
              <p className="text-center">Your event</p>
              <CancelEventButton event={eventInstance} />
            </>
          }
        </> : <></>}
        <button
          onClick={openMap}
          className="inline-flex items-center justify-center bg-blue-500 px-4 py-2 m-2 rounded w-full hover:bg-blue-700 transition whitespace-nowrap dark:bg-blue-700 dark:hover:bg-blue-500"
        >
          Open Map
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.0002 5H8.2002C7.08009 5 6.51962 5 6.0918 5.21799C5.71547 5.40973 5.40973 5.71547 5.21799 6.0918C5 6.51962 5 7.08009 5 8.2002V15.8002C5 16.9203 5 17.4801 5.21799 17.9079C5.40973 18.2842 5.71547 18.5905 6.0918 18.7822C6.5192 19 7.07899 19 8.19691 19H15.8031C16.921 19 17.48 19 17.9074 18.7822C18.2837 18.5905 18.5905 18.2839 18.7822 17.9076C19 17.4802 19 16.921 19 15.8031V14M20 9V4M20 4H15M20 4L13 11" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default EventRow;
