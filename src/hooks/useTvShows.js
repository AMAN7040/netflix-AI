import { useEffect } from "react";
import { addShow } from "../utils/tvShowSlice";
import { API_OPTIONS } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";


const useTvShows = () => {
    const allShow = useSelector((store)=> store.tvShows.allShow);
    //fetch the data from tmdb and update the redux store
   const dispatch = useDispatch();

   const getAllShows = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US",
      API_OPTIONS
    );
    const data = await response.json();
    dispatch(addShow(data.results));
  };

  useEffect(() => {
    !allShow && getAllShows();
  }, []);
}

export default useTvShows;