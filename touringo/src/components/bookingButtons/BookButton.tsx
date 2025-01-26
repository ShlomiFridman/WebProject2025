// Importing necessary modules, classes, and components
import { Booking, TR_Event } from "@/utils/classes";
import { myStyles } from "@/components/styles";
import { getLoggedAccount } from "@/utils/util_client";
import { dateToFormat, encryptData, getMaxDate } from "@/utils/utils";
import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker"; // External date picker component
import "react-datepicker/dist/react-datepicker.css"; // Styles for the date picker

// Defining the props interface for the BookingButton component
interface BookingButtonProps {
  event: TR_Event; // Event object passed as a prop
}

// BookingButton component definition
function BookingButton({ event }: BookingButtonProps) {
  const [isOpen, setIsOpen] = useState(false); // State to manage the visibility of the booking form
  const validDates = event.getValidDates(); // Array of valid dates for the event
  const lastValidDate = validDates[validDates.length - 1]; // Last valid date
  const today = new Date(); // Current date
  const minValidDate = getMaxDate(dateToFormat(today), validDates[0]); // Minimum valid date for booking

  // Current date in string format
  const todayString = today.toISOString().split("T")[0];

  // State for selected date, defaulting to the minimum valid date
  const [selectedDate, setSelectedDate] = useState(minValidDate);

  // State for the number of tickets selected, defaulting to 1
  const [selectedTickets, setSelectedTickets] = useState(1);

  // State to enable or disable the booking button
  const [isBookEnabled, setIsBookEnabled] = useState(true);

  // References to the form and button elements
  const formRef = useRef<HTMLFormElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // Effect to handle clicks outside the booking form
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        formRef.current &&
        !formRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false); // Close the form if clicked outside
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside); // Add event listener when form is open
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Clean up event listener
    };
  }, [isOpen]);

  // Handler for date changes in the date picker
  const handleDateChange = (date: Date | null) => {
    if (date) setSelectedDate(dateToFormat(date)); // Update the selected date
  };

  // Handler for changes in the number of tickets
  const handleTicketsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tickets = parseInt(e.target.value, 10); // Parse ticket count from input
    setSelectedTickets(tickets); // Update state
    validateBooking(selectedDate, tickets); // Validate the booking
  };

  // Function to validate the booking based on date and ticket count
  const validateBooking = (date: string, tickets: number) => {
    if (date && tickets > 0) {
      const selectedDateTime = new Date(date); // Convert date string to Date object
      if (selectedDateTime >= new Date(todayString)) {
        setIsBookEnabled(true); // Enable booking if valid
        return;
      }
    }
    setIsBookEnabled(false); // Disable booking if invalid
  };

  // Handler for form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form behavior
    if (isBookEnabled) {
      const username = getLoggedAccount()?.username; // Get logged-in username
      if (!username) return; // Return if username is not found
      const newBooking = new Booking(-1, username, event.event_id, selectedDate, selectedTickets, true); // Create a new booking instance
      createBooking(newBooking); // Call the function to create booking
    }
  };

  // Toggle the visibility of the booking form
  const toggleForm = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering outside click handler
    setIsOpen((prev) => !prev); // Toggle form visibility
  };

  // Function to create a booking by sending a request to the backend
  const createBooking = (booking: Booking) => {
    if (buttonRef.current) buttonRef.current.disabled = true; // Disable the button to prevent multiple clicks
    fetch('/api/bookings/create', {
      method: 'POST', // HTTP POST request
      body: JSON.stringify({ data: encryptData({ booking: booking }) }), // Encrypted booking data
      headers: {
        'Content-Type': 'application/json', // Specify content type as JSON
      },
    })
      .then((response) => {
        const badRequestError = response.status >= 400 && response.status < 500;
        if (!response.ok && !badRequestError) {
          alert(response.statusText); // Alert on server error
          throw new Error('Unknown Error'); // Throw error for unknown issues
        }
        return response.json(); // Parse response JSON
      })
      .then((resBody) => {
        if (resBody.message) {
          alert(resBody.message); // Alert if there is a message
        } else {
          const booking = resBody.result as Booking; // Extract booking result
          console.log(`Booking created, booking_id=${booking.booking_id}`); // Log booking ID
          if (buttonRef.current) buttonRef.current.disabled = false; // Re-enable the button
          setIsOpen(false); // Close the form
          alert("The booking has been created. You may cancel it anytime up until the day of the event."); // Confirmation message
        }
      })
      .catch((err) => {
        console.log(err); // Log any errors
      });
  };

  // Render the booking button and form
  return (
    <div className="relative">
      <button
        ref={buttonRef}
        className={`${!event.hasPassed()
          ? `${myStyles.button_green} px-4 py-2 m-2 rounded transition w-full`
          : "px-8 py-2 m-2"}`} 
        onClick={toggleForm}
        disabled={event.hasPassed()} // Disable button if the event has passed
      >
        {!event.hasPassed() ? "Booking" : "Ended"} {/* Button label */}
      </button>
      {isOpen && ( // Render form only if isOpen is true
        <form
          ref={formRef}
          className="absolute right-[-4px] mt-3 w-64 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded shadow-lg p-4 z-10"
          onSubmit={handleSubmit}
        >
          {/* Date picker field */}
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Choose a date
            </label>
            <DatePicker
              id="date"
              className="mt-1 block w-full border rounded px-2 py-1 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-300"
              selected={selectedDate ? new Date(selectedDate) : null}
              filterDate={(date: Date) => event.openDays[date.getDay()]} // Filter valid dates
              minDate={new Date(minValidDate)} // Set minimum date
              maxDate={new Date(lastValidDate)} // Set maximum date
              onChange={handleDateChange} // Handle date change
            />
          </div>
          {/* Ticket selection field */}
          <div className="mb-4">
            <label htmlFor="tickets" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Number of tickets
            </label>
            <select
              id="tickets"
              className="mt-1 block w-full border rounded px-2 py-1 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-300"
              value={selectedTickets}
              onChange={handleTicketsChange} // Handle ticket count change
            >
              {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num} {/* Render ticket options */}
                </option>
              ))}
            </select>
          </div>
          {/* Submit button */}
          <button
            type="submit"
            className={`w-full px-4 py-2 rounded ${isBookEnabled
                ? "bg-green-500 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-500"
                : "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500"
              }`}
            disabled={!isBookEnabled} // Disable button if booking is invalid
          >
            Confirm Booking
          </button>
        </form>
      )}
    </div>
  );
}

export default BookingButton; // Export the component
