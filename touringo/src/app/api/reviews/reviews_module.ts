import { ReviewModel } from "@/db_utils/collectionModels";
import { Review } from "@/utils/classes";


export async function getReviewsByEventId(event_id: number): Promise<Review[]>{
    try{
        const eventsRes = await ReviewModel.find(
            {event_id: event_id}
        );
        return eventsRes;
    } catch(err){
        throw err;
    }
}

export async function createReview(newReview: Review): Promise<Review>{
    try{
        const reviewRes = await ReviewModel.create(newReview);
        return reviewRes;
    } catch(err){
        throw err;
    }
}
