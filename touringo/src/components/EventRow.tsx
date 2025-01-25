"use client";
import React, { useEffect, useState } from "react";
import { TR_Event } from "@/utils/classes";
import { usePathname, useRouter } from "next/navigation";
import { useAppContext } from "@/context/MainContext";
import BookingButton from "./bookingButtons/BookButton";
import { getLoggedAccount, ImageElement, InfoElement } from "@/utils/util_client";
import CancelEventButton from "./eventsButtons/CancelEventButton";
import { myStyles } from "@/components/styles";
import { mySvgs } from "./svgs";

// Props type definition
type EventRowProps = {
  event: TR_Event;
};

// Event row component
const EventRow: React.FC<EventRowProps> = ({ event }) => {
  const eventInstance = event instanceof TR_Event ? event : TR_Event.fromJSON(event);
  const path = usePathname();
  const router = useRouter();
  const { dispatch } = useAppContext();
  const [username, setUsername] = useState<string | null>(null);

  // Check if the user is on the event page
  const inEventPaga = (): boolean => path == `/event/${event.event_id}`;

  // Handle event selection
  const selectEvent = () => {
    if (!inEventPaga()) {
      dispatch({ type: "SET_SELECTED_EVENT", payload: event });
      router.push(`/event/${event.event_id}`);
    }
  };

  // Open map in a new tab
  const openMap = () => {
    const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(`${event.town}, ${event.address}`)}&z=15&output=embed`;
    window.open(mapUrl, "_blank");
  };

  // Fetch logged-in username on mount
  useEffect(() => {
    const loggedAccount = getLoggedAccount();
    if (loggedAccount) setUsername(loggedAccount.username);
  }, []);

  return (
    <div className={myStyles.eventRow}>
      {/* Event image and details */}
      <div onClick={selectEvent} className={`${myStyles.eventRowSelected} ${!inEventPaga() ? 'cursor-pointer' : ''}`}>
        <div className="max-h-[1000px] mb-4 sm:mb-0 sm:mr-4 sm:w-1/5">
          {event.images[0].src ? (
            <ImageElement src={event.images[0].src} title={event.images[0].title} className="w-100% h-auto" />
          ) : (
            <div className="no-image w-100% h-auto">No image available</div>
          )}
        </div>
        <div className="w-full sm:w-4/5 flex-none">
          <div className="text-xl font-bold">{event.name}</div>
          <div className="grid grid-cols-1 gap-3 mt-2 sm:mt-0 sm:grid-cols-2">
            <p>{event.description}</p>
            <InfoElement infoMap={event.infoMap()} />
          </div>
        </div>
      </div>

      {/* Actions: Booking, cancel event, and open map */}
      <div className="grid grid-cols-1 gap-3 mt-2 sm:mt-0 sm:grid-cols-1">
        {username && (
          <>
            {username !== event.creator_username ? (
              <BookingButton event={event} />
            ) : (
              <>
                <p className="text-center">Your event</p>
                <CancelEventButton event={eventInstance} />
              </>
            )}
          </>
        )}
        <button
          onClick={openMap}
          className="inline-flex items-center justify-center bg-blue-500 px-4 py-2 m-2 rounded w-full hover:bg-blue-700 transition whitespace-nowrap dark:bg-blue-700 dark:hover:bg-blue-500"
        >
          Open Map
          {mySvgs.externalLink_icon}
        </button>
      </div>
    </div>
  );
};

export default EventRow;
