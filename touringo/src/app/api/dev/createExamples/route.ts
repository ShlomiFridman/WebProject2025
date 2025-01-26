import { NextResponse } from 'next/server';
import { createExamples } from '../dev_module';
import { bookingExamples } from '@/utils/examplesData';

/**
 * Handles the POST request to create and insert example data into the database.
 * 
 * This function calls `createExamples` to create sample collections and logs the process. 
 * Responds with a success or error message based on the operation outcome.
 * 
 * @returns A JSON response indicating success or failure.
 */
export async function POST() {
  try {
    console.log("Starting the create and insert examples process");

    // Create and insert examples
    await createExamples();

    console.log("Finished the create and insert examples process");
    return NextResponse.json({
      message: "Examples created successfully"
    });
  } catch (error) {
    console.error('Error inserting sample users into MongoDB:', error);
    return NextResponse.json(
      { message: `Error creating collections: ${error}` },
      { status: 500 } // Internal Server Error
    );
  }
}

/**
 * Handles the GET request for testing purposes.
 * 
 * This function returns the `bookingExamples` object for debugging or demonstration purposes.
 * Responds with the test data and a success message.
 * 
 * @returns A JSON response containing the `bookingExamples` data or an error message.
 */
export async function GET() {
  try {
    console.log("GET test");

    // Return test data for booking examples
    return NextResponse.json({
      message: 'TEST',
      result: bookingExamples
    });
  } catch (error) {
    console.error('Error creating collections in MongoDB:', error);
    return NextResponse.json(
      { message: `Error creating collections: ${error}` },
      { status: 500 } // Internal Server Error
    );
  }
}
