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

  return (
    <div>
      {currentShow && tvshowVideo && (
        <>
          <div
            className="w-full h-screen fixed bg-center bg-cover"
            style={{
              backgroundImage: `url('https://image.tmdb.org/t/p/w500${currentShow.poster_path}')`,
            }}
          ></div>
          <Header />
          <div className="absolute pt-[10%] w-screen bg-[rgba(0,0,0,0.7)] m-auto  p-4 text-white">
            <h1 className="text-4xl font-bold text-red-500 text-center mb-3">
              {currentShow.name}
            </h1>
            <div className="w-full object-cover m-auto ">
              {tvshowVideo ? (
                <iframe
                  className="aspect-video w-full object-cover "
                  src={
                    "https://www.youtube.com/embed/" +
                    tvshowVideo?.key +
                    "?&autoplay=1&mute=1"
                  }
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  // referrerPolicy="strict-origin-when-cross-origin"
                ></iframe>
              ) : (
                <p>Loading Clip...</p>
              )}
            </div>
            <div className="w-3/4 m-auto">
              <p className="text-lg italic text-center mb-3">
                {currentShow.tagline}
              </p>
              <p className="mt-4">{currentShow.overview}</p>
              <p className="text-md font-semibold m-2">
                <strong>Release Date:</strong> {currentShow.first_air_date}
              </p>
              <p className="text-lg font-semibold m-2">
                <strong>No. of Seasons:</strong> {currentShow.number_of_seasons}
              </p>
              <p className="text-lg font-semibold m-2">
                <strong>Genres:</strong>{" "}
                {currentShow.genres.map((genre) => genre.name).join(", ")}
              </p>
              <p className="text-lg font-semibold m-2">
                <strong>No. of Episodes:</strong> {currentShow.number_of_episodes}
              </p>
              <p className="text-lg font-semibold m-2">
                <strong>Vote Count:</strong> {currentShow.vote_count}
              </p>
              <p className="text-lg font-semibold m-2">
                <strong>Homepage:</strong>{" "}
                <a
                  href={currentShow.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  {currentShow.homepage}
                </a>
              </p>
              <p>
                <strong>Episode runtime: </strong>{currentShow.episode_run_time}
              </p>
            </div>
          </div>
        </>
      )}
      <Footer/>
    </div>
  );
};

export default ChooseShow;
