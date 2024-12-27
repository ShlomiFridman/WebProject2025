
import { NextResponse } from 'next/server';
import DB_Service from '@/utils/dbService';

export async function POST() {
    try {
      
    } catch (error) {
      console.error('Error inserting sample users into MongoDB:', error);
      return NextResponse.json({ message: `Error creating collections: ${error}` }, { status: 500 });
    }
  }