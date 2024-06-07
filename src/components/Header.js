import React from 'react'
import { NETFLIX_LOGO } from '../utils/constant'

const Header = () => {
  return (
    <div className="absolute py-2 px-72 ">
        <img className="w-48" src={NETFLIX_LOGO} alt='LOGO'/>
    </div>
  )
}

export default Header