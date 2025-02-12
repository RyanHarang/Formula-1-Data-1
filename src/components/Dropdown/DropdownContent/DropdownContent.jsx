import React from 'react';

const DropdownContent = ({ children, open }) => {
  return (
    <div
      className={`absolute border-2 border-black text-nowrap !bg-[#EBEBEB]
                  min-w-[100%] scrollbar-hidden flex flex-col items-center
                  p-2 mt-2 bg-white rounded-md shadow-sm max-h-[40vh]
                  overflow-y-scroll transform transition-all duration-300 ease-in-out
                  ${
                    open
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 -translate-y-2 pointer-events-none'
                  }`}
    >
      {children}
    </div>
  );
};

export default DropdownContent;
