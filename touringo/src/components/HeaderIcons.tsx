"use client";
// import { useState } from "react";
import { useTheme } from '@/context/ThemeProvider';
// import Link from "next/link";

const HeaderIcons: React.FC = () => {
  const { theme, toggleTheme } = useTheme(); // Use theme context
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown toggle state

  // const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // const markAllAsRead = () => {
  //   console.log("All alerts marked as read!");
  //   setIsDropdownOpen(false); // Close the dropdown
  // };

  return (
    <div className="flex justify-end gap-4">
      {/* Alert Icon */}
      {/* hidden until the feature is added */}
      {/* <div className={`relative hidden ${!loginFlag ? 'hidden' : ''}`}>
        <button
          onClick={toggleDropdown}
          className="p-2 rounded-full cursor-pointer focus:outline-none"
          aria-label="Notifications"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6"
            fill="none"
          >
            <path
            strokeWidth={1}
              className="fill-gray-800 dark:fill-gray-100"
              d="M11.5 1C10.9477 1 10.5 1.44772 10.5 2V3H9.99998C7.23864 3 4.99999 5.23825 4.99999 7.99975V11C4.99999 11.7377 4.76718 12.5722 4.39739 13.4148C4.03165 14.2482 3.55876 15.0294 3.14142 15.6439C2.38188 16.7624 2.85216 18.5301 4.40564 18.8103C5.42144 18.9935 6.85701 19.2115 8.54656 19.3527C8.54454 19.4015 8.54352 19.4506 8.54352 19.5C8.54352 21.433 10.1105 23 12.0435 23C13.9765 23 15.5435 21.433 15.5435 19.5C15.5435 19.4482 15.5424 19.3966 15.5402 19.3453C17.1921 19.204 18.596 18.9903 19.5943 18.8103C21.1478 18.5301 21.6181 16.7624 20.8586 15.6439C20.4412 15.0294 19.9683 14.2482 19.6026 13.4148C19.2328 12.5722 19 11.7377 19 11V7.99975C19 5.23825 16.7613 3 14 3H13.5V2C13.5 1.44772 13.0523 1 12.5 1H11.5ZM12 19.5C12.5113 19.5 13.0122 19.4898 13.4997 19.4715C13.5076 20.2758 12.8541 20.9565 12.0435 20.9565C11.2347 20.9565 10.5803 20.2778 10.5872 19.4747C11.0473 19.491 11.5191 19.5 12 19.5ZM9.99998 5C8.34305 5 6.99999 6.34298 6.99999 7.99975V11C6.99999 12.1234 6.65547 13.2463 6.22878 14.2186C5.79804 15.2 5.25528 16.0911 4.79599 16.7675C4.78578 16.7825 4.78102 16.7969 4.77941 16.8113C4.77797 16.8242 4.77919 16.8362 4.78167 16.8458C6.3644 17.1303 9.00044 17.5 12 17.5C14.9995 17.5 17.6356 17.1303 19.2183 16.8458C19.2208 16.8362 19.222 16.8242 19.2206 16.8113C19.2189 16.7969 19.2142 16.7825 19.204 16.7675C18.7447 16.0911 18.2019 15.2 17.7712 14.2186C17.3445 13.2463 17 12.1234 17 11V7.99975C17 6.34298 15.6569 5 14 5H9.99998Z"
              />
          </svg>
        </button> */}

        {/* Dropdown */}
        {/* {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 border rounded-md shadow-md bg-white dark:bg-[#292b2f]">
            <div className="p-4 text-sm">No new notifications.</div>
            <button
              onClick={markAllAsRead}
              className="w-full px-4 py-2 text-left text-sm focus:outline-none"
            >
              Mark all as read
            </button>
          </div>
        )}
      </div> */}


      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="flex items-center justify-center w-10 h-10 rounded-full focus:outline-none"
        aria-label="Toggle Theme"
      >
        {theme === 'light' ? (
          // Light Theme Icon (Original)
          <svg
            viewBox="0 0 22 22"
            fill="none"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
            aria-hidden="true"
          >
            <path
              d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z"
              className="fill-slate-800 dark:fill-slate-800"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z"
              className="fill-slate-800 dark:fill-slate-800"
            ></path>
          </svg>
        ) : (
          // Dark Theme Icon (Original)
          <svg
            viewBox="0 0 22 22"
            fill="none"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
            aria-hidden="true"
          >
            <path
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              className="stroke-slate-100 dark:stroke-slate-100"
            ></path>
            <path
              d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836"
              className="stroke-slate-100 dark:stroke-slate-100"
            ></path>
          </svg>
        )}
      </button>

      {/* GitHub Repo Link */}
      <a
        href="https://github.com/ShlomiFridman/WebProject2025/tree/dev"
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center py-2 px-3 text-base font-medium text-gray-900 dark:text-gray-100 rounded-md`}
      >
        <span className="sr-only">GitHub Repository</span>
        <svg
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-6 h-6"
          aria-hidden="true"
        >
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
        </svg>
      </a>

      {/* <Link
        href="/login"
        className={`inline-flex items-center py-2 px-3 text-base font-medium text-gray-900 dark:text-gray-100 rounded-md ${!loginFlag ? 'hidden' : ''}`}>
        <span className="sr-only">Login</span>
        <svg
          viewBox="0 0 16 16"
          className="w-6 h-6"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12.207 9H5V7h7.136L11.05 5.914 12.464 4.5 16 8.036l-3.536 3.535-1.414-1.414L12.207 9zM10 4H8V2H2v12h6v-2h2v4H0V0h10v4z"></path>
        </svg>
      </Link> */}
    </div>
  );
};

export default HeaderIcons;
