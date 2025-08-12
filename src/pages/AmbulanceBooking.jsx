/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { bookAmbulance, messageClear } from "../store/reducers/homeReducer";
import { FaClock } from "react-icons/fa";
import SeoHelmet from "../components/SEO/SEO";

const AmbulanceBooking = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { errorMessage, successMessage } = useSelector((state) => state.home);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [pickupTime, setPickupTime] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [dropAddress, setDropAddress] = useState("");
  const [age, setAge] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rawPickupDate, setRawPickupDate] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [ambulanceType, setAmbulanceType] = useState("");
useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      left: 0,
      top: 0,
    });
  }, []);

  const handlePickupDateChange = (e) => {
    const engDate = e.target.value;
    setRawPickupDate(engDate);
    const [year, month, day] = engDate.split("-");
    setPickupDate(`${day}-${month}-${year}`);
  };
  const handleBooking = () => {
    if (!pickupDate || !pickupTime || !pickupAddress || !dropAddress || !age) {
      toast.error("সব তথ্য পূরণ করুন।");
      return;
    }

    const selectedDateTime = new Date(`${pickupDate}T${pickupTime}`);
    const now = new Date();
    if (selectedDateTime <= now) {
      toast.error("পিকআপের সময় বর্তমান সময়ের পরে হতে হবে।");
      return;
    }

    setIsSubmitting(true);

    const bookingData = {
      userId: userInfo?.id,
      name: userInfo?.name,
      phone: userInfo?.phone,
      pickupDate,
      pickupTime,
      pickupAddress,
      dropAddress,
      age,
      ambulanceType
    };

    dispatch(bookAmbulance(bookingData));
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      setIsSubmitting(false);
      dispatch(messageClear());
    }

    if (successMessage) {
      toast.success(successMessage);
      setIsSubmitting(false);
      setTimeout(() => {
        navigate("/");
        dispatch(messageClear());
      }, 2000);

      setPickupDate("");
      setPickupTime("");
      setPickupAddress("");
      setDropAddress("");
      setAge("");
    }
  }, [errorMessage, successMessage, dispatch, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10 px-4">
      <SeoHelmet
        title={"অ্যাম্বুলেন্স সেবা | দ্রুত ও বিশ্বস্ত রক্ত ও রোগী পরিবহন"}
        description={
          "দ্রুত অ্যাম্বুলেন্স খুঁজুন বাংলাদেশের যেকোনো স্থান থেকে। ICU, নন-AC, ডেডবডি ক্যারিয়ার ও অক্সিজেন সাপোর্ট সহ সকল ধরনের অ্যাম্বুলেন্স সার্ভিস এখন অনলাইনে বুক করুন।"
        }
        keywords={
          "অ্যাম্বুলেন্স, এম্বুলেন্স সেবা বাংলাদেশ, ICU অ্যাম্বুলেন্স, অক্সিজেন সাপোর্ট অ্যাম্বুলেন্স, Deadbody Carrier, Ambulance BD, Ambulance Service Bangladesh"
        }
        url={"https://medifasthealthcare.com/ambulance"}
      />

      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-8">
          🚑 অ্যাম্বুলেন্স বুকিং ফর্ম
        </h2>

        <div className="bg-red-100 text-red-700 text-center px-6 py-4 rounded-lg mb-6 font-medium">
          জরুরি পরিস্থিতিতে সরাসরি{" "}
          <a href="tel:01336116868" className="underline font-bold">
            01336116868
          </a>{" "}
          নম্বরে কল করুন
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleBooking();
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label className="block mb-1 text-sm font-semibold">নাম</label>
            <input
              type="text"
              value={userInfo?.name || ""}
              disabled
              className="w-full px-4 py-3 border rounded-lg bg-gray-100"
              placeholder="নাম"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold">
              মোবাইল নম্বর
            </label>
            <input
              type="text"
              value={userInfo?.phone || ""}
              disabled
              className="w-full px-4 py-3 border rounded-lg bg-gray-100"
              placeholder="মোবাইল নম্বর"
            />
          </div>
<div>
  <label className="block mb-1 text-sm font-semibold">
    অ্যাম্বুলেন্সের ধরণ
  </label>
  <select
    value={ambulanceType}
    onChange={(e) => setAmbulanceType(e.target.value)}
    className="w-full px-4 py-3 border rounded-lg"
  >
    <option value="">-- নির্বাচন করুন --</option>
    <option value="Normal">নরমাল (সাধারণ)</option>
    <option value="AC">এসি (AC)</option>
    <option value="Non-AC">নন-এসি</option>
    <option value="ICU">আইসিইউ (ICU)</option>
    <option value="Oxygen Support">অক্সিজেন সাপোর্ট</option>
    <option value="Deadbody Carrier">ডেডবডি ক্যারিয়ার</option>
  </select>
</div>

          <div>
            <label className="block mb-1 text-sm font-semibold">বয়স</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg"
              placeholder="বয়স"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold">
              পিকআপ তারিখ
            </label>
            <input
              type="date"
              //   value={pickupDate}
              //   onChange={(e) => setPickupDate(e.target.value)}
              value={rawPickupDate}
              onChange={handlePickupDateChange}
              className="w-full px-4 py-3 border rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold">
              পিকআপ সময়
            </label>
            <div className="relative">
              <input
                type="time"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg pr-10"
                style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
              />
              <FaClock
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-black pointer-events-none"
                size={20}
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 text-sm font-semibold">
              পিকআপ ঠিকানা
            </label>
            <textarea
              value={pickupAddress}
              onChange={(e) => setPickupAddress(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg"
              rows={2}
              placeholder="পিকআপ লোকেশন লিখুন"
            ></textarea>
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 text-sm font-semibold">
              ড্রপ ঠিকানা
            </label>
            <textarea
              value={dropAddress}
              onChange={(e) => setDropAddress(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg"
              rows={2}
              placeholder="গন্তব্য লোকেশন লিখুন"
            ></textarea>
          </div>

          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-xl text-white text-lg font-bold transition duration-200 cursor-pointer ${
                isSubmitting ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isSubmitting ? "অপেক্ষা করুন..." : "বুকিং নিশ্চিত করুন"}
            </button>
          </div>
        </form>
        {/* ফর্মের নিচে তথ্য যোগ */}
        <div className="max-w-4xl mx-auto mt-12 bg-blue-50 p-6 rounded-2xl shadow-md">
          <h3 className="text-2xl font-bold text-blue-700 mb-4">
            🕒 কী আশা করতে পারেন
          </h3>

          <div className="space-y-4 text-gray-800 text-base leading-relaxed">
            <div className="flex items-start gap-3">
              <p>
                বুকিংয়ের পর ১০ মিনিটের মধ্যে আমাদের কাস্টমার সার্ভিস প্রতিনিধি
                আপনার সঙ্গে ফোনে যোগাযোগ করবেন বুকিং নিশ্চিত করার জন্য।
              </p>
            </div>

            <div className="flex items-start gap-3">
              <p>
                আমরা দ্রুততম সময়ে অ্যাম্বুলেন্স পাঠানোর লক্ষ্যে কাজ করি — তবে
                ট্র্যাফিক বা আবহাওয়ার মতো কারণ সময়কে প্রভাবিত করতে পারে।
              </p>
            </div>

            <div className="flex items-start gap-3">
              <p>
                আপনার ব্যক্তিগত তথ্য সর্বোচ্চ নিরাপত্তার সঙ্গে সংরক্ষিত থাকবে
                এবং শুধুমাত্র সেবা কার্যক্রম ও মান যাচাইয়ের উদ্দেশ্যে ব্যবহৃত
                হবে।
              </p>
            </div>

            <div className="flex items-start gap-3">
              <p>
                চালক আপনাকে সরাসরি ফোন করে পিকআপ লোকেশন নিশ্চিত করবেন এবং একজন
                প্রশিক্ষিত সহকারীর উপস্থিতিতে যাত্রা নিশ্চিত ও নিরাপদভাবে
                পরিচালিত হবে।
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmbulanceBooking;
