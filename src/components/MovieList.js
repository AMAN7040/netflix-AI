import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MovieCard from './MovieCard';

const MovieList = ({ title, movies }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 9,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1800,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className='my-1 mx-3 px-2'>
      <h1 className='text-lg px-2 py-2 font-medium text-white 2xl:text-2xl 2xl:px-5 2xl:py-2'>{title}</h1>
      {movies && movies.length > 0 ? (
        <Slider className='flex justify-start' {...settings}>
          {movies.map((movie) => (
            <div key={movie.id}>
              <MovieCard id={movie.id} poster_path={movie.poster_path} movie={movie} />
            </div>
          ))}
        </Slider>
      ) : (
        <p className='text-white px-5 font-semibold 2xl:px-14'>No Movies</p>
      )}
    </div>
  );
};

export default MovieList;
