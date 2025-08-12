/* eslint-disable no-unused-vars */
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_user_ambulances } from "../../store/reducers/homeReducer";
import Pagination from "../Pagination/Pagination";

// 🔁 Status Badge Styles
const getStatusBadgeClass = (status) => {
  const classes = {
    pending: "bg-yellow-100 text-yellow-700 ring-1 ring-yellow-300",
    confirmed: "bg-green-100 text-green-700 ring-1 ring-green-300",
    cancelled: "bg-red-100 text-red-700 ring-1 ring-red-300",
  };
  return classes[status] || "bg-gray-100 text-gray-700 ring-1 ring-gray-300";
};

// 🔁 English to Bangla Number
const engToBanglaNumber = (number) => {
  const banglaNumbers = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return number.toString().split('').map((char) =>
    /\d/.test(char) ? banglaNumbers[parseInt(char)] : char
  ).join('');
};

// 🔁 Format Bangla Date
const formatBanglaDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('bn-BD', options);
};

// 🔁 Convert Time to Bangla Format with Label & AM/PM
const convertToBanglaTime = (timeString) => {
  if (!timeString) return '';
  const [hourStr, minuteStr] = timeString.split(':');
  const hour = parseInt(hourStr);
  const minute = parseInt(minuteStr);

  let label = '';
  if (hour >= 0 && hour < 6) label = ' রাত';
  else if (hour >= 6 && hour < 12) label = ' সকাল';
  else if (hour >= 12 && hour < 14) label = ' দুপুর';
  else if (hour >= 14 && hour < 18) label = ' বিকাল';
  else label = ' সন্ধ্যা';

  const hour12 = hour % 12 === 0 ? 12 : hour % 12;

  const formatted = `${hour12}:${minuteStr.padStart(2, '0')}`;
  const banglaFormatted = engToBanglaNumber(formatted);

  return `${label} (${banglaFormatted})`;
};

const statusOptions = [
  { value: "all", label: "📋 সব" },
  { value: "pending", label: "🕑 পেন্ডিং" },
  { value: "confirmed", label: "✅ কনফার্মড" },
  { value: "cancelled", label: "❌ বাতিল" },
];

const AppoinmentHistory = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { ambulances, totalAmbulance } = useSelector((state) => state.home);
  const [currentPage, setCurrentPage] = useState(1);
  const [parPage, setParPage] = useState(5);
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(false);

  const fetchAppointments = useCallback(async () => {
    if (!userInfo?._id) return;
    setLoading(true);
    await dispatch(
      get_user_ambulances({
        parPage,
        page: currentPage,
        userId: userInfo._id,
        status,
      })
    );
    setLoading(false);
  }, [dispatch, userInfo, status, currentPage, parPage]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-slate-800">
        📋 আমার অ্যাম্বুলেন্স তালিকা
      </h2>

      {/* Status Filter Buttons */}
      <div className="mb-8 flex justify-center flex-wrap gap-3">
        {statusOptions.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setStatus(value)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 border shadow-sm ${
              status === value
                ? "bg-blue-600 text-white border-blue-600 shadow-md scale-105"
                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100 hover:shadow"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Loader or Data */}
      {loading ? (
        <p className="text-center text-slate-600 text-lg py-10 animate-pulse">
          ডেটা লোড হচ্ছে ⏳
        </p>
      ) : ambulances.length === 0 ? (
        <p className="text-center text-slate-600 text-lg py-10">
          কোনো অ্যাম্বুলেন্স পাওয়া যায়নি 📭
        </p>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto rounded-xl shadow-lg border border-slate-200">
            <table className="w-full text-sm text-left text-slate-700">
              <thead className="text-xs lg:text-sm uppercase bg-slate-50 text-slate-600 border-b text-center">
                <tr>
                  <th className="px-4 py-3">বুকিং আইডি</th>
                  <th className="px-4 py-3">নাম</th>
                  <th className="px-4 py-3">মোবাইল</th>
                  <th className="px-4 py-3">পিকআপ তারিখ</th>
                  <th className="px-4 py-3">পিকআপ সময়</th>
                  <th className="px-4 py-3">স্ট্যাটাস</th>
                </tr>
              </thead>
              <tbody>
                {ambulances.map((item, index) => (
                  <tr
                    key={item._id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-slate-50"
                    } hover:bg-slate-100 transition text-center`}
                  >
                    <td className="px-4 py-3 font-mono text-xs text-slate-600 uppercase">
                      {item._id}
                    </td>
                    <td className="px-4 py-3">{item?.name}</td>
                    <td className="px-4 py-3">
                      {engToBanglaNumber(item?.phone)}
                    </td>
                    <td className="px-4 py-3">
                      {formatBanglaDate(item.pickupDate)}
                    </td>
                    <td className="px-4 py-3">
                      {convertToBanglaTime(item.pickupTime)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${getStatusBadgeClass(
                          item.status
                        )}`}
                      >
                        {item.status === "pending"
                          ? "পেন্ডিং"
                          : item.status === "confirmed"
                          ? "কনফার্মড"
                          : "বাতিল"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-5 mt-4">
            {ambulances.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl p-5 shadow border flex flex-col gap-4"
              >
                <div className="grid grid-cols-2 gap-3 text-sm text-slate-700">
                  <p>
                    <strong>বুকিং আইডি:</strong>{" "}
                    <span className="font-mono text-xs uppercase">
                      {item._id}
                    </span>
                  </p>
                  <p>
                    <strong>নাম:</strong> {item.name}
                  </p>
                  <p>
                    <strong>মোবাইল:</strong>{" "}
                    {engToBanglaNumber(item.phone)}
                  </p>
                  <p>
                    <strong>পিকআপ তারিখ:</strong>{" "}
                    {formatBanglaDate(item.pickupDate)}
                  </p>
                  <p>
                    <strong>পিকআপ সময়:</strong>{" "}
                    {convertToBanglaTime(item.pickupTime)}
                  </p>
                  <p>
                    <strong>স্ট্যাটাস:</strong>{" "}
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusBadgeClass(
                        item.status
                      )}`}
                    >
                      {item.status === "pending"
                        ? "পেন্ডিং"
                        : item.status === "confirmed"
                        ? "কনফার্মড"
                        : "বাতিল"}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Pagination */}
      {totalAmbulance > parPage && (
        <div className="w-full flex justify-end mt-6">
          <Pagination
            pageNumber={currentPage}
            setPageNumber={setCurrentPage}
            totalItem={totalAmbulance}
            parPage={parPage}
            showItem={3}
          />
        </div>
      )}
    </div>
  );
};

export default AppoinmentHistory;
