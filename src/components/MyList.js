import React from "react";
import Header from "./Header";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const MyList = () => {

    const { items } = useSelector((store)=> store.wishlist)
    const extractedData = items.map(item => {
      const { movie } = item;
      return movie;
    });
  

      

  return (
    <div className=" w-screen h-screen bg-black">
      <Header />
      <div className="pt-[39%]  2xl:pt-[12%]">
        <MovieList title={"Your Wishlist"} movies={extractedData} />
      </div>
    </div>
  );
};

export default MyList;
