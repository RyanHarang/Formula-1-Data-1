import DropdownItem from "./Dropdown/DropdownItem/DropdownItem.jsx";
import DropdownMenu from "./Dropdown/DropdownMenu/DropdownMenu.jsx";
import SearchIcon from "../../assets/svg/Search.jsx";

const SearchBar = ({
  setActiveTab,
  activeTab,
  searchQuery,
  setSearchQuery,
}) => {
  const filterItems = [
    { label: "Active Drivers", value: "activeDrivers" },
    { label: "DOB", value: "dob" },
    { label: "Last Year", value: "lastYear" },
    { label: "Total Races", value: "totalRaces" },
    { label: "Wins", value: "wins" },
    { label: "Name", value: "name" }
  ];
  return (
    <div className="relative flex h-[20%] w-full justify-center px-4 pt-4 pb-4">
      <div className="border-dark-fg dark:border-dark-fg hover:border-accent transition-all duration-300 relative flex w-full max-w-[30rem] items-center rounded-lg border-2 bg-white dark:border-2 dark:bg-black">
        <div className="p-2 pl-3">
          <SearchIcon />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search"
          className="text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 caret-light-fg dark:caret-dark-fg relative h-[3rem] w-full border-none bg-transparent focus:outline-none"
        />
      </div>
      <div className="pl-2">
        <DropdownMenu
          content={
            <>
            <div className="border-b-1 w-[80%] text-center select-none">
              <p>Sort By</p>
            </div>
              {filterItems.map((item) => (
                <DropdownItem
                  key={item.value}
                  onClick={() => setActiveTab(item.value)}
                  isActive={activeTab === item.value}
                >
                  {item.label}
                </DropdownItem>
              ))}
            </>
          }
        />
      </div>
    </div>
  );
};

export default SearchBar;
