import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel.css';
import group_15 from "../img/group_15.png";
import group_16 from "../img/group_16.png";
import group_17 from "../img/group_17.png";


const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />, 
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        <div className="carousel-item">
              <img src={group_15} alt="clocks" />
            </div>
            <div className="carousel-item">
              <img src={group_16} alt="glass" />
            </div>
            <div className="carousel-item">
              <img src={group_17} alt="shield" />
          </div>
      </Slider>
    </div>
  );
};
const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow`}
        style={{ ...style, display: 'block', background: 'grey' }} 
        onClick={onClick}
      />
    );
  };
  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow`}
        style={{ ...style, display: 'block', background: 'grey' }} 
        onClick={onClick}
      />
    );
  };

export default Carousel;