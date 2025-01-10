'use client';

import { useRouter } from 'next/navigation';

const NotFoundPage = () => {
    const router = useRouter();

    const goHome = () => {
        router.push('/');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-6xl font-bold text-red-800 mb-4">404</h1>
            <p className="text-xl mb-6">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
            <button
                onClick={goHome}
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
                Go Back Home
            </button>
        </div>
    );
};

export default NotFoundPage;