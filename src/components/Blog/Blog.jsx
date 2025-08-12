/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
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
    <div>
      <div className="bg-white  rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative top-0 hover:-top-2 transition-all duration-300" style={{ height: 380 }}>
        <img
          src={blog?.image?.url}
          alt="Blog Post 1"
          className="w-full h-60 object-cover"
        />
        <div className="p-6">
          <span className="text-sm block text-gray-400 mb-2">
            {" "}
            প্রকাশিত: {formatDateBn(blog?.createdAt)}
          </span>

          <Link to={`/blog/${blog?._id}`}>
            <h3 className="text-lg font-bold text-gray-800 text-justify">{blog?.title.split(" ").slice(0, 12).join(" ")}</h3>
          </Link>
          {/* <hr className="my-4" />
              <p className="text-gray-400 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nunc et tempus blandit, metus mi consectetur felis turpis vitae ligula.</p> */}
        </div>
      </div>
    </div>
  );
};

export default Blog;
