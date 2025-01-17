import React, { useState, useEffect, useRef } from "react";

interface BookingDetails {
  date: string;
  tickets: number;
}

interface BookingButtonProps {
  onBook: (details: BookingDetails) => void;
}

function BookingButton({ onBook }: BookingButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setMonth(today.getMonth() + 1);

  const maxDateString = maxDate.toISOString().split("T")[0];
  const todayString = today.toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(todayString); // Default to today's date
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

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setSelectedDate(date);
    validateBooking(date, selectedTickets);
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

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        className="bg-green-500 px-4 py-2 rounded hover:bg-green-700 transition w-full dark:bg-green-700 dark:hover:bg-green-500"
        onClick={toggleForm}
      >
        Book
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
                ? "bg-green-500 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-500"
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
