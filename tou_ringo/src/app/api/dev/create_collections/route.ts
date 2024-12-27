
import { NextResponse } from 'next/server';
import { createCollections } from '../dev_module';

export async function POST() {
    try {
      
      await createCollections();

      // Return a success message with inserted data
      return NextResponse.json({
        message: 'Collections created'
      });
    } catch (error) {
      console.error('Error creating collections in MongoDB:', error);
      return NextResponse.json({ message: `Error creating collections: ${error}` }, { status: 500 });
    }
  }