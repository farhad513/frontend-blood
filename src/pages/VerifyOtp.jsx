/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate,useParams } from "react-router-dom";
import { verifyAndRegister, messageClear } from "../store/reducers/authReducer";
import toast from "react-hot-toast";

const VerifyOtp = () => {
   const location = useLocation();
  const { name, phone, password } = location.state || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loader, errorMessage, successMessage, userInfo } = useSelector(
    (state) => state.user
  );
  console.log(errorMessage)
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(300); // ৫ মিনিট

  const inputRefs = useRef([]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) clearInterval(countdown);
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      navigate("/");
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (userInfo) navigate("/");
  }, [successMessage, errorMessage, userInfo, navigate, dispatch]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[০-৯0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < 3) inputRefs.current[index + 1].focus();
    }
  };

  const convertBanglaToEnglish = (value) => {
    const map = {
      "০": "0", "১": "1", "২": "2", "৩": "3", "৪": "4",
      "৫": "5", "৬": "6", "৭": "7", "৮": "8", "৯": "9"
    };
    return value.split("").map(char => map[char] || char).join("");
  };

  const handleSubmit = () => {
    if (otp.some(d => d === "")) {
      toast.error("সব ঘর পূরণ করুন");
      return;
    }
    const otpCode = convertBanglaToEnglish(otp.join(""));
    dispatch(verifyAndRegister({ otp: otpCode,name,phone,password }));
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const banglaDigits = {
      0: "০", 1: "১", 2: "২", 3: "৩", 4: "৪",
      5: "৫", 6: "৬", 7: "৭", 8: "৮", 9: "৯"
    };
    const toBangla = (num) => String(num).split('').map(d => banglaDigits[d] || d).join('');
    return `${toBangla(minutes)}:${toBangla(seconds < 10 ? "0" + seconds : seconds)} মিনিট`;
  };

  const handleKeyDown = (e, index) => {
  if (e.key === "Backspace") {
    const newOtp = [...otp];
    if (otp[index] === "") {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
        newOtp[index - 1] = "";
      }
    } else {
      newOtp[index] = "";
    }
    setOtp(newOtp);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">OTP যাচাইকরণ</h2>
        <p className="mb-5 text-gray-600">আপনার মোবাইলে পাঠানো ৪-সংখ্যার কোড লিখুন</p>

        <div className="flex justify-between gap-2 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-14 h-14 text-center border border-gray-300 rounded-md text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        {timer > 0 ? (
          <p className="text-sm text-gray-600 mb-2">সময় বাকি: {formatTime(timer)}</p>
        ) : (
          <button
            className="text-blue-600 text-sm underline"
            onClick={() => {
              setTimer(300);
              toast.success("OTP পুনরায় পাঠানো হয়েছে");
              // resend OTP dispatch করুন এখানে
            }}
          >
            কোড পুনরায় পাঠান
          </button>
        )}

        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          যাচাই করুন
        </button>
      </div>
    </div>
  );
};

export default VerifyOtp;
