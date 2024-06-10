import { useEffect } from "react";
import { addTopRatedMovies } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constant";
import { useDispatch } from "react-redux";

const useTopRatedMovies = () => {
    const dispatch = useDispatch();
  const getTopRatedMovies = async() => {
    const response = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?page=1",
        API_OPTIONS
      );
      const data = await response.json();
      dispatch(addTopRatedMovies(data.results));
    };
  
    useEffect(() => {
      getTopRatedMovies();
    }, []);
}


export default useTopRatedMovies