import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateChoose } from "../utils/chooseSlice";
import { API_OPTIONS } from "../utils/constant";

const useChoose = (movieId) => {
  const dispatch = useDispatch();
  const choose = useSelector((store) => store.choose.currentChoose);

  const fetchMovie = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
        API_OPTIONS
      );
      if (!response.ok) {
        throw new Error("Failed to fetch movie details");
      }
      const data = await response.json();
      dispatch(updateChoose(data));
    } catch (error) {}
  };

  useEffect(() => {
   fetchMovie();
  }, [choose]);
};

export default useChoose;
