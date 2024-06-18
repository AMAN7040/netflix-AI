import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { chooseTvShowVideo } from "../utils/chooseSlice";

const useTvshowVideo = (seriesId) => {
  const dispatch = useDispatch();

  const tvshowVideo = useSelector((store) => store.choose.tvshowVideo);

  const getVideo = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${seriesId}/videos?language=en-US`,
        API_OPTIONS
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      const filterTvshowVideo = data.results.filter(
        (video) => video.type === "Teaser"
      );

      const video = filterTvshowVideo.length
        ? filterTvshowVideo[0]
        : data.results[0];
      dispatch(chooseTvShowVideo(video));
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  };

  useEffect(() => {
    getVideo();
  }, [seriesId, tvshowVideo]);
};

export default useTvshowVideo;
