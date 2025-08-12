/* eslint-disable no-unused-vars */
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_user_appointments } from "../../store/reducers/homeReducer";
import Pagination from "../Pagination/Pagination";

// স্ট্যাটাস ব্যাজের স্টাইল
const getStatusBadgeClass = (status) => {
  const classes = {
    pending: "bg-yellow-100 text-yellow-700 ring-1 ring-yellow-300",
    confirmed: "bg-green-100 text-green-700 ring-1 ring-green-300",
    cancelled: "bg-red-100 text-red-700 ring-1 ring-red-300",
  };
  return classes[status] || "bg-gray-100 text-gray-700 ring-1 ring-gray-300";
};

const statusOptions = [
  { value: "all", label: "📋 সব" },
  { value: "pending", label: "🕑 পেন্ডিং" },
  { value: "confirmed", label: "✅ কনফার্মড" },
  { value: "cancelled", label: "❌ বাতিল" },
];

const UserAppointments = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { myAppointments, totalAppoinments } = useSelector((state) => state.home);
  const [currentPage, setCurrentPage] = useState(1);
  console.log(myAppointments)
  const [parPage, setParPage] = useState(5);
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(false);
 const fetchAppointments = useCallback(async () => {
    if (!userInfo?._id) return;
    setLoading(true);
    await dispatch(
      get_user_appointments({
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

  
  const engToBanglaNumber = (number) => {
    const banglaNumbers = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return number.toString().split('').map(char => 
      char >= '0' && char <= '9' ? banglaNumbers[char] : char
    ).join('');
  };
  
  const formatBanglaDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formatted = date.toLocaleDateString('bn-BD', options);
    return formatted;
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-slate-800">
        📋 আমার অ্যাপয়েন্টমেন্ট তালিকা
      </h2>

      <div className="mb-8 flex justify-center flex-wrap gap-3">
        {statusOptions.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setStatus(value)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 border shadow-sm
              ${
                status === value
                  ? "bg-blue-600 text-white border-blue-600 shadow-md scale-105"
                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100 hover:shadow"
              }`}
          >
            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-center text-slate-600 text-lg py-10 animate-pulse">
          ডেটা লোড হচ্ছে ⏳
        </p>
      ) : myAppointments.length === 0 ? (
        <p className="text-center text-slate-600 text-lg py-10">
          কোনো অ্যাপয়েন্টমেন্ট পাওয়া যায়নি 📭
        </p>
      ) : (
        <>
          <div className="hidden lg:block overflow-x-auto rounded-xl shadow-lg border border-slate-200">
            <table className="w-full text-sm text-left text-slate-700">
              <thead className="text-xs lg:text-sm uppercase bg-slate-50 text-slate-600 border-b text-center">
                <tr>
                  <th className="px-4 py-3">আইডি</th>
                  <th className="px-4 py-3">ডাক্তার</th>
                  <th className="px-4 py-3">ক্যাটাগরি</th>
                  <th className="px-4 py-3">তারিখ</th>
                  <th className="px-4 py-3">অবস্থা</th>
                  <th className="px-4 py-3">সিরিয়াল</th>
                </tr>
              </thead>
              <tbody>
                {myAppointments.map((item, index) => (
                  <tr
                    key={item._id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-slate-50"
                    } hover:bg-slate-100 transition text-center`}
                  >
                    <td className="px-4 py-3 font-mono text-sm text-slate-600">{item._id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3 justify-center">
                        <img
                          src={item?.doctorId?.image?.url}
                          alt={item?.doctorId?.name}
                          className="w-10 h-10 rounded-full object-cover border"
                        />
                        <span className="font-semibold text-slate-800 text-base">
                          {item?.doctorId?.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{item?.doctorId?.category}</td>
                    <td className="px-4 py-3">{formatBanglaDate(item?.appointmentDate)}</td>
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
                    <td className="px-4 py-3">{item.serial}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="lg:hidden space-y-5">
            {myAppointments.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl p-5 shadow border flex flex-col gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item?.doctorId?.image?.url}
                    alt={item?.doctorId?.name}
                    className="w-16 h-16 rounded-full object-cover border"
                  />
                  <div>
                    <h4 className="font-semibold text-slate-800 text-xl">
                      {item?.doctorId?.name}
                    </h4>
                    <p className="text-sm text-slate-600">{item?.doctorId?.category}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm text-slate-700">
                  <p><strong>আইডি:</strong> <span className="font-mono text-xs">{item._id}</span></p>
                  <p><strong>তারিখ:</strong>{formatBanglaDate(item?.appointmentDate)}</p>
                  <p><strong>সিরিয়াল:</strong> {item.serial}</p>
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
        {totalAppoinments > parPage && (
            <div className="w-full flex justify-end mt-4">
              <Pagination
                pageNumber={currentPage}
                setPageNumber={setCurrentPage}
                totalItem={totalAppoinments}
                parPage={parPage}
                showItem={3}
              />
            </div>
          )}
    </div>
  );
};

export default UserAppointments;
