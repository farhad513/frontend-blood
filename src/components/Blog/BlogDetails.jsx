/* eslint-disable react/no-unescaped-entities */
import { IoIosArrowForward } from "react-icons/io";
import Blog from "./Blog";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import htmlParser from "html-react-parser";
import { get_blog } from "../../store/reducers/homeReducer";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading/Loading";

const BlogDetails = () => {
  const { blogId } = useParams();
  const dispatch = useDispatch();
  const { blog } = useSelector((state) => state.home);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        await dispatch(get_blog(blogId)).unwrap();
      } catch (err) {
        console.log("ব্লগ লোড সমস্যা:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [dispatch, blogId]);

  const formatDateBn = (dateString) => {
    if (!dateString) return "";
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {loading ? (
        <Loading/>

      ) : (
        <main className="pt-8 pb-16 lg:pt-15 lg:pb-15 antialiased">
          <div className="px-4 mx-auto max-w-screen-xl">
            <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
              <header className="mb-4 lg:mb-6 not-format">
                {/* Breadcrumb */}
                <ul className="flex items-center space-x-2 font-[sans-serif] text-sm text-gray-500 dark:text-gray-300">
                  <li>
                    <Link to="/" className="hover:underline">হোম</Link>
                  </li>
                  <li><IoIosArrowForward /></li>
                  <li>
                    <Link to="/blogs" className="hover:underline">ব্লগ</Link>
                  </li>
                  <li><IoIosArrowForward /></li>
                  <li className="text-[#333] dark:text-white font-bold">
                    {blog?.title?.split(" ").slice(0, 6).join(" ")}...
                  </li>
                </ul>

                {/* Title */}
                <h1 className="mt-3 mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:text-4xl dark:text-white">
                  {blog?.title}
                </h1>

                {/* Publication Date */}
                {blog?.createdAt && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    প্রকাশিত: {formatDateBn(blog.createdAt)}
                  </p>
                )}
              </header>

              {/* Blog Content */}
              <div className="prose prose-lg dark:prose-invert">
                {blog?.content ? htmlParser(blog.content) : <p>কনটেন্ট খুঁজে পাওয়া যায়নি।</p>}
              </div>
            </article>
          </div>
        </main>
      )}
    </div>
  );
};

export default BlogDetails;
