"use client";
import { TR_Event } from "@/utils/classes";
import React, { useEffect, useRef, useState } from "react";

interface ButtonProps {
  event: TR_Event ; // Allow flexibility but enforce validation inside
}

function CancelEventButton({ event }: ButtonProps) {
  const [btnText, setBtnText] = useState<string>("Cancel");
  const [disableFlag, setDisableFlag] = useState<boolean>(true);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    // Validate the event object
    if (!(event instanceof TR_Event)) {
      console.error("Invalid event object: not an instance of TR_Event.");
      console.log(event)
      return;
    }

    const isEnded = event.hasPassed();
    setDisableFlag(!event.isActive || isEnded);

    if (!event.isActive) {
      setBtnText("Cancelled");
    } else if (isEnded) {
      setBtnText("Ended");
    }

    if (btnRef.current) {
      btnRef.current.textContent = btnText;
      btnRef.current.disabled = disableFlag;
    }
  }, [event, btnText, disableFlag]);

  const cancelRequest = () => {
    if (!confirm("Are you sure you want to cancel?")) return;

    fetch(`/api/events/cancel/${event.event_id}`, {
      method: "PATCH",
    })
      .then((response) => {
        const badRequestError = 400 <= response.status && response.status < 500;
        if (!response.ok && !badRequestError) {
          alert(response.statusText);
          throw new Error("Unknown Error");
        }
        return response.json();
      })
      .then((resBody) => {
        if (resBody.message) {
          alert(resBody.message);
        } else {
          console.log(`Event cancelled: ${event.event_id}`);
          alert("Event cancelled");
          event.isActive = false;
          setDisableFlag(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <button
      ref={btnRef}
      onClick={cancelRequest}
      className={`px-4 m-2 rounded transition w-full h-full ${
        event instanceof TR_Event && !event.hasPassed()
          ? "bg-red-500 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-500"
          : ""
      }`}
    ></button>
  );
}

export default CancelEventButton;
