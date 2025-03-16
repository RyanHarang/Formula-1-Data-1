import React from "react";

const DropdownContent = ({ children, open }) => {
  return (
    <>
      {open && (
        <div
          className={`z-25 scrollbar-hidden border-light-bg dark:border-dark-fg bg-white dark:bg-light-fg absolute right-0 left-auto mt-2 flex max-h-100 transform flex-col items-center overflow-y-scroll rounded-md border-2 p-2 text-nowrap shadow-sm transition-all duration-300 ease-in-out md:right-auto md:left-0 ${
            open
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-2 opacity-0"
          }`}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default DropdownContent;
