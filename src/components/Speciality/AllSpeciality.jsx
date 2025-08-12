import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import SpecialityCard from "./SpecialityCard";
import { get_categorys } from "../../store/reducers/homeReducer";
import Loading from "../Loading/Loading";
import SEO from "../SEO/SEO";

const AllSpeciality = () => {
  const dispatch = useDispatch();
  const { categorys, loading } = useSelector(state => state.home);

  // Fetch data on mount and scroll to top
  useEffect(() => {
    dispatch(get_categorys());
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [dispatch]);

  if (loading) {
    return <Loading />; // Clean early return
  }

  return (
    <>
      {/* SEO for the page */}
      <SEO
        title="বিশেষজ্ঞতার তালিকা | বাংলাদেশ"
        description="এখানে বাংলাদেশে বিভিন্ন চিকিৎসকের বিশেষজ্ঞতার তালিকা দেখুন।"
        keywords="বিশেষজ্ঞ, ডাক্তার, স্বাস্থ্য, চিকিৎসা, বাংলাদেশ"
      />

      <div className="font-[sans-serif] p-4 pb-8">
        <div className="max-w-7xl max-sm:max-w-sm mx-auto">
          {/* Heading */}
          <div className="flex justify-center items-center lg:mb-5 px-5">
            <div className="mb-2">
              <h2 className="text-3xl max-lg:text-xl text-center font-semibold text-gray-800">
                বিশেষজ্ঞতার তালিকা
              </h2>
            </div>
          </div>

          {/* Category Cards */}
          <div className="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 gap-8 text-center mt-8 px-5">
            {categorys?.map((cat, i) => (
              <SpecialityCard cat={cat} key={cat._id || i} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllSpeciality;
