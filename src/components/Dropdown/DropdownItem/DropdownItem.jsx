import React from 'react';

const DropdownItem = ({ children, onClick, isActive }) => {
  return (
    <div
      className={`p-[0.2rem] m-[0.2rem] w-full rounded-[.4rem] cursor-pointer text-black 
        ${
          isActive
            ? 'bg-sky-600 text-white'
            : 'hover:text-white hover:bg-sky-600'
        }
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default DropdownItem;
