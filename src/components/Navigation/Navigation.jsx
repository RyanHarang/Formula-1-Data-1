import login from "../../assets/svg/profile/log-in.svg";
import logo from "../../assets/svg/profile/logo.svg";
import { Link } from "react-router";

function Navigation() {
  return (
    <div className="bg-light-bg dark:bg-dark-bg text-light-fg dark:text-dark-fg inline-flex h-[10vh] min-h-[50px] w-full items-center justify-between p-4 text-base leading-normal font-semibold">
      <div className="flex cursor-pointer items-center justify-start gap-2">
        <img src={logo} alt="Login" />
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
      <img src={login} alt="Login" className="cursor-pointer" />
    </div>
  );
}

export default Navigation;
