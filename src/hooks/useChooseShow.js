import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateShow } from "../utils/chooseSlice";
import { API_OPTIONS } from "../utils/constant";

const useChooseShow = (showId) => {

  const dispatch = useDispatch();
  const currentShow = useSelector((store) => store.choose.currentShow);

  const fetchMovie = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${showId}?language=en-US`,
        API_OPTIONS
      );
      if (!response.ok) {
        throw new Error("Failed to fetch movie details");
      }
      const data = await response.json();
      dispatch(updateShow(data));
    } catch (error) {}
  };

  useEffect(() => {
   fetchMovie();
  }, [currentShow]);
};


export default useChooseShow;