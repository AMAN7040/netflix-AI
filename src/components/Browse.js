import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import SecondaryContainer from "./SecondaryContainer";
import FirstContainer from "./FirstContainer";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpComingMovies from "../hooks/useUpComingMovies";
import { useSelector } from "react-redux";
import GbtSearch from "./GbtSearch";
import Footer from "./Footer";

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpComingMovies();

  const gbtSearch = useSelector((store) => store.gbt.showGbtSearch);

  return (
    <div className=''>
      <Header />
      {gbtSearch ? (
        <GbtSearch />
      ) : (
        <div className="">
          <FirstContainer />
          <SecondaryContainer />
          <Footer/>
        </div>
      )}
     
    </div>
  );
};

export default Browse;
