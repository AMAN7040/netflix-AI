import React from 'react';
import MovieList from './MovieList';
import { useSelector } from 'react-redux';

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  const recent = useSelector((store) => store.user.recentlyViewed);

  return (
    movies && (
      <div className="w-screen bg-black">
        <div className="relative z-10 -mt-80 pl-0 md:-mt-72 md:pl-12 lg:-mt-64 lg:pl-16 2xl:-mt-64 2xl:pl-12">
          <MovieList title="Recently Viewed" movies={recent} />
          <MovieList title="Now Playing Movies" movies={movies?.nowPlayingMovies} />
          <MovieList title="Trending" movies={movies?.popularMovies} />
          <MovieList title="Top Rated Movies" movies={movies?.topRatedMovies} />
          <MovieList title="Upcoming Movies" movies={movies?.upComingMovies} />
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;
