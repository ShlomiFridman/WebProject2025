import { BookingModel} from "@/db_utils/collectionModels";
import { Booking } from "@/utils/classes";

// Get all bookings by a specific user
export async function getBookingsByUser(creator_username: String) {
    try {
        const bookings = await BookingModel.find(
            { creator_username: creator_username, isActive: true }
        );
        return bookings;
    } catch (err) {
        console.error(`getBookingsByUser - Error fetching bookings for creator_username=${creator_username}:`, err);
        throw err;
    }
}
// TODO post new booking
export async function postNewBooking(newBooking: Booking) {
    try {
        const lastBooking = await BookingModel.findOne() // No filter, get all users
            .sort({ booking_id: -1 }) // Sort by userId in descending order
            .exec(); // Execute the query
        newBooking.booking_id = lastBooking.booking_id+1;
        const savedBooking = await BookingModel.create(newBooking);
        console.log(`New booking created: ${savedBooking}`);
        return savedBooking;
    } catch (err) {
        console.error("postNewBooking - Error creating a new booking:", err);
        throw err;
    }
}
// TODO delete booking by id
export async function deleteBookingById(booking_id: number) {
    try {
        // using booking_id as the unique identifier (not objectId)
        const result = await BookingModel.findOneAndUpdate(
            { booking_id: booking_id, isActive: true },
            { isActive: false },
            { new: true },
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