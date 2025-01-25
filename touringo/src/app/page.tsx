"use client"

import EventTable from '@/components/EventTable';
import LoadingBox from '@/components/LoadingBox';
import { TR_Event } from '@/utils/classes';
import { myStyles } from '@/components/styles';
import { getLoggedAccount } from '@/utils/util_client';
//import { decryptData, encryptData } from "@/utils/utils";
//import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

// fetch template example
// const user = {
//   name: "John Doe",
//   email: "john@example.com",
//   age: 30
// };

// fetch('https://example.com/P', {
//   method: 'PUT', // Specify the PUT method
//   headers: {
//     'Content-Type': 'application/json', // Make sure the server understands JSON
//   },
//   body: JSON.stringify(user) // Convert the 'User' object to a JSON string
// })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Request failed');
//     }
//     return response.json(); // Parse the JSON response if needed
//   })
//   .then(data => {
//     console.log('Success:', data); // Handle the response data
//   })
//   .catch(error => {
//     console.error('Error:', error); // Handle any errors
//   });


export default function Page() {
  const [events, setEvents] = useState<TR_Event[] | null>(null);
  const [username, setUsername] = useState<string | undefined>(undefined);

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
      setEvents(eventsRes.filter(ev => (ev.isActive)));
    };
    if (events == null){
      getEvents();
    }
  }, [events]);

  return (
    <div className={myStyles.container_max_width}> {/* Centers the content on small screens */}
      <h2 className={myStyles.page_title}>Welcome to TouRingo{username? `, ${username}` : ""}</h2>
      {/* <h3 className={myStyles.page_title}>Events</h3> */}
      <div className="pb-4">Local tourist attractions, restaurants, and cultural events</div>
      <div className="flex justify-center">
        {/* Center content on smaller screens */}
        {events != null ? (
          <>
            {
              events.length>0? <EventTable events={events} /> : <strong>There aren&apos;t any events</strong>
            }
          </>
        ) : (
          <LoadingBox />
        )}
      </div>
    </div>
  );

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
}