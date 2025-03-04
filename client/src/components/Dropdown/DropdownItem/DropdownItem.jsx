import React from "react";

const DropdownItem = ({ children, onClick, isActive }) => {
  return (
    <div
      className={`m-[0.2rem] w-full cursor-pointer rounded-[.4rem] p-[0.2rem] ${
        isActive
          ? "bg-accent text-white"
          : "hover:outline-accent hover:text-white hover:outline-2"
      } `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default DropdownItem;
