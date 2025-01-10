"use client"

import { useRouter } from 'next/navigation';

export default function About() {
    const router = useRouter()
    return (
            <div className="max-w-[1000px] my-4 mx-auto">
                <div className="max-w-[1000px] my-4 mx-auto text-3xl text-green-600 font-bold">About</div>
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => router.push("/")}
                >
                    Go Home
                </button>
            </div>
    )
}
