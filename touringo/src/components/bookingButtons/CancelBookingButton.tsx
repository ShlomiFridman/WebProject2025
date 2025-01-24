"use client";
import { Booking } from "@/utils/classes";
import React, { useEffect, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

interface ButtonProps {
  booking: Booking;
}

function CancelBookingButton({ booking }: ButtonProps) {
  const [btnText, setBtnText] = useState<string>("Cancel");
  const [disableFlag, setDisableFlag] = useState<boolean>(true);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setDisableFlag(!booking.isActive || booking.hasPassed());
    if (!booking.isActive) setBtnText("Cancelled");
    else if (booking.hasPassed()) setBtnText("Ended");
    if (btnRef.current) {
      btnRef.current.textContent = btnText;
      btnRef.current.disabled = disableFlag;
    }
  }, [booking, btnText, disableFlag]);

  // Cancel booking request
  const cancelRequest = () => {
    if (!confirm("Are you sure you want to cancel?")) return;

    setDisableFlag(true);  // Disable the button when the cancel request is initiated
    setBtnText("Cancelling...");  // Change button text to indicate the process is ongoing

    fetch(`/api/bookings/cancel/${booking.booking_id}`, {
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
          console.log(`Booking cancelled: ${booking.booking_id}`);
          alert(`Booking cancelled`);
          booking.isActive = false;
          setDisableFlag(true); // Ensure the button remains disabled after the cancellation
          setBtnText("Cancelled"); // Change button text to reflect the cancellation
        }
      })
      .catch((err) => {
        console.log(err);
        setDisableFlag(false);  // Re-enable the button if there is an error
        setBtnText("Cancel");  // Reset button text on error
      });
  };

  return (
    <button
      ref={btnRef}
      onClick={cancelRequest}
      className={`px-4 py-2 m-2 rounded transition w-full h-full ${
        !booking.hasPassed()
          ? "bg-red-500 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-500"
          : ""
      }`}
    >
      {btnText} {/* Display the button text dynamically */}
    </button>
  );
}

export default CancelBookingButton;
