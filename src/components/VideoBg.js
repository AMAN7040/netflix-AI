import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";
import ReactPlayer from "react-player";

const VideoBg = ({ movieId }) => {
  const trailer = useSelector((store) => store.movies?.movieTrailer);
  useMovieTrailer(movieId);

  return (
    <div className="w-screen h-screen object-cover bg-black">
      {trailer ? (
        <ReactPlayer
        url={`https://www.youtube.com/watch?v=${trailer?.key}`}
        controls
        width="100%"
        height="100%"
        playing
        muted
      />
      ) : (
        <div className="flex justify-center items-center h-full text-white text-lg">
        <p>Loading trailer...</p>
      </div>
      )}
    </div>
  );
};

export default VideoBg;
