"use client";
import { useTheme } from '@/context/ThemeProvider';
import { mySvgs } from './svgs';

const HeaderIcons: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex justify-end gap-4 items-center">

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="flex items-center justify-center w-10 h-10 rounded-full focus:outline-none"
        aria-label="Toggle Theme"
      >
        {theme === 'light' ? mySvgs.light_icon : mySvgs.dark_icon}
      </button>

      {/* GitHub Repo Link */}
      <a
        href="https://github.com/ShlomiFridman/WebProject2025/tree/main"
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center py-2 px-3 text-base font-medium rounded-md`}
      >
        <span className="sr-only">GitHub Repository</span>
        {mySvgs.gitHub_icon}
      </a>
    </div>
  );
};

export default HeaderIcons;
