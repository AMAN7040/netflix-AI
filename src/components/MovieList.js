import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MovieCard from './MovieCard';

const MovieList = ({ title, movies }) => {
  const settings = {
    dots: false,
    infinite: movies.length > 1, // Only infinite if more than 1 movie
    speed: 500,
    slidesToShow: movies.length === 1 ? 1 : 8, // Show only 1 slide if there's only one movie
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1800,
        settings: {
          slidesToShow: movies.length === 1 ? 1 : 7,
          slidesToScroll: 1,
          infinite: movies.length > 1,
          dots: true,
        },
      },
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: movies.length === 1 ? 1 : 6,
          slidesToScroll: 1,
          infinite: movies.length > 1,
          dots: true,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: movies.length === 1 ? 1 : 4,
          slidesToScroll: 1,
          infinite: movies.length > 1,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: movies.length === 1 ? 1 : 2,
          slidesToScroll: 2,
          infinite: movies.length > 1,
          dots: true,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className='my-2 px-2'>
      <h1 className='text-lg px-2 py-2 font-medium text-white md:text-lg md:px-4 lg:text-xl lg:px-5 lg:py-2 2xl:text-2xl 2xl:px-5 2xl:py-2'>{title}</h1>
      {movies && movies.length > 0 ? (
        <Slider className='flex flex-start mx-6 md:mx-8 lg:mx-8 2xl:mx-8' {...settings}>
          {movies.map((movie) => (
            <div key={movie.id} className='p-1'>
              <MovieCard id={movie.id} poster_path={movie.poster_path} movie={movie} />
            </div>
          ))}
        </Slider>
      ) : (
        <p className='text-white px-5 font-semibold md:px-8 lg:px-12 2xl:px-14'>No Movies</p>
      )}
    </div>
  );
};

export default MovieList;
