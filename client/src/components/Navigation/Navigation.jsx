import { Link } from "react-router";
import ModeToggle from "./ModeToggle/ModeToggle.jsx";
import ThemeToggle from "./ThemeToggle/ThemeToggle.jsx";
import LogoIcon from "../../assets/svg/profile/LogoIcon.jsx";
import LoginIcon from "../../assets/svg/profile/LoginIcon.jsx";

function Navigation() {
  return (
    <header className="bg-light-bg/90 dark:bg-dark-bg/90 fixed z-50 inline-flex h-[10vh] min-h-[50px] w-full items-center justify-between p-4 text-base leading-normal font-semibold">
      <div className="flex cursor-pointer items-center justify-start gap-2">
        <LogoIcon />
      </div>
      <div className="flex items-center justify-start gap-8">
        <Link to="/" className="cursor-pointer">
          Drivers
        </Link>
        <Link to="/Teams" className="cursor-pointer">
          Teams
        </Link>
        <Link to="/Race" className="cursor-pointer">
          Race
        </Link>
      </div>
      <div className="flex items-center justify-end gap-3">
        <ModeToggle />
        <ThemeToggle />
        <LoginIcon />
      </div>
    </header>
  );
}

export default Navigation;
