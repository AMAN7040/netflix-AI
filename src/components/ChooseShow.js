import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./Header";
import useTvshowVideo from "../hooks/useTvshowVideo";
import useChooseShow from "../hooks/useChooseShow";
import Footer from './Footer'

const ChooseShow = () => {
  const { currentShow, tvshowVideo } = useSelector((store) => store.choose);
  const { id } = useParams();
  useChooseShow(id);
  useTvshowVideo(id);

  // Early return if data is not available
  if (!currentShow) {
    return  <>
    <Header />
    <div className="flex items-center justify-center min-h-screen text-white bg-black">
      <p>Show not found. Please go to Home page</p>
    </div>
  </>;
  }

  // Destructuring properties from currentShow
  const {
    poster_path,
    original_name,
    tagline,
    overview,
    release_date,
    runtime,
    genres,
    vote_average,
    vote_count,
    homepage,
    imdb_id
  } = currentShow;

  return (
    <div>
      <Header />
      <div
        className="w-full h-screen fixed bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/w500${poster_path}')`,
        }}
        aria-label={`${original_name} poster`}
      ></div>
      <div className="absolute pt-[12rem] w-full bg-[rgba(0,0,0,0.7)] m-auto min-h-full p-1 text-white md:pt-[9rem] lg:pt-[11rem] lg:p-5 2xl:pt-[10rem] 2xl:p-5">
        <h1 className="text-lg font-bold text-red-500 text-center mx-auto mb-2 lg:text-2xl lg:mb-4 2xl:text-4xl 2xl:mb-4">
          {original_name}
        </h1>
        <div className="m-auto lg:flex 2xl:flex w-[85%] md:w-[80%] lg:w-full 2xl:w-full">
          <div className="lg:w-8/12 2xl:w-8/12 object-cover m-auto ">
            {tvshowVideo ? (
              <iframe
                className="aspect-video w-full object-cover"
                src={`https://www.youtube.com/embed/${tvshowVideo?.key}?&autoplay=1&mute=1`}
                title={`${original_name} Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                loading="lazy"
              ></iframe>
            ) : (
              <p className="text-white font-semibold text-center">Loading Clip...</p>
            )}
          </div>
          <div className="m-auto p-3 opacity-50 lg:w-4/12 lg:p-8 2xl:w-4/12 2xl:p-10">
            {tagline && (
              <p className="text-sm italic text-center mb-1 md:text-sm lg:text-md lg:mb-3 2xl:text-lg 2xl:mb-3">
                {tagline}
              </p>
            )}
            <p className="mt-4 text-sm md:text-md lg:text-[15px] 2xl:text-lg">
              Overview: {overview || "No overview available"}
            </p>
            <p className="text-sm font-normal m-1 lg:text-md lg:mx-auto lg:my-3 2xl:my-3 2xl:text-md 2xl:mx-auto">
              <strong>Release Date:</strong> {release_date}
            </p>
            <p className="text-sm font-normal m-1 lg:text-md lg:mx-auto lg:my-3 2xl:my-3 2xl:text-md 2xl:mx-auto">
              <strong>Runtime:</strong> {runtime} minutes
            </p>
            <p className="text-sm font-normal m-1 lg:text-md lg:mx-auto lg:my-3 2xl:my-3 2xl:text-md 2xl:mx-auto">
              <strong>Genres:</strong>{" "}
              {genres.map((genre) => genre.name).join(", ")}
            </p>
            <p className="text-sm font-normal m-1 lg:text-md lg:mx-auto lg:my-3 2xl:my-3 2xl:text-md 2xl:mx-auto">
              <strong>Vote Average:</strong> {vote_average}
            </p>
            <p className="text-sm font-normal m-1 lg:text-md lg:mx-auto lg:my-3 2xl:my-3 2xl:text-md 2xl:mx-auto">
              <strong>Vote Count:</strong> {vote_count}
            </p>
            {homepage && (
              <p className="text-sm font-normal m-1 lg:text-md lg:mx-auto lg:my-3 2xl:my-3 2xl:text-md 2xl:mx-auto">
                <strong>Homepage:</strong>{" "}
                <a
                  href={homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  {homepage}
                </a>
              </p>
            )}
            {imdb_id && (
              <p>
                <strong>IMDB ID:</strong>{" "}
                <a
                  href={`https://www.imdb.com/title/${imdb_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  {imdb_id}
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChooseShow;
