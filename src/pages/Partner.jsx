/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

// import required modules
import { Autoplay, FreeMode } from "swiper/modules";
import { Link } from "react-router-dom";
import { PARTNERS } from "../utils/local";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { get_all_hospitals } from "../store/reducers/homeReducer";
import Loading from "../components/Loading/Loading";
const Partner = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { hospitals } = useSelector((state) => state.home);
  console.log(hospitals);

  useEffect(() => {
    dispatch(get_all_hospitals());
    setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if(loading){
    <Loading/>
  }
  return (
    <div>
     {
      hospitals &&  <section className=" mx-auto  !max-w-screen-5xl   text-gray-500 dark:text-gray-400  px-4 py-6 antialiased dark:bg-gray-900 md:py-10  ">
        <div className="max-w-7xl mx-auto px-3 lg:flex lg:justify-center lg:items-center lg:mb-2 md:flex md:justify-center md:items-center md:pb-5">
          <div className=" text-center mb-5">
            <h2 className="lg:text-2xl text-xl text-center max-lg:text-center md:text-center font-semibold text-gray-800 inline-block  ">
              আমাদের হাসপাতাল ও ল্যাব পার্টনাররা
            </h2>
          </div>
        </div>
        <div className=" w-full max-w-7xl mx-auto flex justify-center items-center overflow-visible px-10">
          <Swiper
            spaceBetween={10}
            freeMode={true}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              320: { slidesPerView: 3, spaceBetween: 5 },
              480: { slidesPerView: 4, spaceBetween: 8 },
              640: { slidesPerView: 4, spaceBetween: 10 },
              768: { slidesPerView: 5, spaceBetween: 15 },
              1024: { slidesPerView: 6, spaceBetween: 20 },
              1280: { slidesPerView: 7, spaceBetween: 25 },
              1536: { slidesPerView: 8, spaceBetween: 30 },
            }}
            modules={[Autoplay, FreeMode]}
            className="w-full max-w-7xl !flex !justify-center !items-center !mx-auto overflow-visible myPartner"
          >
            {hospitals?.map((partner, i) => (
              <SwiperSlide
                key={i}
                className="flex justify-center items-center w-auto"
              >
                <Link href="#">
                  <img
                    className="w-auto h-auto max-w-[60px] sm:max-w-[90px] md:max-w-[90px] lg:max-w-[100px]"
                    src={partner?.image}
                    alt=""
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
     }
    </div>
  );
};

export default Partner;
