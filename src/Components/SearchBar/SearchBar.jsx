import DropdownItem from "../Dropdown/DropdownItem/DropdownItem";
import DropdownMenu from "../Dropdown/DropdownMenu/DropdownMenu";

function SearchBar({ setActiveTab, activeTab }) {
  const filterItems = [
    { label: "Active Drivers", value: "active" },
    { label: "All Drivers", value: "all" },
  ];

  return (
    <div className="relative w-full h-[20%] flex justify-center px-4 mt-10 mb-10">
      <div className="relative w-full max-w-[30rem] flex items-center border-2 border-black rounded-lg">
        <input
          type="text"
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
