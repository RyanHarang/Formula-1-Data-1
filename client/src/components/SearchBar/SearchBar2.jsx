import DropdownItem from "./Dropdown/DropdownItem/DropdownItem.jsx";
import DropdownMenu from "./Dropdown/DropdownMenu/DropdownMenu.jsx";
import SearchIcon from "../../assets/svg/Search.jsx";

const SearchBar2 = ({
  setActiveTab,
  activeTab,
  searchQuery,
  setSearchQuery,
}) => {
  const filterItems = [
    { label: "Upcoming Races", value: "upcomingRaces" },
    { label: "Past Races", value: "pastRaces" },
  ];

  return (
    <div className="relative flex h-[20%] w-full justify-center px-4 pt-4 pb-4">
      <div className="border-light-fg dark:border-dark-fg relative flex w-full max-w-[30rem] items-center rounded-lg bg-white dark:border-2 dark:bg-black">
        <div className="p-2 pl-3">
          <SearchIcon />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search"
          className="caret-light-fg dark:caret-dark-fg relative h-[3rem] w-full border-none focus:outline-none"
        />
      </div>
      <div className="pl-2">
        <DropdownMenu
          content={
            <>
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

export default SearchBar2;
