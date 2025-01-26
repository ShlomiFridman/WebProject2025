import { ReviewModel } from "@/db_utils/collectionModels";
import { MongooseError, Review } from "@/utils/classes";

/**
 * Retrieves all reviews for a specific event, sorted by date in descending order.
 * @param event_id The ID of the event for which reviews are to be fetched
 * @returns A promise resolving to an array of Review objects
 * @throws Any errors that occur during the database query
 */
export async function getReviewsByEventId(event_id: number): Promise<Review[]> {
    try {
        const res = await ReviewModel.find({ event_id }).sort({ date: -1 });
        return res;
    } catch (err) {
        throw err;
    }
}

/**
 * Retrieves the review associated with a specific booking ID.
 * @param booking_id The ID of the booking for which the review is to be fetched
 * @returns A promise resolving to a Review object if found, or null if not found
 * @throws Any errors that occur during the database query
 */
export async function getReviewsByBookingId(booking_id: number): Promise<Review[]> {
    try {
        const res = await ReviewModel.findOne({ booking_id });
        return res;
    } catch (err) {
        throw err;
    }
}

/**
 * Creates a new review in the database.
 * If a duplicate key error occurs (likely from a unique index violation), it logs the error and returns null.
 * @param newReview The review data to be created
 * @returns A promise resolving to the created Review object, or null if a duplicate error occurs
 * @throws Any other errors that occur during the review creation
 */
export async function createReview(newReview: Review): Promise<Review | null> {
    try {
        const reviewRes = await ReviewModel.create(newReview);
        console.log(reviewRes);
        return reviewRes;
    } catch (err) {
        const mongoError = err as MongooseError;
        if (mongoError.code === 11000) { // Handle duplicate key error
            console.error('Review - Duplicate key error:', mongoError.message);
            return null;
        } else {
            throw err;
        }
    }
}
