/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Slider = ({ banners }) => {

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="!max-w-7xl !mx-auto !flex !justify-between  !items-center !lg:mb-5  !px-4   mySlider"
    >
       {banners && banners.length > 0 ? (
        banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <img
              className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[380px] object-fill object-center rounded-xl"
              src={banner?.image?.url}
              alt={banner?.altText || `banner-${index + 1}`}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </SwiperSlide>
        ))
      ) : (
        <p className="text-center py-10 text-gray-500 text-lg !mx-auto">কোনো ব্যানার পাওয়া যায়নি</p>
      )}
    </Swiper>
  );
};

export default Slider;
