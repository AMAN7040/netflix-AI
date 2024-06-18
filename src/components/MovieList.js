import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieCard from './MovieCard';

const MovieList = ({ title, movies }) => {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 9,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className='my-1 mx-3 px-2'>
      <h1 className='text-2xl px-5 py-2 font-medium text-white'>{title}</h1>
      <Slider {...settings}>
        {movies?.map(movie => (
          <div key={movie.id}>
            <MovieCard id={movie.id} poster_path={movie.poster_path} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MovieList;
