import React from "react";

const DropdownItem = ({ children, onClick, isActive }) => {
  return (
    <div
      className={`text-dark-bg m-[0.2rem] w-full cursor-pointer rounded-[.4rem] p-[0.2rem] ${
        isActive
          ? "bg-accent text-dark-fg"
          : "hover:outline-accent dark:text-light-bg hover:outline-2"
      } `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default DropdownItem;
