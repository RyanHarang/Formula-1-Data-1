import DropdownItem from "../Dropdown/DropdownItem/DropdownItem.jsx";
import DropdownMenu from "../Dropdown/DropdownMenu/DropdownMenu.jsx";

const SearchBar = ({
  setActiveTab,
  activeTab,
  searchQuery,
  setSearchQuery,
}) => {
  const filterItems = [
    { label: "Active Drivers", value: "activeDrivers" },
    { label: "All Drivers", value: "allDrivers" },
  ];

  return (
    <div className="relative flex h-[20%] w-full justify-center px-4 pt-4 pb-4">
      <div className="border-light-fg dark:border-dark-fg relative flex w-full max-w-[30rem] items-center rounded-lg border-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="caret-light-fg dark:caret-dark-fg relative h-[3rem] w-full border-none pl-4 focus:ring-1 focus:outline-none"
        />
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

export default SearchBar;
