import React from "react";
import { useParams } from "react-router-dom";
import useChoose from "../hooks/useChoose";
import { useSelector } from "react-redux";
import Header from "./Header";
import useChooseVideo from "../hooks/useChooseVideo";
import Footer from "./Footer";

const Choose = () => {
  const { currentChoose, currentVideo } = useSelector((store) => store.choose);
  const { id } = useParams();
  useChoose(id);
  useChooseVideo(id);

  return (
    <div>
      {currentChoose && currentVideo && (
        <>
          <div
            className="w-full h-full fixed bg-center bg-cover"
            style={{
              backgroundImage: `url('https://image.tmdb.org/t/p/w500${currentChoose.poster_path}')`,
            }}
          ></div>
          <Header />
          <div className="absolute pt-[45%] w-full bg-[rgba(0,0,0,0.7)] m-auto h-full p-1 text-white md:pt-[20%] lg:pt-[15%] lg:p-5 2xl:pt-[10%] 2xl:p-5 ">
            <h1 className="text-lg font-bold text-red-500 text-center mb-2 md:text-lg md:mb-3 lg:text-2xl lg:mb-4 2xl:text-4xl 2xl:mb-4">
              {currentChoose.title}
            </h1>
            <div className="lg:flex 2xl:flex w-full">
              <div className="lg:w-8/12 2xl:w-8/12 object-cover m-auto">
                {currentVideo ? (
                  <iframe
                    className="aspect-video w-full object-cover "
                    src={
                      "https://www.youtube.com/embed/" +
                      currentVideo?.key +
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
              <div className=" m-auto p-3 opacity-50 md:p-4 lg:w-4/12 lg:p-8 2xl:w-4/12 2xl:p-10">
                <p className="text-sm italic text-center mb-1 md:text-sm lg:text-md lg:mb-3 2xl:text-lg 2xl:mb-3">
                  {currentChoose.tagline}
                </p>
                <p className="mt-4">{currentChoose.overview}</p>
                <p className="text-sm font-normal m-1 lg:text-md lg:m-3 2xl:text-md 2xl:m-3">
                  <strong>Release Date:</strong> {currentChoose.release_date}
                </p>
                <p className="text-sm font-normal m-1 lg:text-md lg:m-3 2xl:text-md 2xl:m-3">
                  <strong>Runtime:</strong> {currentChoose.runtime} minutes
                </p>
                <p className="text-sm font-normal m-1 lg:text-md lg:m-3 2xl:text-md 2xl:m-3 ">
                  <strong>Genres:</strong>{" "}
                  {currentChoose.genres.map((genre) => genre.name).join(", ")}
                </p>
                <p className="text-sm font-normal m-1 lg:text-md lg:m-3 2xl:text-md 2xl:m-3">
                  <strong>Vote Average:</strong> {currentChoose.vote_average}
                </p>
                <p className="text-sm font-normal m-1 lg:text-md lg:m-3 2xl:text-md 2xl:m-3">
                  <strong>Vote Count:</strong> {currentChoose.vote_count}
                </p>
                <p className="text-sm font-normal m-1 lg:text-md lg:m-3 2xl:text-md 2xl:m-3">
                  <strong>Homepage:</strong>{" "}
                  <a
                    href={currentChoose.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    {currentChoose.homepage}
                  </a>
                </p>
                <p>
                  <strong className="m-3">IMDB ID:</strong>{" "}
                  <a
                    href={`https://www.imdb.com/title/${currentChoose.imdb_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 m-1"
                  >
                    {currentChoose.imdb_id}
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

export default Choose;
