import { useEffect } from "react";
import { addShow } from "../utils/tvShowSlice";
import { API_OPTIONS } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";

const useTvShows = () => {
  const dispatch = useDispatch();
  const allShow = useSelector((store) => store.tvShows.allShow);

  const getAllShows = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/trending/tv/day?language=en-US",
        API_OPTIONS
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      dispatch(addShow(data.results));
    } catch (error) {
      console.error("Error fetching TV shows:", error);
    }
  };

  useEffect(() => {
    if (!allShow || allShow.length === 0) {
      getAllShows();
    }
  }, [allShow, dispatch]);
};

export default useTvShows;
