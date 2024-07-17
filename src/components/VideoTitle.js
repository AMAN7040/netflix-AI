import { faCircleInfo, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen h-screen aspect-video pt-[50%] px-5 absolute text-white bg-gradient-to-r from-black md:pt-[35%] md:px-8 lg:pt-[25%] lg:px-16  2xl:pt-[15%] 2xl:px-10">
      <h1 className="font-semibold text-md px-3 my-2 text-white md:text-lg md:px-8 lg:text-3xl lg:px-16 2xl:text-4xl 2xl:px-10">{title}</h1>
      <p className="text-xs font-serif my-3 px-3 w-2/5 text-white md:text-xs md:px-8 lg:text-xl lg:px-16 lg:w-2/5 2xl:text-[14px] 2xl:my-5 2xl:w-1/5 2xl:px-10">{overview}</p>
      <div className="flex justify-start w-3/5 mb-1 md:mb-3 md:justify-start md:mx-5 lg:w-1/5 lg:mb-6 lg:justify-center 2xl:w-1/5 2xl:mb-5 2xl:justify-between">
        <button className="bg-white text-xs mb-1 hover:bg-gray-200 mx-5 py-2 px-3 rounded-lg text-black font-semibold md:text-sm md:mb-2 lg:text-md lg:mb-3 2xl:text-lg 2xl:mb-4">
          <FontAwesomeIcon
            icon={faPlay}
            className="text-black text-xs cursor-pointer px-1  md:text-sm lg:px-2 lg:text-md 2xl:px-2 2xl:text-lg"
          />
          Play
        </button>
        <button className="bg-gray-100 text-xs mb-1  px-1 py-1 rounded-lg text-white bg-opacity-40 font-semibold md:text-sm md:mb-2 lg:text-md lg:mb-3 2xl:text-lg 2xl:mb-4">
          <FontAwesomeIcon
            icon={faCircleInfo}
            className="text-black text-xs cursor-pointer px-1  md:text-sm lg:text-md 2xl:px-2 2xl:text-lg"
          />
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
