import { Link } from "react-router";
import ModeToggle from "./ModeToggle/ModeToggle.jsx";
import ThemeToggle from "./ThemeToggle/ThemeToggle.jsx";
import LogoIcon from "../../assets/svg/profile/LogoIcon.jsx";
import LoginIcon from "../../assets/svg/profile/LoginIcon.jsx";

function Navigation() {
  return (
    <header className="bg-light-bg/90 dark:bg-dark-bg/90 fixed z-50 grid w-full grid-cols-3 p-4 text-base leading-normal font-semibold">
      <div className="flex cursor-pointer items-center justify-start gap-2">
        <LogoIcon />
      </div>
      <div className="flex items-center justify-center gap-8">
        <Link
          to="/"
          className="after:bg-accent relative cursor-pointer after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:transition-all after:duration-400 hover:after:w-full"
        >
          Drivers
        </Link>
        <Link
          to="/Teams"
          className="after:bg-accent relative cursor-pointer after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:transition-all after:duration-400 hover:after:w-full"
        >
          Teams
        </Link>
        <Link
          to="/Race"
          className="after:bg-accent relative cursor-pointer after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:transition-all after:duration-400 hover:after:w-full"
        >
          Race
        </Link>
      </div>
      <div className="flex items-center justify-end gap-5">
        <ModeToggle />
        <ThemeToggle />
        <LoginIcon />
      </div>
    </header>
  );
}

export default Navigation;
