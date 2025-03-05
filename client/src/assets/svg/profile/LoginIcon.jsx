const LogIn = () => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      role="img"
      aria-labelledby="loginDesc"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      className="stroke-light-fg dark:stroke-dark-fg cursor-pointer fill-none"
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
  );
};

export default LogIn;
