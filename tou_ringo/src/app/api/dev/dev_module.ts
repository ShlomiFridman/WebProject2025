import { accountExamples, bookingExamples, eventExamples, imageExamples, reviewExamples } from "@/utils/examplesData";
import * as Models from "@/db_utils/collectionModels";

export async function createExamples() {
    const results = await Promise.allSettled([
        Models.AccountModel.insertMany(accountExamples),
        // Models.TR_ImageModel.insertMany(imageExamples),
        Models.TR_EventModel.insertMany(eventExamples),
        Models.BookingModel.insertMany(bookingExamples),
        Models.ReviewModel.insertMany(reviewExamples),
    ]);

    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            console.log(`Insert operation ${index + 1} completed successfully.`);
        } else {
            console.error(`Insert operation ${index + 1} failed:`, result.reason);
        }
    });

    if (results.some((result) => result.status === "rejected")) {
        throw new Error("One or more insert operations failed.");
    }

    console.log("All example data insertion attempts completed.");
}
