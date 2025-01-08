import React from 'react';
import { MainLayout } from "../../components/layout"

const page = () => {
  return (
    <MainLayout title='About'>
      <div className="max-w-[1000px] my-4 mx-auto">
        <div className="max-w-[1000px] my-4 mx-auto text-3xl text-blue-600 font-bold">Profile</div>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate placeat repellat ut possimus? Blanditiis perspiciatis architecto quo repellat commodi voluptatem reiciendis fugit recusandae odio! Rem eius laborum iure minima nesciunt.</div>
        </div>
    </MainLayout>

  );
};

export default page;