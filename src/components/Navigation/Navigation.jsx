import login from "../../assets/svg/profile/log-in.svg";
import logo from "../../assets/svg/profile/logo.svg";
import { Link } from "react-router";

function Navigation() {
  return (
    <div className="bg-light-bg dark:bg-dark-bg text-light-fg dark:text-dark-fg w-full h-[10vh] min-h-[50px] justify-between items-center inline-flex p-4 text-base font-semibold leading-normal">
      <div className="justify-start items-center gap-2 flex cursor-pointer">
        <img src={logo} alt="Login" />
      </div>
      <div className="justify-start items-center gap-8 flex">
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
      <img src={login} alt="Login" className="cursor-pointer" />
    </div>
  );
}

export default Navigation;
