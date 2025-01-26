import { accountExamples } from '@/utils/examplesData';
import { encryptData } from '@/utils/utils';
import { NextResponse } from 'next/server';

/**
 * Handles the GET request for testing and demonstration purposes.
 * 
 * This function returns a test message along with encrypted data and example account data.
 * 
 * @returns A JSON response containing the encrypted data and account examples or an error message.
 */
export async function GET() {
  try {
    console.log("GET test");

    // Encrypt sample data and return it along with example account data
    return NextResponse.json({
      message: 'TEST',
      data: encryptData({ name: "Bob", age: 18 }), // Encrypting data for demonstration
      result: accountExamples // Example account data
    });
  } catch (error) {
    console.error('Error creating collections in MongoDB:', error);
    return NextResponse.json(
      { message: `Error creating collections: ${error}` },
      { status: 500 } // Internal Server Error
    );
  }
}
