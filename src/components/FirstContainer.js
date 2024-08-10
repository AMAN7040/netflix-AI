import React from 'react';
import VideoTitle from './VideoTitle';
import VideoBg from './VideoBg';
import { useSelector } from 'react-redux';
import useRandomMovie from '../hooks/useRandomMovie';

const FirstContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  const { randomMovie } = useRandomMovie(movies);

  // If movies or randomMovie is not available, show a loading state
  if (!movies || !randomMovie) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  // Destructure safely
  const { original_title: originalTitle, overview, id } = randomMovie;

  return (
    <div className="relative min-h-screen">
      <VideoTitle title={originalTitle} overview={overview} />
      <VideoBg movieId={id} />
    </div>
  );
};

export default FirstContainer;
