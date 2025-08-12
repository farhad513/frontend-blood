/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import React, { useCallback } from "react";

const SpecialityCard = React.memo(({ cat }) => {
  const navigate = useNavigate();
 
  // Use useCallback to memoize the navigation function
  const nav = useCallback(() => {
    if (cat?.name) {
      navigate(`/our-doctors?category=${encodeURIComponent(cat.name)}`);
    }
  }, [cat, navigate]);

  // Early return if no cat data is available
  if (!cat?.name || !cat?.image) {
    return null; // Don't render if necessary data is missing
  }

  return (
    <div>
      <div className="py-2 px-2 rounded-lg hover:scale-110 transition-all duration-500">
        <img
         src={cat?.image.url}
          alt={cat?.name || "Speciality Image"} // Add alt text for accessibility and SEO
          className="w-25 h-25 rounded-full inline-block mt-2"
          loading="lazy"  // Lazy load the image
        />

        <div className="mt-2">
          <p
            className="text-gray-800 text-sm font-bold"
            style={{
              display: "flex", // Flexbox for proper alignment
              alignItems: "center", // Vertically align the text in the middle
              justifyContent: "center", // Center horizontally
              height: "40px", // Set fixed height
              overflow: "hidden", // Prevent overflow
              textOverflow: "ellipsis", // Show "..." if the text is too long
            }}
          >
            {cat?.name?.length < 22
              ? cat.name
              : cat?.name?.slice(0, 18) + "..."}
          </p>
          <button
            onClick={nav}
            className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-sky-500 dark:hover:bg-gray-700 text-sm text-gray-900 dark:text-white cursor-pointer gap-2 hover:text-white border border-sky-500 mt-4 w-full mb-2 font-semibold"
          >
            বুক করুন
          </button>
        </div>
      </div>
    </div>
  );
});

export default SpecialityCard;
