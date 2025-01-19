"use client";
import React, { useEffect, useState } from "react";
import { TR_Event } from "@/utils/classes";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAppContext } from "@/context/MainContext";
import BookingButton from "./BookButton";
import { formatDate } from "@/utils/utils";
import { getLoggedAccount } from "@/utils/util_client";

type EventRowProps = {
  event: TR_Event;
};

const EventRow: React.FC<EventRowProps> = ({ event }) => {
  const path = usePathname();
  const router = useRouter();
  const { dispatch } = useAppContext();
  const [username, setUsername] = useState<string | null>(null);
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const activeDays = daysOfWeek.filter((_, index) => event.openDays[index]);

  const inEventPaga = (): boolean => {
    return path == `/event/${event.event_id}`;
  }

  const createBooking = ({ date, tickets }: { date: string; tickets: number }) => {
    router.push(`/event/${event.event_id}?date=${date}&tickets=${tickets}`);
  };

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
    <div className="event-row flex sm:flex-row items-center justify-between p-4 mb-4 transition bg-[#e7ccb3] dark:bg-[var(--box-background)] sm:bg-white hover:bg-[#e7ccb3] hover:rounded-lg hover:shadow-md dark:bg[var(--background)] dark:hover:bg-[var(--box-background)] sm:dark:bg-[#292b2f] sm:dark:hover:bg-[var(--box-background)] dark:hover:shadow-lg">
      <div onClick={() => {
        if (path !== "/") {
          selectEvent();
        } else {
          alert("You must login first");
        }
      }} className={`flex flex-col sm:flex-row sm:items-center w-full ${!inEventPaga() ? 'cursor-pointer' : ''}`}>
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
      <div className="mt-4 sm:mt-0 sm:ml-4">
        {path !== "/" && (username) ? <>
          {username != event.creator_username ?
            <BookingButton onBook={createBooking} event={event} /> : <p className="text-center">Your event</p>
          }
        </> : <></>}
        {path === "/myEvents" ? <>
          {/* <button
            //onClick={updateEvent}
            className="bg-green-500 px-4 py-2 m-2 rounded hover:bg-green-700 transition w-full h-full dark:bg-green-700 dark:hover:bg-green-500"
          >
            <span>Update Event</span>

          </button> */}
          <button
            //onClick={cancelEvent}
            className="bg-red-500 px-4 py-2 m-2 rounded hover:bg-red-700 transition w-full h-full dark:bg-red-700 dark:hover:bg-red-500"
          >
            <span>Cancel Event</span>

          </button></> : <></>}
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
