import React from "react";
import { useSelector } from "react-redux";
import lang from '../utils/LanguageConstant';

const GbtSearchBar = () => {
    const langType = useSelector((store) => store.config.lang);
  return (
    <div className="pt-[8%] flex justify-center ">
      <form onSubmit={(e)=> e.preventDefault()} className="bg-black opacity-75 grid grid-cols-12 w-1/2 rounded-md">
        <input
          type="text"
          placeholder={lang[langType].gptSearchPlaceholder}
          className="col-span-9 m-5 p-3 rounded-md text-black font-medium"
        />
        <button
          className="col-span-3 m-5 p-3 rounded-lg"
          style={{ backgroundColor: "#ff0000", color: "#ffffff" }}
        >
          {lang[langType].search}
        </button>
      </form>
    </div>
  );
};

export default GbtSearchBar;
