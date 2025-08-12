/* eslint-disable no-unused-vars */
import Blog from "../components/Blog/Blog";
import Pagination from "../components/Pagination/Pagination";
import blogImg from "../assets/blog.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { get_blogs } from "../store/reducers/homeReducer";
import Loading from "../components/Loading/Loading";

const Blogs = () => {
  const dispatch = useDispatch();
  const { blogs = [], totalBlog = 0 } = useSelector((state) => state.home);

  const [currentPage, setCurrentPage] = useState(1);
  const [parPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      left: 0,
      top: 0,
    });
  }, []);

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const params = { parPage, page: currentPage };
      await dispatch(get_blogs(params)).unwrap();
    } catch (err) {
      setError("ব্লগ লোড করতে সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  }, [dispatch, parPage, currentPage]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return (
    <div>
      {/* Banner */}
      <div className="relative font-sans before:absolute before:w-full before:h-full before:inset-0 before:bg-black before:opacity-50 before:z-10">
        <img
          src={blogImg}
          alt="Banner Image"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="min-h-[350px] relative z-50 h-full max-w-6xl mx-auto flex flex-col justify-center items-center text-center text-white p-6">
          <h2 className="sm:text-4xl text-2xl font-bold mb-6">
            &#34;স্বাস্থ্য সংক্রান্ত তথ্য, আপনার আঙ্গুলের ডগায়&#34;
          </h2>
          <p className="sm:text-lg text-base text-center text-gray-200">
            &#34;শুধু চিকিৎসা নয়, স্বাস্থ্যকর জীবনের প্রতিটি দিক নিয়ে ভাবনা —
            নিয়মিত পড়ুন আমাদের ব্লগ।&#34;
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white font-[sans-serif] my-4">
        <div className="max-w-7xl max-lg:max-w-2xl mx-auto px-3">
          {/* Error */}
          {error && (
            <p className="text-red-500 text-center font-semibold my-4">
              {error}
            </p>
          )}

          {/* Loading */}
          {loading && <Loading />}

          {/* Blogs List */}
          {!loading && blogs.length === 0 && !error && (
            <p className="text-center font-semibold my-4">
              কোনো ব্লগ পাওয়া যায়নি।
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-16 max-lg:max-w-3xl max-md:max-w-md mx-auto">
            {blogs.map((blog, i) => (
              <Blog key={blog.id || i} blog={blog} />
            ))}
          </div>

          {/* Pagination */}
          {totalBlog > parPage && (
            <div className="mt-8">
              <Pagination
                pageNumber={currentPage}
                setPageNumber={setCurrentPage}
                totalItem={totalBlog}
                parPage={parPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
