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
  // Custom hooks for fetching movie data
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpComingMovies();

  // Selector for showing the GBT search component
  const gbtSearch = useSelector((store) => store.gbt.showGbtSearch);

  return (
    <>
      <Header />
      {gbtSearch ? (
        <GbtSearch />
      ) : (
        <>
          <FirstContainer />
          <SecondaryContainer />
          <Footer />
        </>
      )}
    </>
  );
};

export default Browse;
