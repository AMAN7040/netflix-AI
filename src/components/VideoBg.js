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
        className=""
        url={`https://www.youtube.com/watch?v=${trailer?.key}`}
        controls
        width="100%"
        height="100%"
        playing
        muted
      />
      ) : (
        <p>Loading trailer...</p>
      )}
    </div>
  );
};

export default VideoBg;
