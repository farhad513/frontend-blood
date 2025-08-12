/* eslint-disable react/prop-types */
import { BiLogoGmail } from "react-icons/bi";
import { FaMobileScreen } from "react-icons/fa6";

const placeholderImage =
  "https://via.placeholder.com/400x300?text=No+Image"; // Default image

const Hospital = ({ hospital }) => {

  return (
    <div className="flex items-center justify-center bg-white">
      {/* Card */}
      <div className="w-80 h-[360px] border border-blue-200 rounded-lg shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
        {/* Image */}
        <div>
          <img
            src={hospital?.image || placeholderImage}
            alt={hospital?.name || "Hospital"}
            loading="lazy" // lazy load for performance
            className="object-cover w-full h-[200px] rounded-md"
          />

          {/* Info */}
          <div className="mt-4 space-y-1">
            <h3 className="text-gray-800 font-semibold text-lg line-clamp-1">
              {hospital?.name || "নাম পাওয়া যায়নি"}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-1">
              {hospital?.address || "ঠিকানা পাওয়া যায়নি"}
            </p>

            {hospital?.email ? (
              <div className="flex gap-2 items-center text-sm text-gray-700 break-all">
                <BiLogoGmail className="text-red-500" />
                <p>{hospital.email}</p>
              </div>
            ) : (
              <div className="h-5" />
            )}

            {hospital?.phone ? (
              <div className="flex gap-2 items-center text-sm text-gray-700">
                <FaMobileScreen className="text-green-500" />
                <p>{hospital.phone}</p>
              </div>
            ) : (
              <div className="h-5" />
            )}
          </div>
        </div>


      </div>


    </div>
  );
};

export default Hospital;
