import DropdownItem from "../Dropdown/DropdownItem/DropdownItem.jsx";
import DropdownMenu from "../Dropdown/DropdownMenu/DropdownMenu.jsx";

function SearchBar({ setActiveTab, activeTab, searchQuery, setSearchQuery }) {
  const filterItems = [
    { label: "Active Drivers", value: "activeDrivers" },
    { label: "All Drivers", value: "allDrivers" },
  ];

  return (
    <div className="relative w-full h-[20%] flex justify-center px-4 mt-10 mb-10">
      <div className="relative w-full max-w-[30rem] flex items-center border-2 border-black rounded-lg">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="relative w-full h-[3rem] text-black focus:ring-1 focus:outline-none caret-black pl-4 border-none"
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
}

export default SearchBar;
