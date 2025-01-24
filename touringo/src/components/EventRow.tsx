"use client";
import React, { useEffect, useState } from "react";
import { TR_Event } from "@/utils/classes";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAppContext } from "@/context/MainContext";
import BookingButton from "./bookingButtons/BookButton";
import { formatDate } from "@/utils/utils";
import { getLoggedAccount } from "@/utils/util_client";
import CancelEventButton from "./eventsButtons/CancelEventButton";
import { mySvgs } from "@/utils/svgs";

type EventRowProps = {
  event: TR_Event;
};

const EventRow: React.FC<EventRowProps> = ({ event }) => {
  const eventInstance = event instanceof TR_Event ? event : TR_Event.fromJSON(event);
  const path = usePathname();
  const router = useRouter();
  const { dispatch } = useAppContext();
  const [username, setUsername] = useState<string | null>(null);
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const activeDays = daysOfWeek.filter((_, index) => event.openDays[index]);

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
    <div className="event-row flex sm:flex-row items-center justify-between p-4 mb-4 transition bg-[#c6e7b3] dark:bg-[var(--box-background)] sm:bg-white hover:bg-[#c6e7b3] hover:rounded-lg hover:shadow-md dark:bg[var(--background)] dark:hover:bg-[var(--box-background)] sm:dark:bg-[#292b2f] sm:dark:hover:bg-[var(--box-background)] dark:hover:shadow-lg">
      <div onClick={() => selectEvent()} className={`p-2 outline-dashed rounded outline-1 flex flex-col sm:flex-row sm:items-center w-full ${!inEventPaga() ? 'cursor-pointer' : ''}`}>
        <div className="max-h-[1000px] mb-4 sm:mb-0 sm:mr-4 sm:w-1/5">
          {event.images[0].src ? (
            <Image
              priority
              unoptimized
              src={event.images[0].src}
              alt={event.images[0].title}
              width={150}
              height={100}
            />
          ) : (
            <div className="no-image">No image available</div> // Fallback content when there is no image
          )}
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
                <strong>Phone Number:</strong> {event.phone}
              </p>
              <p>
                <strong>From:</strong> {formatDate(event.startDate)}
              </p>
              <p>
                <strong>Until:</strong> {formatDate(event.endDate)}
              </p>
              <p>
                <strong>Time:</strong> {event.openingTime.slice(0, 5)}-{event.closingTime.slice(0, 5)}
              </p>
              <p>
                <strong>Opening Days:</strong><br />{activeDays.length > 0
                  ? activeDays.join(", ")
                  : "No open days"}
              </p>
            </div>
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
          {mySvgs.externalLink_icon}
        </button>
      </div>
    </div>
  );
};

export default EventRow;
