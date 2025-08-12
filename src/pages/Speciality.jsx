import { Link } from "react-router-dom";
import SpecialityCard from "../components/Speciality/SpecialityCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { get_category } from "../store/reducers/homeReducer";
import Loading from "../components/Loading/Loading";

const Speciality = () => {
  const dispatch = useDispatch();
  const { category, loading, error } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(get_category());
  }, [dispatch]);

  return (
    <div>
      {
        category &&        <div className="font-[sans-serif] p-4 pb-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center lg:mb-5 lg:px-3">
          <h2 className="text-3xl max-lg:text-xl font-semibold text-gray-800">
            বিশেষজ্ঞতার তালিকা
          </h2>
          <button className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-sky-500 text-sm font-medium text-gray-900 cursor-pointer gap-2 hover:text-white border border-sky-500">
            <Link to="/all-speciality">সব বিশেষজ্ঞ দেখুন</Link>
          </button>
        </div>

        {/* লোড হচ্ছে */}
        {loading && <Loading />}

        {/* ত্রুটি (Error) */}
        {error && (
          <div className="text-center text-red-500 text-lg my-5">
            কিছু সমস্যা হয়েছে, পরে আবার চেষ্টা করুন।
          </div>
        )}

        {/* ক্যাটাগরি তালিকা */}
        {!loading && !error && (
          <div className="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 gap-8 text-center mt-12 px-5">
            {category?.length > 0 ? (
              category.map((cat) => <SpecialityCard cat={cat} key={cat._id} />)
            ) : (
              <div className="text-center text-gray-600 col-span-full">
                কোনো বিশেষজ্ঞ পাওয়া যায়নি।
              </div>
            )}
          </div>
        )}
      </div>
      }

    </div>
  );
};

export default Speciality;
