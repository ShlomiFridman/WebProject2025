import { BookingModel } from "@/db_utils/collectionModels";
import { Booking } from "@/utils/classes";

/**
 * Fetches all bookings for a specific user.
 * 
 * Queries the database for bookings where the `creator_username` matches the provided username
 * and sorts the results by date in ascending order.
 * 
 * @param creator_username - The username of the creator to filter bookings.
 * @returns A list of bookings for the specified user.
 */
export async function getBookingsByUser(creator_username: string) {
  try {
    const bookings = await BookingModel.find(
      { creator_username: creator_username }
    ).sort({ date: 1 }); // Sort bookings by date in ascending order
    return bookings;
  } catch (err) {
    console.error(`getBookingsByUser - Error fetching bookings for creator_username=${creator_username}:`, err);
    throw err;
  }
}

/**
 * Creates a new booking.
 * 
 * Retrieves the last booking to calculate the next booking ID, assigns the new ID,
 * and saves the new booking to the database.
 * 
 * @param newBooking - The booking details to be saved.
 * @returns The created booking document.
 */
export async function postNewBooking(newBooking: Booking) {
  try {
    // Retrieve the most recent booking by booking_id in descending order
    const lastBooking = await BookingModel.findOne()
      .sort({ booking_id: -1 }) // Sort by booking_id in descending order
      .exec(); // Execute the query

    // Assign a new booking ID
    newBooking.booking_id = lastBooking.booking_id + 1;

    // Save the new booking to the database
    const savedBooking = await BookingModel.create(newBooking);
    console.log(`New booking created: ${savedBooking}`);
    return savedBooking;
  } catch (err) {
    console.error("postNewBooking - Error creating a new booking:", err);
    throw err;
  }
}

/**
 * Cancels a booking by its ID.
 * 
 * Finds an active booking with the specified `booking_id`, marks it as inactive,
 * and returns the updated booking. If no matching booking is found, returns null.
 * 
 * @param booking_id - The ID of the booking to be canceled.
 * @returns The updated booking document or null if no booking was found.
 */
export async function cancelBookingById(booking_id: number) {
  try {
    // Update the booking to mark it as inactive
    const result = await BookingModel.findOneAndUpdate(
      { booking_id: booking_id, isActive: true }, // Match active bookings with the given ID
      { isActive: false }, // Set `isActive` to false
      { new: true } // Return the updated document
    );

    if (result) {
      console.log(`Booking deleted successfully: id=${booking_id}`);
      return result;
    } else {
      console.log(`No booking found with id: ${booking_id}`);
      return null;
    }
  } catch (err) {
    console.error("Error deleting booking:", err);
    throw err;
  }
}
