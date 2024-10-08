import React from "react";
import useTvShows from "../hooks/useTvShows";
import { useSelector } from "react-redux";
import Header from "./Header";
import ShowList from "./ShowList";

const Shows = () => {
  useTvShows();

  const allShow = useSelector((store) => store.tvShows.allShow);
  return (
    <div className=" w-scren h-screen bg-black">
      <Header />
      <div className="pt-[9.5rem] md:pt-[9rem] lg:pt-[10rem] 2xl:pt-[10rem] ">
        <ShowList title={"TV Shows"} shows={allShow} />
      </div>
    </div>
  );
};

export default Shows;
     