import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({title, movies}) => {

  return (
    <div className='m-1 px-2'>
        <h1 className='text-2xl px-5 py-2 font-medium text-white'>{title}</h1>
        <div className='flex overflow-x-scroll'>
         <div className='flex '>
          {movies?.map(movie=> <MovieCard key={movie.id} poster_path={movie.poster_path}/>)}
         </div>
        </div>
    </div>
  )
}

export default MovieList