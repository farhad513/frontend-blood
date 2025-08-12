/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback, forwardRef } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  bookAppointment,
  messageClear,
} from "../../store/reducers/homeReducer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getDay, format } from "date-fns";
import { bn } from "date-fns/locale";

const banglaRegex = /^[\u0980-\u09FF\s০-৯]+$/; // বাংলা অক্ষর ও সংখ্যা

const initialFormData = {
  name: "",
  phone: "",
  appointmentDate: null,
  address: "",
  age: "",
  purpose: "",
};

// ইংরেজি সংখ্যাকে বাংলায় কনভার্ট করার ফাংশন
const convertToBanglaNumber = (input) => {
  if (!input) return "";
  const engToBan = {
    0: "০",
    1: "১",
    2: "২",
    3: "৩",
    4: "৪",
    5: "৫",
    6: "৬",
    7: "৭",
    8: "৮",
    9: "৯",
  };
  return input.toString().replace(/[0-9]/g, (digit) => engToBan[digit]);
};

// কাস্টম ইনপুট যা ইংরেজি তারিখকে বাংলায় দেখাবে (দিন, মাস, বছর)
const CustomInput = forwardRef(({ value, onClick }, ref) => {
  // value আসবে ইংরেজিতে যেমন "22 May 2025"
  // তাই value থেকে ইংরেজি সংখ্যা ও মাসের নাম বাংলায় কনভার্ট করতে হবে

  // মাসের ইংরেজি থেকে বাংলা নাম
  const monthMap = {
    January: "জানুয়ারি",
    February: "ফেব্রুয়ারি",
    March: "মার্চ",
    April: "এপ্রিল",
    May: "মে",
    June: "জুন",
    July: "জুলাই",
    August: "আগস্ট",
    September: "সেপ্টেম্বর",
    October: "অক্টোবর",
    November: "নভেম্বর",
    December: "ডিসেম্বর",
  };

  // value টোকেনাইজ করে বাংলা করে গঠন
  const convertDateToBangla = (val) => {
    if (!val) return "";
    // val example: "22 May 2025"
    const parts = val.split(" ");
    if (parts.length !== 3) return val; // unexpected format হলে অপরিবর্তিত রাখুন
    const [day, month, year] = parts;
    const banglaDay = convertToBanglaNumber(day);
    const banglaMonth = monthMap[month] || month;
    const banglaYear = convertToBanglaNumber(year);
    return `${banglaDay} ${banglaMonth} ${banglaYear}`;
  };

  return (
    <input
      ref={ref}
      onClick={onClick}
      value={convertDateToBangla(value)}
      readOnly
      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md cursor-pointer"
      placeholder="তারিখ নির্বাচন করুন"
    />
  );
});

const Booking = () => {
  const dispatch = useDispatch();
  const { state: doctor } = useLocation();
  const { userInfo } = useSelector((state) => state.user);
  const { errorMessage, successMessage } = useSelector((state) => state.home);
  console.log(doctor)
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (userInfo) {
      setFormData((prev) => ({
        ...prev,
        name: userInfo.name || "",
        phone: userInfo.phone ? convertToBanglaNumber(userInfo.phone) : "",
      }));
    }
  }, [userInfo]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    if (name === "phone" || name === "age") {
      if (value && !/^[০-৯\s]*$/.test(value)) {
        toast.error("শুধুমাত্র বাংলা সংখ্যা লিখুন।");
        return;
      }
    } else if (value && !banglaRegex.test(value) && name !== "purpose") {
      toast.error("শুধুমাত্র বাংলা অক্ষর ও সংখ্যা লিখুন।");
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const validateForm = () => {
    const { name, phone, appointmentDate, address, age, purpose } =
      formData;

    if (
      !name?.trim() ||
      !phone?.trim() ||
      !appointmentDate ||
      !address?.trim() ||
      !age?.trim() ||
      !purpose?.trim()
    ) {
      toast.error("অনুগ্রহ করে সকল তথ্য পূরণ করুন।");
      return false;
    }

    if (!/^[০-৯]{10,15}$/.test(phone)) {
      toast.error("সঠিক বাংলা ফোন নম্বর দিন (১০-১৫ অঙ্ক)।");
      return false;
    }

    if (!/^[০-৯]{1,3}$/.test(age)) {
      toast.error("বয়স অবশ্যই বাংলা সংখ্যায় হতে হবে (১-৩ অঙ্ক)।");
      return false;
    }

    return true;
  };

  const allowedDays = doctor?.appoinment?.doctorInfo?.slots?.map(
    (slot) => slot.day
  );

  const daysInEnglish = {
    রবিবার: 0,
    সোমবার: 1,
    মঙ্গলবার: 2,
    বুধবার: 3,
    বৃহস্পতিবার: 4,
    শুক্রবার: 5,
    শনিবার: 6,
  };

  const isDayAvailable = (date) => {
    const dayIndex = getDay(date);
    return allowedDays?.some((d) => daysInEnglish[d] === dayIndex);
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!validateForm()) return;

      const bookingPayload = {
        ...formData,
        appointmentDate: formData.appointmentDate
          ? format(formData.appointmentDate, "dd-MM-yyyy")
          : "",
        doctorId: doctor?.appoinment?.doctorInfo?._id || null,
        hospitalId: doctor?.appoinment?.hospitalId || null,
        userId: userInfo?._id || null,
      };

      dispatch(bookAppointment(bookingPayload));
    },
    [formData, doctor, userInfo, dispatch]
  );
console.log(doctor,"appoinment")
  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setFormData(initialFormData);
    }
  }, [successMessage, errorMessage, dispatch]);

  return (
    <div>
      <div className="flex flex-col-reverse lg:flex-row gap-8 items-start justify-center p-6 lg:p-12">
        <div className="w-full lg:w-1/2 bg-white rounded-xl shadow-md p-6">
          <form onSubmit={handleSubmit} noValidate>
            <InputField
              label="পূর্ণ নাম"
              name="name"
              value={formData.name}
              placeholder="আপনার নাম লিখুন"
              onChange={handleChange}
            />
            <InputField
              label="ফোন নম্বর"
              name="phone"
              value={formData.phone}
              placeholder="বাংলা ফোন নম্বর লিখুন"
              onChange={handleChange}
            />
            <InputField
              label="রোগীর বয়স"
              name="age"
              value={formData.age}
              placeholder="বয়স (বাংলা সংখ্যা)"
              onChange={handleChange}
            />

            <div className="mb-5 flex flex-col lg:flex-row gap-4">
              <div className="w-full lg:w-1/2">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  অ্যাপয়েন্টমেন্টের তারিখ
                </label>
                <DatePicker
                  wrapperClassName="w-full"
                  selected={formData.appointmentDate}
                  onChange={(date) =>
                    setFormData((prev) => ({
                      ...prev,
                      appointmentDate: date,
                    }))
                  }
                  filterDate={isDayAvailable}
                  dateFormat="dd MMMM yyyy"
                  locale={bn}
                  placeholderText="তারিখ নির্বাচন করুন"
                  calendarClassName="z-50"
                  customInput={<CustomInput />}
                />
              </div>

              <div className="w-full lg:w-1/2">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  অ্যাপয়েন্টমেন্টের ধরন
                </label>
                <select
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                >
                  <option value="">নির্বাচন করুন</option>
                  <option value="প্রথম বার">প্রথম বার</option>
                  <option value="ফলো আপ">ফলো আপ</option>
                  <option value="রিপোর্ট দেখানো">রিপোর্ট দেখানো</option>
                </select>
              </div>
            </div>
            <InputField
              label="ঠিকানা"
              name="address"
              placeholder="আপনার এলাকার নাম লিখুন"
              value={formData.address}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="hover:shadow-form w-full cursor-pointer rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              অ্যাপয়েন্টমেন্ট বুক করুন
            </button>
          </form>
        </div>

        {doctor?.appoinment && (
          <div className="w-full lg:w-1/2 bg-white rounded-xl shadow-md p-6">
            <div className="flex flex-col lg:flex-row items-center gap-4">
              <img
                src={doctor?.appoinment?.doctorInfo?.image?.url}
                alt={doctor?.appoinment?.doctorInfo?.name}
                className="w-32 h-32 object-cover rounded-full border"
              />
              <div className="text-center lg:text-left">
                <h2 className="text-xl font-bold text-gray-800">
                  {doctor?.appoinment?.doctorInfo?.name}
                </h2>
                <p className="text-sm text-gray-600">
                  {doctor?.appoinment?.doctorInfo?.experience} বছরের অভিজ্ঞতা
                </p>
                <p className="text-sm text-gray-600">
                  {doctor?.appoinment?.doctorInfo?.category}
                </p>
                <p className="text-sm mt-1">
                  <span className="font-semibold text-gray-700">হাসপাতাল:</span>{" "}
                  {/* {doctor?.appoinment?.doctorInfo?.hospitalId.name} */}
                  {doctor?.appoinment?.doctorInfo?.hospitalId?.name || doctor?.appoinment?.doctorInfo?.hospital?.name}

                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const InputField = React.memo(
  ({ label, name, value, placeholder, onChange, type = "text" }) => (
    <div className="mb-5">
      {label && (
        <label
          htmlFor={name}
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        required
      />
    </div>
  )
);

export default Booking;
