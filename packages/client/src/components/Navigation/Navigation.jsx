import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authActions";
import ModeToggle from "./ModeToggle/ModeToggle.jsx";
import ThemeToggle from "./ThemeToggle/ThemeToggle.jsx";
import LogoIcon from "../../assets/svg/general/LogoIcon.jsx";
import LoginIcon from "../../assets/svg/general/LoginIcon.jsx";
import UserIcon from "../../assets/svg/general/UserIcon.jsx";
import UserDropdown from "./UserDropdown/UserDropdown.jsx";

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const emailPrefix = user?.email ? user.email.split("@")[0] : "Guest";
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    setDropdownOpen(false);
    dispatch(logout());
    navigate("/login");
  };

  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-light-bg/90 dark:bg-dark-bg/90 fixed z-50 flex w-full max-w-screen flex-wrap items-center justify-between p-4 text-base leading-normal font-semibold">
      <div className="flex w-full items-center justify-between">
        <Link to="/" className="flex cursor-pointer items-center justify-start">
          <LogoIcon />
        </Link>
        <div className="absolute left-1/2 flex -translate-x-1/2 transform items-center justify-center gap-4 transition-all duration-300 md:gap-8">
          {isAuthenticated && (
            <Link
              to="/"
              className="after:bg-accent relative cursor-pointer before:transition-all after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:transition-all after:duration-400 hover:after:w-full"
            >
              Home
            </Link>
          )}
          <Link
            to="/Drivers"
            className="after:bg-accent relative cursor-pointer before:transition-all after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:transition-all after:duration-400 hover:after:w-full"
          >
            Drivers
          </Link>
          <Link
            to="/Teams"
            className="after:bg-accent relative cursor-pointer before:transition-all after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:transition-all after:duration-400 hover:after:w-full"
          >
            Teams
          </Link>
          <Link
            to="/Race"
            className="after:bg-accent relative cursor-pointer before:transition-all after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:transition-all after:duration-400 hover:after:w-full"
          >
            Races
          </Link>
        </div>
        <div className="flex items-center gap-5">
          <div className="hidden gap-5 sm:flex">
            <ModeToggle />
            <ThemeToggle />
          </div>
          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={handleDropdownToggle}
                className="flex h-6 w-6 cursor-pointer items-center justify-center"
              >
                <UserIcon />
              </button>
              {dropdownOpen && (
                <UserDropdown
                  emailPrefix={emailPrefix}
                  onLogout={handleLogout}
                />
              )}
            </div>
          ) : (
            <Link to="/Login">
              <LoginIcon />
            </Link>
          )}
        </div>
      </div>
      <div className="flex w-full items-center justify-center gap-2 sm:hidden">
        <ModeToggle />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Navigation;
