import React from "react";

const DropdownContent = ({ children, open }) => {
  return (
    <div
      className={`scrollbar-hidden bg-white border-light-bg dark:border-dark-fg absolute mt-2 flex max-h-[40vh] min-w-[100%] transform flex-col items-center overflow-y-scroll rounded-md border-2 bg-dark-fg dark:bg-light-fg p-2 text-nowrap shadow-sm transition-all duration-300 ease-in-out ${
        open
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-2 opacity-0"
      }`}
    >
      {children}
    </div>
  );
};

export default DropdownContent;
