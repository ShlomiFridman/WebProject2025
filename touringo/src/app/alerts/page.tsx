"use client";
import LoadingBox from '@/components/LoadingBox';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

// this page will be disabled until the feature is added
const AlertsPage = () => {
  const router = useRouter();

  useEffect(()=>{
    router.push("/404");
  },[router]);
  return (
    // <div>
    //   <h1>Welcome to the alerts Page!</h1>
    // </div>
    <LoadingBox/>
  );
};

export default AlertsPage;