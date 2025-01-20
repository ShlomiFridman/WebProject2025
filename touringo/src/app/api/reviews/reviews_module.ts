import { ReviewModel } from "@/db_utils/collectionModels";
import { MongooseError, Review } from "@/utils/classes";


export async function getReviewsByEventId(event_id: number): Promise<Review[]> {
    try {
        const res = await ReviewModel.find(
            { event_id: event_id }
        ).sort({ date: -1 });
        return res;
    } catch (err) {
        throw err;
    }
}

export async function getReviewsByBookingId(booking_id: number): Promise<Review[]> {
    try {
        const res = await ReviewModel.findOne(
            { booking_id: booking_id }
        );
        return res;
    } catch (err) {
        throw err;
    }
}

export async function createReview(newReview: Review): Promise<Review|null> {
    try {
        const reviewRes = await ReviewModel.create(newReview);
        console.log(reviewRes)
        return reviewRes;
    } catch (err) {
        const mongoError = err as MongooseError;
        if (mongoError.code === 11000) {
            console.error('Review - Duplicate key error:', mongoError.message);
            return null;
        } else {
            throw err;
        }
    }
}
