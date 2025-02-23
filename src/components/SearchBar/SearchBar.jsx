import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="w-80 bg-slate-100 rounded-md flex items-center px-4">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search for a note..."
        className="w-full text-xs bg-transparent py-[11px] outline-none "
      />
      {value && (
        <IoMdClose
          onClick={onClearSearch}
          className=" text-xl text-slate-500 hover:text-black cursor-pointer mr-3"
        />
      )}
      <FaMagnifyingGlass
        onClick={handleSearch}
        className="text-slate-400 hover:text-black cursor-pointer"
      />
    </div>
  );
};

export default SearchBar;
