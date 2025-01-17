"use client"

//import { decryptData, encryptData } from "@/utils/utils";
import { redirect } from 'next/navigation';

// fetch template example
// const user = {
//   name: "John Doe",
//   email: "john@example.com",
//   age: 30
// };

// fetch('https://example.com/P', {
//   method: 'PUT', // Specify the PUT method
//   headers: {
//     'Content-Type': 'application/json', // Make sure the server understands JSON
//   },
//   body: JSON.stringify(user) // Convert the 'User' object to a JSON string
// })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Request failed');
//     }
//     return response.json(); // Parse the JSON response if needed
//   })
//   .then(data => {
//     console.log('Success:', data); // Handle the response data
//   })
//   .catch(error => {
//     console.error('Error:', error); // Handle any errors
//   });


export default function Page() {
  redirect('/home');

  /*const txt = encryptData({test:"TEST"});
  const data = decryptData(txt)
  return (
        <div className="max-w-[1000px] my-4 mx-auto">
          <div className="text-3xl text-green-600 font-bold pb-4">Welcome to TouRingo!</div>
          <div>
            {JSON.stringify(data)}
          </div>
          <div>
            lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </div>

        </div>
  );*/
}