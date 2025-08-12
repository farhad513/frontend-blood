/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { messageClear, sendOtpForRegistration } from "../store/reducers/authReducer";
import toast from "react-hot-toast";
import Loading from "../components/Loading/Loading";
import SeoHelmet from "../components/SEO/SEO";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loader, successMessage, errorMessage, userInfo } = useSelector(
    (state) => state.user
  );

  const [state, setState] = useState({
    name: "",
    phone: "",
    password: "",
  });

  const convertBanglaToEnglish = (number) => {
    const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    return number
      .split("")
      .map((char) => {
        const index = banglaDigits.indexOf(char);
        return index > -1 ? englishDigits[index] : char;
      })
      .join("");
  };

  const inputHandle = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      const banglaPattern = /^[\u0980-\u09FF ]*$/;
      if (value === "" || banglaPattern.test(value)) {
        setState({ ...state, [name]: value });
      } else {
        toast.error("ভাই/আপু, শুধুমাত্র বাংলা অক্ষর লিখুন!");
      }
    } else if (name === "phone") {
      const mixedDigitPattern = /^[০-৯0-9]*$/;
      if (value === "" || mixedDigitPattern.test(value)) {
        if (value.length > 11) {
          toast.error("ভাই/আপু, ফোন নম্বর ১১ সংখ্যার বেশি হতে পারবে না!");
          return;
        }
        setState({ ...state, [name]: value });
      } else {
        toast.error("ফোন নম্বর শুধুমাত্র সংখ্যা হতে হবে (বাংলা বা ইংরেজি)");
      }
    } else {
      setState({ ...state, [name]: value });
    }
  };

  const submit = (e) => {
    e.preventDefault();

    const convertedPhone = convertBanglaToEnglish(state.phone);
    const phonePattern = /^01[3-9]\d{8}$/;

    if (!phonePattern.test(convertedPhone)) {
      toast.error("দয়া করে সঠিক ফরম্যাটে ফোন নম্বর লিখুন (০১XXXXXXXXX)");
      return;
    }

    if (state.name.trim() === "") {
      toast.error("আপনার নাম লিখুন, নাম ফাঁকা রাখা যাবে না!");
      return;
    }

    if (state.password.length < 6) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে!");
      return;
    }

    dispatch(sendOtpForRegistration({ ...state, phone: convertedPhone }));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
  navigate("/verify-otp", {
    state: {
    name: state.name,
    phone: convertBanglaToEnglish(state.phone),
    password: state.password,
  },
});
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (userInfo) {
      navigate("/");
    }
  }, [successMessage, errorMessage, userInfo]);

  return (
    <div>
      <SeoHelmet
        title={"নতুন অ্যাকাউন্ট রেজিস্টার করুন | বাংলাদেশ সেবামঞ্চ"}
        description={
          "বাংলাদেশের সেরা স্বাস্থ্যসেবা ও ব্লাড ডোনেশন প্ল্যাটফর্মে দ্রুত অ্যাকাউন্ট খুলুন। এক ক্লিকে ব্লাড ডোনেট করুন, ডাক্তার অ্যাপয়েন্টমেন্ট নিন এবং হসপিটাল সেবা পান। আজই যুক্ত হন।"
        }
        keywords={
          "বাংলাদেশ রেজিস্টার, ব্লাড ডোনার অ্যাকাউন্ট, doctor appointment registration, hospital service BD, health service register, সেবা প্ল্যাটফর্ম রেজিস্টার"
        }
        url={"https://medifasthealthcare.com/register"}
      />

      {loader && <Loading />}

      <div className="font-[sans-serif] p-4 mt-6">
        <div className="flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto shadow-[0_2px_10px_-2px_rgba(195,169,50,0.5)] p-8 relative mt-12">
            <div className="bg-white w-32 h-32 border-4 border-[#fff] absolute left-0 right-0 mx-auto -top-14 rounded-full overflow-hidden flex items-center justify-center">
              <img
                src="https://i.ibb.co/Ld6LSNjq/logo-2.png"
                alt="logo"
                className="w-full h-full object-contain"
                style={{ animation: "spin 20s linear infinite" }}
              />
            </div>

            <form onSubmit={submit} className="mt-12">
              <h3 className="text-xl font-bold text-blue-600 mb-6 text-center">
                ফ্রি অ্যাকাউন্ট তৈরি করুন
              </h3>
              <div className="space-y-4">
                <input
                  onChange={inputHandle}
                  value={state.name}
                  name="name"
                  type="text"
                  className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3 focus:bg-transparent border border-gray-100 focus:border-black outline-none transition-all"
                  placeholder="আপনার নাম (শুধু বাংলা)"
                  required
                />
                <input
                  onChange={inputHandle}
                  value={state.phone}
                  name="phone"
                  type="text"
                  maxLength={11}
                  className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3 focus:bg-transparent border border-gray-100 focus:border-black outline-none transition-all"
                  placeholder="ফোন নম্বর (বাংলা বা ইংরেজি সংখ্যা)"
                  required
                />
                <input
                  onChange={inputHandle}
                  value={state.password}
                  name="password"
                  type="password"
                  className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3 focus:bg-transparent border border-gray-100 focus:border-black outline-none transition-all"
                  placeholder="পাসওয়ার্ড"
                  required
                />
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm tracking-wide text-white bg-black hover:bg-[#111] focus:outline-none cursor-pointer"
                >
                  অ্যাকাউন্ট তৈরি করুন
                </button>
              </div>
              <p className="text-sm mt-6 text-center text-gray-800">
                ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
                <Link
                  to={"/login"}
                  className="text-blue-600 font-semibold hover:underline ml-1"
                >
                  এখানে লগইন করুন
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
