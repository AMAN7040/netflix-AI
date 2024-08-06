import React from 'react';
import VideoTitle from './VideoTitle';
import VideoBg from './VideoBg';
import { useSelector } from 'react-redux';
import useRandomMovie from '../hooks/useRandomMovie';

const FirstContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  const { randomMovie } = useRandomMovie(movies);

  if (!movies || !randomMovie) return null;

  // Destructure safely
  const { original_title: originalTitle, overview, id } = randomMovie;

  return (
    <div>
      <VideoTitle title={originalTitle} overview={overview} />
      <VideoBg movieId={id} />
    </div>
  );
};

export default FirstContainer;
