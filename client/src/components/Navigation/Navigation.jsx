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
  const emailPrefix = user ? user.email.split("@")[0] : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="bg-light-bg/90 dark:bg-dark-bg/90 fixed z-50 grid w-full grid-cols-3 p-4 text-base leading-normal font-semibold">
      <Link
        to="/"
        className="flex cursor-pointer items-center justify-start gap-2"
      >
        <LogoIcon />
      </Link>
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
        {isAuthenticated ? (
          <button onClick={handleLogout}>{emailPrefix}</button>
        ) : (
          <Link to="/Login">
            <LoginIcon />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navigation;
