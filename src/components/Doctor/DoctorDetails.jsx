/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_doctor } from "../../store/reducers/homeReducer";
import { useNavigate, useParams } from "react-router-dom";
import htmlParser from "html-react-parser";
import SeoHelmet from "../SEO/SEO";

// বাংলা সময় ফরম্যাট
// ইংরেজি সংখ্যাকে বাংলা সংখ্যায় রূপান্তর
const toBanglaNumber = (str) => {
  const enToBnDigits = {
    '0': '০',
    '1': '১',
    '2': '২',
    '3': '৩',
    '4': '৪',
    '5': '৫',
    '6': '৬',
    '7': '৭',
    '8': '৮',
    '9': '৯',
  };
  return str.replace(/[0-9]/g, (d) => enToBnDigits[d]);
};

// বাংলা সময় ফরম্যাট (AM/PM বাংলায়, সংখ্যাও বাংলায়)
const formatTimeInBangla = (time) => {
  const date = new Date(`1970-01-01T${time}Z`);
  const options = { hour: "2-digit", minute: "2-digit", hour12: true };
  let formattedTime = date.toLocaleTimeString("en-US", options);
  formattedTime = formattedTime.replace("AM", "পূর্বাহ্ন").replace("PM", "অপরাহ্ন");
  return toBanglaNumber(formattedTime);
};


const DoctorDetails = React.memo(() => {
  const { id } = useParams();
  const onlyId = id.split("-").pop();
  const dispatch = useDispatch();
  const { doctor, isLoading } = useSelector((state) => state.home);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(get_doctor(onlyId));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [dispatch, onlyId]);

  
  const booking = useCallback(() => {
    const obj = {
      hospitalId: doctor.hospitalId,
      doctorInfo: doctor,
    };
    navigate("/doctor-booking", {
      state: { appoinment: obj },
    });
  }, [doctor, navigate]);
  
  if (isLoading) return <div className="text-center py-10">লোড হচ্ছে...</div>;
  if (!doctor) return null;

  return (
    <>
      <SeoHelmet
        title={`${doctor.name} | ডাক্তার বিস্তারিত`}
        description={`ডা. ${doctor.name} সম্পর্কে বিস্তারিত জানুন। বিশেষত্ব: ${doctor.category}, অভিজ্ঞতা: ${doctor.experience} বছর।`}
        keywords={`ডাক্তার ${doctor.name}, ${doctor.category}, ডাক্তার বুকিং`}
        url={`https://medifasthealthcare.com/doctor/details/${id}`}
      />

      <div className="bg-gray-100 dark:bg-gray-800 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image & Button */}
            <div className="space-y-3">
  <div className="w-full aspect-[4/2.5] md:aspect-[3.2/2.5] rounded-lg overflow-hidden bg-gray-300 dark:bg-gray-700">
    <img
      src={doctor?.image?.url}
      alt={`ডা. ${doctor.name}`}
      className="w-full h-full object-cover"
      loading="lazy"
    />
  </div>
  <button
    onClick={booking}
    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
  >
    অ্যাপয়েন্টমেন্ট বুক করুন
  </button>
</div>


            {/* Info */}
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{doctor.name}</h2>

              <p className="text-gray-700 dark:text-gray-300 text-base">
                <strong>বিশেষত্ব:</strong> {doctor.category}
              </p>

              <p className="text-gray-700 dark:text-gray-300 text-base">
                <strong>কনসালটেশন ফি:</strong> {doctor.fee}
              </p>

              <p className="text-gray-700 dark:text-gray-300 text-base">
                <strong>যোগ্যতা:</strong> {doctor.qualification}
              </p>

              <p className="text-gray-700 dark:text-gray-300 text-base">
                <strong>অভিজ্ঞতা:</strong> {doctor.experience} বছর
              </p>

              {doctor.description && (
                <div className="text-gray-600 dark:text-gray-300 text-sm text-justify leading-relaxed">
                  {htmlParser(doctor.description)}
                </div>
              )}

              {/* Schedule Table */}
              {doctor?.slots?.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-bold mb-2 text-center">সূচি</h3>
                  <div className="overflow-x-auto rounded-lg shadow">
                    <table className="min-w-full text-sm text-gray-700 dark:text-gray-300">
                      <thead className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
                        <tr>
                          <th className="px-4 py-2 text-center">অ্যাপয়েন্টমেন্ট</th>
                          <th className="px-4 py-2 text-center">দিন</th>
                          <th className="px-4 py-2 text-center">সময়</th>
                        </tr>
                      </thead>
                      <tbody>
                        {doctor.slots.map((slot, i) => (
                          <tr
                            key={i}
                            className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-center"
                          >
                            <td className="px-4 py-2">
                              {slot.isAvailable ? "সাধারণ" : "অলরেডি বুকড"}
                            </td>
                            <td className="px-4 py-2">{slot.day}</td>
                            <td className="px-4 py-2">
                              {formatTimeInBangla(slot.startTime)} -{" "}
                              {formatTimeInBangla(slot.endTime)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default DoctorDetails;
