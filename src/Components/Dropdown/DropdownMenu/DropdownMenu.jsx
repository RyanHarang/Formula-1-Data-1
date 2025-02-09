import React, { useState, useEffect, useRef } from "react";
import Filter from "../../Filter/Filter";
import DropdownContent from "../DropdownContent/DropdownContent";

const DropdownMenu = ({ content }) => {

    const [open, setOpen] = useState(false);

    const dropdownRef = useRef();

    const toggleDropdown = () => {
        console.log("Clicked");
        setOpen((open) => !open);
    }

    useEffect(() => {
        const handler = (event) => {
            if(dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("click", handler);

        return () => {
            document.removeEventListener("click", handler);
        }
    })

    return (
        <div ref={dropdownRef} className="relative">
            <Filter open={open} toggle={toggleDropdown}>
            </Filter>
            <DropdownContent open={open}>
                {content}
            </DropdownContent>
        </div>
    )
}

export default DropdownMenu