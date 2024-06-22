import { faCircleInfo, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen h-screen aspect-video pt-[50%] px-5 absolute text-white bg-gradient-to-r from-black 2xl:pt-[15%] 2xl:px-10">
      <h1 className="font-semibold text-md px-3 my-2 text-white 2xl:text-4xl 2xl:px-10">{title}</h1>
      <p className="text-xs font-serif my-3 px-3 w-2/5 text-white 2xl:text-[14px] 2xl:my-5 2xl:w-1/5 2xl:px-10">{overview}</p>
      <div className="flex justify-start w-3/5 mb-1 2xl:w-1/5 2xl:mb-5 2xl:justify-between">
        <button className="bg-white text-xs hover:bg-gray-200 mx-5 py-2 px-3 rounded-lg text-black font-semibold 2xl:text-lg">
          <FontAwesomeIcon
            icon={faPlay}
            className="text-black text-xs cursor-pointer px-1 2xl:px-2 2xl:text-lg"
          />
          Play
        </button>
        <button className="bg-gray-100 text-xs  px-1 py-1 rounded-lg text-white bg-opacity-40 font-semibold 2xl:text-lg">
          <FontAwesomeIcon
            icon={faCircleInfo}
            className="text-black text-xs cursor-pointer px-1 2xl:px-2 2xl:text-lg"
          />
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
