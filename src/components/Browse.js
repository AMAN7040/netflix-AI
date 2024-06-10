import React from 'react'
import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import SecondaryContainer from './SecondaryContainer'
import FirstContainer from './FirstContainer'


const Browse = () => {
  useNowPlayingMovies();

  return (
    <div>
      <Header/>
      <FirstContainer/>
      <SecondaryContainer/>
    </div>
  )
}

export default Browse;