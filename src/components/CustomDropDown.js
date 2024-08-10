import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';

const CustomDropdown = ({ options, onChange, selectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className="text-white text-sm px-1 rounded-md cursor-pointer border border-white hover:bg-gray-50 hover:bg-opacity-15 bg-black bg-opacity-60 w-[5.1rem] md:px-1 md:w-[5.3rem] md:h-[1.6rem] lg:py-1 lg:px-2 lg:text-md lg:w-[6rem] lg:h-[2rem] 2xl:py-1 2xl:px-2 2xl:text-md"
      >
        {selectedOption.name}
        <FontAwesomeIcon
          icon={isOpen ? faChevronUp : faChevronDown}
          className='ml-0.5'
        />
      </button>
      {isOpen && (
        <ul className="absolute z-10 mt-[0.01rem] bg-black opacity-85 text-white border border-t-0 border-white rounded-md rounded-t-none w-full text-[0.7rem]">
          {options.map((option) => (
            <li
              key={option.identifier}
              onClick={() => handleSelect(option)}
              className="px-2 py-1 cursor-pointer hover:bg-gray-700"
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
