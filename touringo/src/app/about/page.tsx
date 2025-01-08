"use client"

import { useRouter } from 'next/navigation';
import { MainLayout } from "../../components/layout"

export default function About() {
    const router = useRouter()
    return (
        <MainLayout title='About'>
            <div className="max-w-[1000px] my-4 mx-auto">
                <div className="max-w-[1000px] my-4 mx-auto text-3xl text-blue-600 font-bold">About</div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => router.push("/")}
                >
                    Go Home
                </button>
            </div>
        </MainLayout>
    )
}
