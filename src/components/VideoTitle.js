import { faCircleInfo, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[15%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="font-semibold text-4xl my-2 text-white">{title}</h1>
      <p className="text-md font-serif my-5 w-1/5 text-white">{overview}</p>
      <div className="flex justify-between w-1/5 mb-5 ">
        <button className="bg-white hover:bg-gray-200 py-2 px-3 rounded-lg text-black font-semibold">
          <FontAwesomeIcon
            icon={faPlay}
            className="text-black cursor-pointer px-2"
          />
          Play
        </button>
        <button className="bg-gray-100 px-3 py-2 rounded-lg text-white bg-opacity-40 font-semibold">
          <FontAwesomeIcon
            icon={faCircleInfo}
            className="text-black cursor-pointer px-2"
          />
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
