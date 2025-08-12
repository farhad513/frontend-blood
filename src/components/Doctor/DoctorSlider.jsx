import  { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { Autoplay, FreeMode } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { get_doctors } from "../../store/reducers/homeReducer";
import Doctor from "./Doctor";
import Loading from "../Loading/Loading";

const DoctorSlider = () => {
  const dispatch = useDispatch();
  const {userInfo} = useSelector((state=> state.user))
  const { doctors, loading } = useSelector((state) => state.home);
  const [swiperLoaded, setSwiperLoaded] = useState(false);

  useEffect(() => {
    if(userInfo) {
          dispatch(get_doctors());
    }
  }, [dispatch]);

  useEffect(() => {
    if (doctors.length > 0) {
      setSwiperLoaded(true);
    }
  }, [doctors]);

  if (loading) {
    return <div><Loading/></div>; // Optional: Add a nice loading indicator here.
  }

  return (
    <>
    {
      userInfo ?  <>       <div className="max-w-7xl mx-auto px-3 lg:flex lg:justify-center lg:items-center md:flex md:justify-center md:items-center md:pb-2 mb-5">
        <div className="text-center">
          <h2 className="lg:text-2xl text-xl font-semibold text-gray-800 inline-block">
            আপনার এলাকার অভিজ্ঞ ও বিশ্বস্ত ডাক্তারদের এক নজরে দেখুন।
          </h2>
        </div>
      </div>  {swiperLoaded && (
        <Swiper
          spaceBetween={10}
          freeMode={true}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 4,
            },
            1280: {
              slidesPerView: 5,
            },
            1536: {
              slidesPerView: 6,
            },
          }}
          modules={[Autoplay, FreeMode]}
          className="!max-w-7xl !mx-auto !px-3 !overflow-hidden"
        >
          {doctors.map((doctor) => (
            <SwiperSlide key={doctor._id}> {/* Ensure each element has a unique key */}
              <Doctor doctor={doctor} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}  </> :""
    }


      
    </>
  );
};

export default DoctorSlider;
