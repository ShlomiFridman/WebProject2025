
import { NextResponse } from 'next/server';
import { createExamples } from '../dev_module';
import { bookingExamples } from '@/utils/examplesData';

export async function POST() {
    try {
      console.log("Starting the create and insert examples process");
      await createExamples();
      console.log("Finished the create and insert examples process");
      return NextResponse.json({
        message: "Examples created successfully"
      });
    } catch (error) {
      console.error('Error inserting sample users into MongoDB:', error);
      return NextResponse.json({ message: `Error creating collections: ${error}` }, { status: 500 });
    }
  }
  
  export async function GET() {
      try {
        console.log("GET test");
        return NextResponse.json({
          message: 'TEST',
          result: bookingExamples
        });
      } catch (error) {
        console.error('Error creating collections in MongoDB:', error);
        return NextResponse.json({ message: `Error creating collections: ${error}` }, { status: 500 });
      }
    }