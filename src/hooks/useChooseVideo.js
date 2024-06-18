import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { chooseVideo } from "../utils/chooseSlice";

const useChooseVideo = (movieId) => {
    const dispatch = useDispatch();
    
    const currentVideo = useSelector((store)=> store.choose.currentVideo);

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

          const filterCurrentVideo = data.results.filter(
            (video) => video.type === "Clip"
          );

         const videoClip = filterCurrentVideo.length ? filterCurrentVideo[0] : data.results[0];
          dispatch(chooseVideo(videoClip));
          
        } catch (error) {
          console.error("Error fetching video data:", error);
        }
      };
    
    useEffect(() => {
       getVideo();
      
        
    },[movieId, currentVideo]);
}

export default useChooseVideo