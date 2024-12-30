import React, { useState } from "react";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="max-w-[1000px] w-full mx-auto relative">
      <div className="bg-blue-400 dark:bg-blue-500 p-4 flex justify-between">
        {/* Mobile Menu Button */}
        <button className="block sm:hidden" id="menuButton" onClick={toggleMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 448 512">
            <path
              fill="currentColor"
              d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        <div
          className={`absolute top-[56px] left-0 bg-blue-300 p-3 w-full z-10 ${
            isMenuOpen ? "block" : "hidden"
          }`}
          id="ddMenu"
        >
          <button className="block py-1 px-2" id="home2Btn">TouRingo</button>
          <button className="block py-1 px-2" id="profile2Btn">Profile</button>
          <button className="block py-1 px-2" id="logout2Btn">Log out</button>
        </div>

        {/* Desktop Menu */}
        <div className="justify-start gap-4 hidden sm:flex">
          <button id="homeBtn">TouRingo</button>
          <button id="profileBtn">Profile</button>
          <button id="logoutBtn">Log out</button>
        </div>

        {/* Theme Toggle and GitHub Link */}
        <div className="justify-end gap-4 hidden sm:flex">
          <button className="dark:hidden block" id="themeToggleBtn">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              {/* Add SVG path details here */}
            </svg>
          </button>
          <button className="hidden dark:block" id="themeToggleBtnDark">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              {/* Add SVG path details here */}
            </svg>
          </button>
          <a
            href="https://github.com/ShlomiFridman/WebProject2025/tree/prototype"
            style={{
              display: "inline-flex",
              alignItems: "center",
              textDecoration: "none",
              padding: "8px 12px",
              borderRadius: "5px",
              fontSize: "16px",
              fontFamily: "Arial, sans-serif",
              transition: "background-color 0.3s",
            }}
          >
            <span className="sr-only">Repo</span>
            <svg viewBox="0 0 16 16" className="w-5 h-5" fill="currentColor" aria-hidden="true" style={{ marginRight: "8px", width: "20px", height: "20px" }}>
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
