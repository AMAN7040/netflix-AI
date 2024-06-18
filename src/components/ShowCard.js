import React from 'react'
  import { IMG_URL } from '../utils/constant'
  import { Link, useNavigate } from 'react-router-dom';
  import { useDispatch } from 'react-redux';
  import { updateRoute } from "../utils/routeSlice";

const ShowCard = ({id, poster_path}) => {
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleRoute = (e) => {
      dispatch(updateRoute(e));
      navigate('/'+e);
    } 
  
    if(!poster_path) return null;
    return (
      <div onClick={() => handleRoute(`choose/${id}`)} className='w-44 m-3 rounded-sm border border-red-700 hover:scale-105'>
          <Link to={`/choose/${id}`}>
           <img src={IMG_URL+poster_path} alt='MOVIE_img'/>
          </Link>
      </div>
    );
};

export default ShowCard