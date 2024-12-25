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
  
// TODO GET - login - params: username, password
//		if invalid username or password return null or 4XX code (such as access denied)

// TODO POST - register - params: user object
//		if invalid data or username already exist, return 4XX code