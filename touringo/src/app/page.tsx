"use client";

import EventTable from '@/components/EventTable';
import LoadingBox from '@/components/LoadingBox';
import { TR_Event } from '@/utils/classes';
import { myStyles } from '@/components/styles';
import { getLoggedAccount } from '@/utils/util_client';
import { useEffect, useState } from 'react';

export default function Page() {
  const [events, setEvents] = useState<TR_Event[] | null>(null);
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [eventsPerPage, setEventsPerPage] = useState(4); // Default for small screens

  useEffect(() => {
    setUsername(getLoggedAccount()?.username);
    const getEvents = async () => {
      const response = await fetch("/api/events/getAll");
      if (!response.ok) {
        alert(response.statusText);
        setEvents([]);
        return;
      }
      const resData = await response.json();
      const eventsRes = TR_Event.fromJSON_array(resData.result);
      setEvents(eventsRes.filter(ev => ev.isActive));
    };
    if (events == null) {
      getEvents();
    }

    // Adjust eventsPerPage for large screens (Desktop) and reset to first page
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setEventsPerPage(events?.length || 0); // Show all events on desktop
        setCurrentPage(1); // Reset to the first page
      } else {
        setEventsPerPage(4); // Show only 4 events per page on small screens
      }
    };

    // Call the resize handler once on mount and then add event listener
    handleResize();
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [events]);

  // Calculate the events to display on the current page
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events?.slice(indexOfFirstEvent, indexOfLastEvent);

  // Calculate the total number of pages
  const totalPages = Math.ceil((events?.length || 0) / eventsPerPage);

  // Scroll to top helper function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Add smooth scrolling effect
    });
  };

  useEffect(() => {
    // Scroll to the top every time the page changes
    scrollToTop();
  }, [currentPage]); // This will run whenever `currentPage` changes

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1); // Use functional update to ensure the correct page
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1); // Use functional update to ensure the correct page
    }
  };

  return (
    <div className={myStyles.container_max_width}>
      <h2 className={myStyles.page_title}>
        Welcome to TouRingo{username ? `, ${username}` : ""}
      </h2>
      <div className="pb-4">Local tourist attractions, restaurants, and cultural events</div>
      <div className="flex justify-center flex-col w-full">
        {events != null ? (
          <>
            {currentEvents && currentEvents.length > 0 ? (
              <EventTable events={currentEvents} />
            ) : (
              <strong>There aren&apos;t any events</strong>
            )}
            {/* Pagination buttons below the last event, visible only on small screens */}
            <div className="flex justify-between w-full mt-4 md:hidden"> {/* Hide on screens larger than sm */}
              <button
                onClick={handlePrevPage}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 disabled:opacity-50"
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 disabled:opacity-50"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <LoadingBox />
        )}
      </div>
    </div>
  );
}






  //redirect('/home');

  /*const txt = encryptData({test:"TEST"});
  const data = decryptData(txt)
  return (
        <div className={myStyles.container_max_width}>
          <div className={`${myStyles.page_title} pb-4}>Welcome to TouRingo!</div>
          <div>
            {JSON.stringify(data)}
          </div>
          <div>
            lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </div>

        </div>
  );*/
