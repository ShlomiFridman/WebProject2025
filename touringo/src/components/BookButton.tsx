import React, { useState, useEffect, useRef } from "react";

interface BookingDetails {
  date: string;
  time: string;
  tickets: number;
}

interface BookingButtonProps {
  onBook: (details: BookingDetails) => void;
}

function BookingButton({ onBook }: BookingButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedTickets, setSelectedTickets] = useState(1);
  const [isBookEnabled, setIsBookEnabled] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null); // Ref for the button

  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setMonth(today.getMonth() + 1);
  const maxDateString = maxDate.toISOString().split("T")[0];
  const todayString = today.toISOString().split("T")[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
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

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setSelectedDate(date);
    validateBooking(date, selectedTime, selectedTickets);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value;
    setSelectedTime(time);
    validateBooking(selectedDate, time, selectedTickets);
  };

  const handleTicketsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tickets = parseInt(e.target.value, 10);
    setSelectedTickets(tickets);
    validateBooking(selectedDate, selectedTime, tickets);
  };

  const validateBooking = (date: string, time: string, tickets: number) => {
    if (date && time && tickets > 0) {
      const selectedDateTime = new Date(`${date}T${time}`);
      if (selectedDateTime > new Date()) {
        setIsBookEnabled(true);
        return;
      }
    }
    setIsBookEnabled(false);
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef} // Attach the button ref
        className="bg-green-500 px-4 py-2 rounded hover:bg-green-700 transition w-full dark:bg-green-700 dark:hover:bg-green-500"
        onClick={() => setIsOpen((prev) => !prev)} // Toggle dropdown state
      >
        Book
      </button>

      {isOpen && (
        // TODO change to form with onSubmit function
        <div
          ref={dropdownRef}
          className="absolute right-[-4px] mt-3 w-64 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded shadow-lg p-4 z-10"
        >
          {/* TODO add default date as today, show only valid dates */}
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Choose a date
            </label>
            <input
              type="date"
              id="date"
              className="mt-1 block w-full border rounded px-2 py-1 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-300"
              value={selectedDate}
              min={todayString}
              max={maxDateString}
              onChange={handleDateChange}
            />
          </div>

          {/* TODO remove */}
          <div className="mb-4">
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Choose a time
            </label>
            <input
              type="time"
              id="time"
              className="mt-1 block w-full border rounded px-2 py-1 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-300"
              value={selectedTime}
              onChange={handleTimeChange}
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
            className={`w-full px-4 py-2 rounded ${
              isBookEnabled
                ? "bg-green-500 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-500"
                : "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500"
            }`}
            disabled={!isBookEnabled}
            onClick={() =>
              onBook({
                date: selectedDate,
                time: selectedTime,
                tickets: selectedTickets,
              })
            }
          >
            Confirm Booking
          </button>
        </div>
      )}
    </div>
  );
}

export default BookingButton;
