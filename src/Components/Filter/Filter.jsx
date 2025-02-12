import filter from "../../assets/svg/profile/list.svg";

function Filter({ open, toggle }) {
  return (
    <div
      onClick={toggle}
      className="hover:bg-gray-300 w-[4rem] min-w-[4rem] h-[3rem] rounded-r-lg border-l-2 border-black flex justify-center items-center cursor-pointer"
    >
      <img src={filter} alt="" className="w-[2.25rem]" />
    </div>
  );
}

export default Filter;
