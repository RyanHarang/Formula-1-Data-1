import React, { useState, useEffect, useRef } from "react";
import FilterIcon from "../../../../assets/svg/FilterIcon.jsx";
import DropdownContent from "../DropdownContent/DropdownContent";

const DropdownMenu = ({ content }) => {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef();

  const toggleDropdown = () => {
    setOpen((open) => !open);
  };

  useEffect(() => {
    const handler = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", handler);
    };
  });

  return (
    <div ref={dropdownRef} className="relative">
      <FilterIcon open={open} toggle={toggleDropdown}></FilterIcon>
      <DropdownContent open={open}>{content}</DropdownContent>
    </div>
  );
};

export default DropdownMenu;
