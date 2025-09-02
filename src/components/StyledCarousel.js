import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

const CarouselWrapper = styled.div`
  .slick-slide > div {
    display: flex;
    justify-content: center;
    padding: 0 10px;
  }

  .slick-prev,
  .slick-next {
    z-index: 10;
  }
  .slick-list {
    margin: 0 -10px; // Counteracts padding to align properly
  }

  .slick-dots {
    bottom: -30px;
  }
`;

const StyledCarousel = ({ children, slidesToShow = 3 }) => {
  const settings = {
    dots: true,
    infinite: children.length > slidesToShow, // ⛔ avoid infinite with too few
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true, // 👈 enable auto-rotation
    autoplaySpeed: 4000, // 👈 rotate every 4 seconds (adjust as needed)
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <CarouselWrapper>
      <Slider {...settings}>{children}</Slider>
    </CarouselWrapper>
  );
};

export default StyledCarousel;
