import React from 'react'
import { IMG_URL } from '../utils/constant'

const MovieCard = ({poster_path}) => {
  return (
    <div className='w-44 m-3 rounded-sm'>
        <img src={IMG_URL+poster_path} alt='MOVIE_img'/>
    </div>
  )
}

export default MovieCard