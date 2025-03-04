import { Link } from "react-router";
import ModeToggle from "../ModeToggle/ModeToggle";

function Navigation() {
  return (
    <div className="inline-flex h-[10vh] min-h-[50px] w-full items-center justify-between p-4 text-base leading-normal font-semibold">
      <div className="flex cursor-pointer items-center justify-start gap-2">
        <svg
          width="31"
          height="24"
          viewBox="0 0 31 24"
          role="img"
          aria-labelledby="logoDesc"
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-accent fill-light-fg dark:fill-dark-fg cursor-pointer"
        >
          <desc id="logoDesc">A list icon for showing filter options</desc>
          <path d="M9.24682 24H0.883182L4.74682 0.727272H12.9514C15.2923 0.727272 17.2355 1.20454 18.7809 2.15909C20.3339 3.11364 21.4286 4.48106 22.065 6.26136C22.7014 8.03409 22.815 10.1515 22.4059 12.6136C22.012 14.9924 21.2279 17.0341 20.0536 18.7386C18.8794 20.4356 17.3756 21.7386 15.5423 22.6477C13.7089 23.5492 11.6105 24 9.24682 24ZM6.50818 19.7841H9.53091C10.993 19.7841 12.2733 19.5114 13.3718 18.9659C14.4779 18.4205 15.3832 17.5795 16.0877 16.4432C16.7998 15.3068 17.3036 13.8523 17.5991 12.0795C17.8794 10.3977 17.8605 9.03409 17.5423 7.98864C17.2317 6.93561 16.6294 6.16667 15.7355 5.68182C14.8415 5.18939 13.6673 4.94318 12.2127 4.94318H8.97409L6.50818 19.7841ZM30.0685 0.727272L26.2049 24H21.2844L25.1481 0.727272H30.0685Z" />
        </svg>
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
      <ModeToggle />
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        role="img"
        aria-labelledby="loginDesc"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-light-fg dark:stroke-dark-fg cursor-pointer"
      >
        <desc id="loginDesc">An icon for logging in</desc>
        <path
          d="M18.75 3.75H23.75C24.413 3.75 25.0489 4.01339 25.5178 4.48223C25.9866 4.95107 26.25 5.58696 26.25 6.25V23.75C26.25 24.413 25.9866 25.0489 25.5178 25.5178C25.0489 25.9866 24.413 26.25 23.75 26.25H18.75M12.5 21.25L18.75 15M18.75 15L12.5 8.75M18.75 15H3.75"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          onClick={() => {
            window.location.href = "/Login";
          }}
        ></path>
      </svg>
    </div>
  );
}

export default Navigation;
