"use client"

import { useRouter } from 'next/navigation';

export default function About() {
    const router = useRouter()
    return (
            <div className="max-w-[1000px] my-4 mx-auto">
                <div className="max-w-[1000px] my-4 mx-auto text-3xl text-green-600 font-bold">About</div>
                    TouRingo is a project for "Advanced Web Technologies" Course in Braude College Winter 2025.<br/>
                    Made by Shlomi, Shahar, Omer, and Noam<br/>
                <div className="max-w-[1000px] my-4 mx-auto text-2xl text-green-600 font-bold">Subject</div>
                    <u>**Local Tourism Guide App**:</u> Develop an app that showcases local tourist attractions, restaurants, and cultural events.<br/>Include user reviews, navigation features, and event booking options.
            </div>
    )
}
