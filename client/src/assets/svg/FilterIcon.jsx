const Filter = ({ open, toggle }) => {
  return (
    <div
      onClick={toggle}
      className="border-2 border-dark-fg bg-white dark:bg-black dark:border-dark-fg flex w-4 min-w-[4rem] cursor-pointer items-center justify-center rounded-lg hover:border-accent transition-all duration-300"
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        role="img"
        aria-labelledby="filterDesc"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-light-fg dark:stroke-dark-fg w-[2.25rem] p-1 hover:fill-accent transition-all duration-300"
      >
        <desc id="filterDesc">A list icon for showing filter options</desc>
        <path
          d="M16 12H42M16 24H42M16 36H42M6 12H6.02M6 24H6.02M6 36H6.02"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default Filter;
