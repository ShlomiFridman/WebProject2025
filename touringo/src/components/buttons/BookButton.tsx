import { TR_Event } from "@/utils/classes";
import { dateToFormat, getMaxDate } from "@/utils/utils";
import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface BookingDetails {
  date: string;
  tickets: number;
}

interface BookingButtonProps {
  event: TR_Event;
  onBook: (details: BookingDetails) => void;
}

function BookingButton({ event, onBook }: BookingButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const validDates = event.getValidDates();
  const lastValidDate = validDates[validDates.length-1];
  const today = new Date();
  const minValidDate = getMaxDate(dateToFormat(today), validDates[0]);
  // const maxDate = new Date(today);
  // maxDate.setMonth(today.getMonth() + 1);

  // const maxDateString = maxDate.toISOString().split("T")[0];
  const todayString = today.toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(minValidDate); // Default to today's date
  const [selectedTickets, setSelectedTickets] = useState(1);
  const [isBookEnabled, setIsBookEnabled] = useState(true); // Default is enabled for today's date and 1 ticket

  const formRef = useRef<HTMLFormElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        formRef.current &&
        !formRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleDateChange = (date: Date|null) => {
    console.log(date)
    if (date)
      setSelectedDate(dateToFormat(date));
    // const date = e.target.value;
    // setSelectedDate(date);
    // validateBooking(date, selectedTickets);
  };

  const handleTicketsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tickets = parseInt(e.target.value, 10);
    setSelectedTickets(tickets);
    validateBooking(selectedDate, tickets);
  };

  const validateBooking = (date: string, tickets: number) => {
    if (date && tickets > 0) {
      const selectedDateTime = new Date(date);
      if (selectedDateTime >= new Date(todayString)) {
        setIsBookEnabled(true);
        return;
      }
    }
    setIsBookEnabled(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isBookEnabled) {
      onBook({
        date: selectedDate,
        tickets: selectedTickets,
      });
      setIsOpen(false);
    }
  };

  const toggleForm = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the outside click handler
    setIsOpen((prev) => !prev);
  };

  // const createBooking = (booking: Booking) => {
  //   fetch('/api/bookings/create', {
  //         method: 'POST', // Assuming it's a POST request for registration
  //         body: JSON.stringify({data: encryptData({ booking:booking })}),
  //         headers: {
  //           'Content-Type': 'application/json', // Ensure the backend understands the JSON body
  //         },
  //       })
  //         .then((response) => {
  //           const badRequestError = response.status >= 400 && response.status < 500;
  //           if (!response.ok && !badRequestError) {
  //             alert(response.statusText);
  //             throw new Error('Unknown Error');
  //           }
  //           return response.json();
  //         })
  //         .then((resBody) => {
  //           if (resBody.message) {
  //             alert(resBody.message);
  //           } else {
  //             const booking = resBody.result as Booking;
  //             console.log(booking);
  //             // TODO handle success
  //           }
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         })
  // }

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        className="bg-green-500 px-4 py-2 m-2 rounded hover:bg-green-700 transition w-full dark:bg-green-700 dark:hover:bg-green-500"
        onClick={toggleForm}
        disabled={!event.isOngoing()}
      >
        {event.isOngoing()? "Booking":"Passed"}
      </button>
      {isOpen && (
        <form
          ref={formRef}
          className="absolute right-[-4px] mt-3 w-64 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded shadow-lg p-4 z-10"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Choose a date
            </label>
            <DatePicker
              id="date"
              className="mt-1 block w-full border rounded px-2 py-1 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-300"
              selected={selectedDate? new Date(selectedDate):null}
              filterDate={(date:Date) => event.openDays[date.getDay()]}
              minDate={new Date(minValidDate)}
              maxDate={new Date(lastValidDate)}
              onChange={handleDateChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="tickets" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Number of tickets
            </label>
            <select
              id="tickets"
              className="mt-1 block w-full border rounded px-2 py-1 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-300"
              value={selectedTickets}
              onChange={handleTicketsChange}
            >
              {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className={`w-full px-4 py-2 rounded ${
              isBookEnabled
                ? "bg-green-500 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-500"
                : "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500"
            }`}
            disabled={!isBookEnabled}
          >
            Confirm Booking
          </button>
        </form>
      )}
    </div>
  );
}

export default BookingButton;
