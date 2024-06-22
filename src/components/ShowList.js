import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ShowCard from './ShowCard';

const ShowList = ({ title, shows }) => {
   
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
        <div className='my-10 mx-5 px-5 2xl:my-1 2xl:mx-3 2xl:px-2'>
          <h1 className='text-lg px-8 py-5 font-medium text-white 2xl:text-2xl 2xl:px-5 2xl:py-2'>{title}</h1>
          <Slider {...settings}>
            {shows?.map(show => (
              <div key={show.id}>
                <ShowCard id={show.id} poster_path={show.poster_path} show={shows} />
              </div>
            ))}
          </Slider>
        </div>
      );
    };
    
export default ShowList