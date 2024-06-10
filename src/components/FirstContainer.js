import React from 'react'
import VideoTitle from './VideoTitle';
import VideoBg from './VideoBg';
import { useSelector } from 'react-redux';
import useRandomMovie from '../hooks/useRandomMovie';


const FirstContainer = () => {
 
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  const { randomMovie} = useRandomMovie(movies); // Call the hook unconditionally

  if (!movies || !randomMovie)return null;

  const {original_title, overview , id} = randomMovie;

  return (
    <div>
      <VideoTitle title={original_title} overview={overview}/>
      <VideoBg movieId={id}/> 
    </div>
  );
};

export default FirstContainer