import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authActions";
import ModeToggle from "./ModeToggle/ModeToggle.jsx";
import ThemeToggle from "./ThemeToggle/ThemeToggle.jsx";
import LogoIcon from "../../assets/svg/profile/LogoIcon.jsx";
import LoginIcon from "../../assets/svg/profile/LoginIcon.jsx";

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const emailPrefix = user?.email ? user.email.split("@")[0] : "Guest";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="bg-light-bg/90 dark:bg-dark-bg/90 fixed z-50 flex w-full max-w-screen flex-wrap items-center justify-between p-4 text-base leading-normal font-semibold">
      <div className="flex w-full items-center justify-between">
        <Link
          to="/"
          className="flex cursor-pointer items-center justify-start gap-2"
        >
          <LogoIcon />
        </Link>
        <div className="absolute left-1/2 flex -translate-x-1/2 transform items-center justify-center gap-8">
          <Link
            to="/"
            className="after:bg-accent relative cursor-pointer after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:transition-all after:duration-400 hover:after:w-full"
          >
            Home
          </Link>
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
          <div className="hidden gap-5 sm:flex">
            <ModeToggle />
            <ThemeToggle />
          </div>
          {isAuthenticated ? (
            <button onClick={handleLogout}>{emailPrefix}</button>
          ) : (
            <Link to="/Login">
              <LoginIcon />
            </Link>
          )}
        </div>
      </div>
      <div className="flex w-full items-center justify-end gap-2 max-[450px]:flex sm:hidden">
        <ModeToggle />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Navigation;
