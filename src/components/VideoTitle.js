import { faCircleInfo, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const VideoTitle = ({ title, overview }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 120; // Maximum number of characters to show

  const handleToggle = () => setIsExpanded(!isExpanded);

  return (
    <div className="w-screen h-screen aspect-video pt-[13rem] px-[1.25rem] absolute text-white bg-gradient-to-r from-black md:pt-[17rem] md:px-[2rem] lg:pt-[15rem] lg:px-[4rem] 2xl:pt-[15rem] 2xl:px-[4rem]">
      <h1 className="font-semibold text-md px-3 my-2 text-white md:text-lg md:px-8 lg:text-[1.5rem] lg:px-16 2xl:text-4xl 2xl:px-10">
        {title}
      </h1>
      <p className="text-xs  my-3 px-3 w-2/5 text-white md:text-xs md:px-8 lg:text-[0.8rem] lg:px-16 lg:w-2/5 2xl:text-[14px] 2xl:my-5 2xl:w-1/5 2xl:px-10">
        {isExpanded
          ? overview
          : overview.length > maxLength
          ? `${overview.substring(0, maxLength)}...`
          : overview}
        {overview.length > maxLength && (
          <button onClick={handleToggle} className="text-white ml-1">
            {isExpanded ? "Show Less" : "Read More"}
          </button>
        )}
      </p>
      <div className="flex justify-start w-[14rem] -mx-[0.5rem] mb-1 md:mb-3 md:justify-start md:mx-[0.9rem] lg:w-[16rem] lg:mb-6 lg:mx-[1rem] lg:justify-center 2xl:w-[19rem] 2xl:mb-5 2xl:justify-between">
        <button className="bg-white text-xs mb-1 hover:bg-gray-200 mx-5 py-2 px-3 rounded-lg text-black font-semibold md:text-sm md:mb-2 lg:text-[0.8rem] lg:mb-3 2xl:text-lg 2xl:mb-4">
          <FontAwesomeIcon
            icon={faPlay}
            className="text-black text-xs cursor-pointer px-1 md:text-sm lg:px-2 lg:text-[0.7rem]  2xl:px-2 2xl:text-lg"
          />
          Play
        </button>
        <button className="bg-gray-100 text-xs mb-1 px-1 py-1 rounded-lg text-white bg-opacity-40 font-semibold md:text-sm md:mb-2 lg:text-[0.8rem] lg:mb-3 2xl:text-lg 2xl:mb-4">
          <FontAwesomeIcon
            icon={faCircleInfo}
            className="text-black text-xs cursor-pointer px-1 md:text-sm lg:text-[0.7rem] 2xl:px-2 2xl:text-lg"
          />
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
