import React from 'react';
import Slider from 'react-slick';

const PreviousArrow = (props: any) => {
  const { className, onClick } = props;
  return (
    <div className={`${className}`} onClick={onClick}>
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M31.4 13.455L29.8475 12L17 24L29.8475 36L31.4 34.5525L20.1125 24L31.4 13.455Z" fill="#43494F"/>
      </svg>
    </div>
  );
};

const NextArrow = (props: any) => {
  const { className, onClick } = props;
  return (
    <div className={`${className}`} onClick={onClick}>
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 13.455L18.5525 12L31.4 24L18.5525 36L17 34.5525L28.2875 24L17 13.455Z" fill="#43494F"/>
      </svg>
    </div>
  );
};

const HeroCarousel = ({ children }: any) => {
  const settings = {
    arrows: true,
    autoplay: false,
    autoplaySpeed: 3000,
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 750,
    prevArrow: <PreviousArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <Slider {...settings}>
      { children }
    </Slider>
  );
};

export default HeroCarousel;
