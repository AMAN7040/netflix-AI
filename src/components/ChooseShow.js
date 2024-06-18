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
          <div className="absolute pt-[10%] w-screen bg-[rgba(0,0,0,0.7)] m-auto h-full p-4 text-white">
            <h1 className="text-4xl font-bold text-red-500 text-center mb-3">
              {currentShow.title}
            </h1>
            <div className="flex w-full">
              <div className="w-8/12 object-cover m-auto ">
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
              <div className="w-4/12 m-auto p-10 opacity-50">
                <p className="text-lg italic text-center mb-3">
                  {currentShow.tagline}
                </p>
                <p className="mt-4">{currentShow.overview}</p>
                <p className="text-md font-normal m-2">
                  <strong>Release Date:</strong> {currentShow.release_date}
                </p>
                <p className="text-md font-normal m-2">
                  <strong>Runtime:</strong> {currentShow.runtime} minutes
                </p>
                <p className="text-md font-normal m-2">
                  <strong>Genres:</strong>{" "}
                  {currentShow.genres.map((genre) => genre.name).join(", ")}
                </p>
                <p className="text-md font-normal m-2">
                  <strong>Vote Average:</strong> {currentShow.vote_average}
                </p>
                <p className="text-md font-normal m-2">
                  <strong>Vote Count:</strong> {currentShow.vote_count}
                </p>
                <p className="text-md font-normal m-2">
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
                  <strong>IMDB ID:</strong>{" "}
                  <a
                    href={`https://www.imdb.com/title/${currentShow.imdb_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    {currentShow.imdb_id}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
};

export default ChooseShow;
