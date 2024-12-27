
import { accountExamples } from '@/utils/examplesData';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
      console.log("GET test");
      return NextResponse.json({
        message: 'TEST',
        accounts: accountExamples
      });
    } catch (error) {
      console.error('Error creating collections in MongoDB:', error);
      return NextResponse.json({ message: `Error creating collections: ${error}` }, { status: 500 });
    }
  }