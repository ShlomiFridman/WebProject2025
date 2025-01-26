"use client"; // Marks this component as a client-side component

/**
 * A functional component that displays a simple loading indicator with a spinner and a message.
 */
export default function LoadingBox() {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex items-center space-x-4">
            {/* Spinner element with animation */}
            <div className="animate-spin h-8 w-8 border-4 border-t-transparent border-blue-500 rounded-full"></div>
            {/* Loading text */}
            <span>Loading...</span>
        </div>
    );
}
