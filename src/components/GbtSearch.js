import React from 'react'
import { BACKGROUND_IMAGE_URL } from '../utils/constant'
import GbtSearchBar from './GbtSearchBar'
import GbtMovieSuggestions from './GbtMovieSuggestions'

const GbtSearch = () => {
  return (
    <div className=" w-full h-screen bg-center bg-cover" style={{ backgroundImage: `url('${BACKGROUND_IMAGE_URL}')` }}>
         <div className='bg-[rgba(0,0,0,0.7)] h-screen text-white'>
          <GbtSearchBar/>
          <GbtMovieSuggestions/>
        </div>
    </div>
  )
}

export default GbtSearch