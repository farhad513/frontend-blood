/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { messageClear, user_login } from "../store/reducers/authReducer";
import Loading from "../components/Loading/Loading";
import SeoHelmet from "../components/SEO/SEO";

const Login = () => {
  const { loader, successMessage, errorMessage, userInfo } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [state, setState] = useState({ phone: "", password: "" });

  const inputHandle = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const bnToEn = value.replace(/[০-৯]/g, (d) => "০১২৩৪৫৬৭৮৯".indexOf(d));
      const isValidFormat = /^০১[৩-৯][০-৯]{8}$/.test(value) || /^01[3-9][0-9]{8}$/.test(bnToEn);

      if (!/^[০-৯0-9]*$/.test(value)) {
        toast.error("শুধুমাত্র সংখ্যা লিখুন (বাংলা বা ইংরেজি)।");
        return;
      }

      if (value.length >= 2 && !value.startsWith("০১") && !value.startsWith("01")) {
        toast.error("ফোন নম্বর অবশ্যই ০১ দিয়ে শুরু হতে হবে!");
        return;
      }

      setState({ ...state, [name]: value });
    } else {
      setState({ ...state, [name]: value });
    }
  };

  const convertBanglaToEnglish = (number) => {
    const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return number.split("").map((char) => {
      const index = banglaDigits.indexOf(char);
      return index !== -1 ? String(index) : char;
    }).join("");
  };

  const submit = (e) => {
    e.preventDefault();
    const convertedPhone = convertBanglaToEnglish(state.phone);
    const phonePattern = /^01[3-9]\d{8}$/;

    if (!phonePattern.test(convertedPhone)) {
      toast.error("দয়া করে সঠিক ফরম্যাটে ফোন নম্বর লিখুন (০১XXXXXXXXX)");
      return;
    }

    if (state.password.length < 6) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে, একটু বড় করে দিন!");
      return;
    }

    dispatch(user_login({ ...state, phone: convertedPhone }));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (userInfo) {
      navigate("/");
    }
  }, [successMessage, errorMessage, userInfo, dispatch, navigate]);

  return (
    <div>
      <SeoHelmet
        title={"অ্যাকাউন্ট লগইন করুন | বাংলাদেশ সেবামঞ্চ"}
        description={
          "বাংলাদেশের সেরা স্বাস্থ্যসেবা ও ব্লাড ডোনেশন প্ল্যাটফর্মে আপনার অ্যাকাউন্টে লগইন করুন। এক ক্লিকে আপনার প্রিয় ডাক্তার, ব্লাড ডোনার ও হসপিটাল খুঁজুন।"
        }
        keywords={
          "বাংলাদেশ লগইন, ব্লাড ডোনেশন লগইন, doctor appointment login, hospital login BD, health service login, সেবা প্ল্যাটফর্ম লগইন"
        }
        url={"https://medifasthealthcare.com/login"}
      />

      {loader && <Loading />}

      <div className="font-[sans-serif] p-4 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md shadow-lg p-8 bg-white rounded-lg relative">
                      <div className="bg-white w-32 h-32 border-4 border-[#fff] absolute left-0 right-0 mx-auto -top-14 rounded-full overflow-hidden flex items-center justify-center">
              <img
                src="https://i.ibb.co/Ld6LSNjq/logo-2.png"
                alt="logo"
                className="w-full h-full object-contain"
                style={{ animation: "spin 20s linear infinite" }}
              />
            </div>

          <form onSubmit={submit} className="mt-16">
            <h3 className="text-xl font-bold text-blue-600 mb-6 text-center">
              সাইন ইন করুন
            </h3>
            <div className="space-y-4">
              <input
                name="phone"
                type="text"
                maxLength={11}
                className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3 focus:bg-white border border-gray-300 focus:border-black outline-none rounded"
                placeholder="ফোন নাম্বার (বাংলা বা ইংরেজি)"
                required
                onChange={inputHandle}
                value={state.phone}
              />
              <input
                name="password"
                type="password"
                className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3 focus:bg-white border border-gray-300 focus:border-black outline-none rounded"
                placeholder="পাসওয়ার্ড লিখুন"
                required
                onChange={inputHandle}
                value={state.password}
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-3 px-4 text-sm tracking-wide text-white bg-black hover:bg-[#111] rounded focus:outline-none"
              >
                সাইন ইন
              </button>
            </div>
            <p className="text-sm mt-6 text-center text-gray-800">
              আপনার একটি অ্যাকাউন্ট নেই?
              <Link
                to="/register"
                className="text-blue-600 font-semibold hover:underline ml-1"
              >
                এখানে রেজিস্টার করুন
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
