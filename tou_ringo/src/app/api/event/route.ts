// src/app/api/login/route.ts

// Hardcoded users (you can replace this with actual database logic)
const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
    { id: 3, name: 'Alice Smith' },
  ];
  
  // Handle GET request (login + fetch users)
  export async function GET(req: Request) {
    // Get username and password from query parameters
    const url = new URL(req.url);
  
  
    // If authenticated, return the list of users
    return new Response(JSON.stringify(users), { status: 200 });
  }
  
// TODO GET - get events - params: username
//		if the username is empty (or null) get all events
//		else get the events created by the username

// TODO POST - create event - params: event object

// TODO PUT - update event - params: event id, event object

// TODO DELETE - remove event - params: event id
