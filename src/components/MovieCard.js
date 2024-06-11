import React from 'react'
import { IMG_URL } from '../utils/constant'

const MovieCard = ({poster_path}) => {
  if(!poster_path) return null;
  return (
    <div className='w-44 m-3 rounded-sm border border-red-700'>
        <img src={IMG_URL+poster_path} alt='MOVIE_img'/>
    </div>
  )
}

export default MovieCard