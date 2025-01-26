import { accountExamples, bookingExamples, eventExamples, reviewExamples } from "@/utils/examplesData";
import * as Models from "@/db_utils/collectionModels";

/**
 * Inserts example data into multiple collections in the database.
 * 
 * This function uses `insertMany` to insert account, event, booking, and review examples
 * into their respective collections. It handles multiple insert operations concurrently
 * and logs the success or failure of each operation.
 * 
 * @throws Error if any insert operation fails.
 */
export async function createExamples() {
    // Perform all insert operations concurrently and handle their results
    const results = await Promise.allSettled([
        Models.AccountModel.insertMany(accountExamples),  // Insert account data
        Models.TR_EventModel.insertMany(eventExamples),   // Insert event data
        Models.BookingModel.insertMany(bookingExamples),  // Insert booking data
        Models.ReviewModel.insertMany(reviewExamples),    // Insert review data
    ]);

    // Log results of each insert operation
    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            console.log(`Insert operation ${index + 1} completed successfully.`);
        } else {
            console.error(`Insert operation ${index + 1} failed:`, result.reason);
        }
    });

    // If any insert operation failed, throw an error
    if (results.some((result) => result.status === "rejected")) {
        throw new Error("One or more insert operations failed.");
    }

    console.log("All example data insertion attempts completed.");
}
