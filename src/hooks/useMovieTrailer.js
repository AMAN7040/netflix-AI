import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addMovieTrailer } from "../utils/moviesSlice";

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();

    const getVideo = async () => {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
            API_OPTIONS
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          const filterData = data.results.filter(
            (video) => video.type === "Trailer"
          );
          const MovieTrailer = filterData.length ? filterData[0] : data.results[0];
          dispatch(addMovieTrailer(MovieTrailer))
          
        } catch (error) {
          console.error("Error fetching video data:", error);
        }
      };
    
    useEffect(() => {
        getVideo();
    },[dispatch, movieId]);
}

export default useMovieTrailer