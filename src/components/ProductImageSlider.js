import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import { Image } from "antd";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import $ from "jquery";

const ProductImageSlider = (props) => {
  const [Images, setImages] = useState([]);
  const { images, openModal } = props;
  useEffect(() => {
    setImages(images);
    return () => {
      setImages([]);
    };
  }, [images]);

  // $(document).ready(function () {
  //   const carouselHeight = $(".carousel-root .slider-wrapper img").height();
  //   $(".carousel-root .thumbs-wrapper").css("height", carouselHeight);
  // });

  return (
    <div className="carousel-container">
      <Carousel showArrows={false} axis={"horizontal"} showIndicators={false}>
        {Images.length > 0
          ? Images.map((item, index) => {
              return (
                <div key={index} onClick={() => openModal(true)}>
                  <img src={item} alt="" />
                </div>
              );
            })
          : ""}
      </Carousel>
    </div>
  );
};

export default ProductImageSlider;
