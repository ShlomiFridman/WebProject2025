'use client';

import { useRouter } from 'next/navigation';
import { MainLayout } from "../components/layout"

const NotFoundPage = () => {
    const router = useRouter();

    const goHome = () => {
        router.push('/');
    };

    return (
        <MainLayout>
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
            <h1 className="text-6xl font-bold text-red-800 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-6">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
            <button
                onClick={goHome}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
                Go Back Home
            </button>
        </div>
        </MainLayout>
    );
};

export default NotFoundPage;