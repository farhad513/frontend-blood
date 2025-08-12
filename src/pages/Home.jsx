import {  useEffect, useState } from "react";
import Hero from "../components/Home/Hero";
import Slider from "../components/Home/Slider";
import Partner from "./Partner";
import Speciality from "./Speciality";
import DoctorSlider from "../components/Doctor/DoctorSlider";
import SeoHelmet from "../components/SEO/SEO";
import { useDispatch, useSelector } from "react-redux";
import { get_banners } from "../store/reducers/homeReducer";
import Loading from "../components/Loading/Loading";
const Home = () => {
    const dispatch= useDispatch()
  const [loading,setLoading] = useState(true)
 const { banners } = useSelector(state => state.home)
  useEffect(() => {
        dispatch(get_banners())
        setLoading(false)
    }, [])

  
  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      left: 0,
      top: 0,
    });
  }, []);
  if(loading){
    <Loading/>
  }
  return (
    <>
      <SeoHelmet
        title={"হোম | স্বাস্থ্যসেবা প্ল্যাটফর্ম"}
        description={
          "বাংলাদেশের সেরা অনলাইন স্বাস্থ্যসেবা প্ল্যাটফর্ম। ডাক্তারের অ্যাপয়েন্টমেন্ট, রক্তদাতা খুঁজুন, হাসপাতাল তথ্য এবং আরও অনেক কিছু।"
        }
        keywords={
          "বাংলাদেশ স্বাস্থ্যসেবা, অনলাইন ডাক্তারের অ্যাপয়েন্টমেন্ট, রক্তদাতা, হাসপাতাল, মেডিকেল ব্লগ, স্বাস্থ্য প্ল্যাটফর্ম"
        }
        url={"https://medifasthealthcare.com/"}
      />
      <div className="bg-white mb-5 ">
        {banners?.length > 0 && <Slider banners={banners} />}
        <Hero />
        <Speciality />
        <DoctorSlider />
        <Partner />
      </div>
    </>
  );
};

export default Home;
