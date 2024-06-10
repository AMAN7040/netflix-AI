import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {

  const movies = useSelector((store)=> store.movies);
  return (
    movies && (
      <div className=' bg-black'>
       <div className='-mt-80 pl-12 relative z-10'>
         <MovieList title={'Now Playing Movies'} movies={movies.nowPlayingMovies}/>
         <MovieList title={'Trending'} movies={movies.popularMovies}/>
         <MovieList title={'Top Rated Movies'} movies={movies.topRatedMovies}/>
         <MovieList title={'Upcoming Movies'} movies={movies.upComingMovies}/>
       </div>
    </div>
    )
  )
}

export default SecondaryContainer
