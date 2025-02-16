import filter from "../../assets/svg/profile/list.svg";

function Filter({ open, toggle }) {
  return (
    <div
      onClick={toggle}
      className="border-light-fg dark:border-dark-fg hover:bg-light-bg2 dark:hover:bg-dark-bg2 flex h-[3rem] w-[4rem] min-w-[4rem] cursor-pointer items-center justify-center rounded-r-lg border-l-2"
    >
      <img src={filter} alt="Filter options" className="w-[2.25rem]" />
    </div>
  );
}

export default Filter;
