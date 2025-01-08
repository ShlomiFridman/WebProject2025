import React from 'react';
import { MainLayout } from "@/components/layout"
import { ThemeProvider } from '@/context/ThemeProvider';

const page = () => {
  return (
    <ThemeProvider>
    <MainLayout title='bookings'>
      <div className="max-w-[1000px] my-4 mx-auto">
        <div className="text-3xl text-green-600 font-bold pb-4">Booking</div>
        <div>
          lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </div>
      </div>
    </MainLayout>
    </ThemeProvider>
  );
};

export default page;