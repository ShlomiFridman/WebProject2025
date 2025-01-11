
import { accountExamples } from '@/utils/examplesData';
import { encryptData } from '@/utils/utils';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
      console.log("GET test");
      return NextResponse.json({
        message: 'TEST',
        data: encryptData({name:"Bob", age:18}),
        result: accountExamples
      });
    } catch (error) {
      console.error('Error creating collections in MongoDB:', error);
      return NextResponse.json({ message: `Error creating collections: ${error}` }, { status: 500 });
    }
  }