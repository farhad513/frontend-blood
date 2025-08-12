/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import contactImg from "../assets/contact.jpg";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { contact_us, messageClear } from "../store/reducers/homeReducer";
import SeoHelmet from "../components/SEO/SEO";

const Contact = () => {
  const { successMessage, errorMessage } = useSelector((state) => state.home);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const inputHandle = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const banglaDigitPattern = /^[০-৯]*$/;
      if (value === "" || banglaDigitPattern.test(value)) {
        if (value.length > 11) {
          toast.error("ফোন নম্বর সর্বোচ্চ ১১ সংখ্যার হতে পারে।");
          return;
        }
        if (value.length >= 2 && !value.startsWith("০১")) {
          toast.error("ফোন নম্বর অবশ্যই '০১' দিয়ে শুরু হতে হবে।");
          return;
        }
        setState({
          ...state,
          [name]: value,
        });
      } else {
        toast.error("ফোন নম্বরে শুধুমাত্র বাংলা সংখ্যা ব্যবহার করুন।");
      }
    } else if (name === "name" || name === "message") {
      const banglaPattern = /^[\u0980-\u09FF ]*$/;
      if (banglaPattern.test(value)) {
        setState({
          ...state,
          [name]: value,
        });
      } else {
        toast.error("শুধুমাত্র বাংলা অক্ষর ব্যবহার করুন।");
      }
    } else {
      setState({
        ...state,
        [name]: value,
      });
    }
  };

  const convertBanglaToEnglish = (number) => {
    const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let converted = "";
    for (let i = 0; i < number.length; i++) {
      const char = number[i];
      const index = banglaDigits.indexOf(char);
      if (index !== -1) {
        converted += englishDigits[index];
      } else {
        converted += char;
      }
    }
    return converted;
  };

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    const convertedPhone = convertBanglaToEnglish(state.phone);
    const phonePattern = /^01[3-9]\d{8}$/;

    if (!phonePattern.test(convertedPhone)) {
      toast.error("সঠিক ফরম্যাটে ফোন নম্বর লিখুন (০১XXXXXXXXX)।");
      return;
    }

    if (state.name.trim() === "") {
      toast.error("নাম ফাঁকা রাখা যাবে না।");
      return;
    }

    dispatch(contact_us({ ...state, phone: convertedPhone }));
  };

  useEffect(() => {
    if (successMessage || errorMessage) {
      setLoading(false);
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setState({ name: "", phone: "", message: "" });
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch]);

  return (
    <div>
      <SeoHelmet
        title={"যোগাযোগ করুন | Medi Fast Health Care - আপনার স্বাস্থ্য সেবার পার্টনার"}
        description={
          "Medi Fast Health Care-এর সাথে যোগাযোগ করুন এবং পেতে পারেন দ্রুত সেবা, সঠিক নির্দেশনা এবং সমস্ত তথ্য এক জায়গায়। আমাদের ফোন নম্বর, ঠিকানা ও ম্যাপের মাধ্যমে সহজেই পৌঁছান।"
        }
        keywords={
          "যোগাযোগ, Medi Fast Health Care, নোয়াখালী স্বাস্থ্য, হাসপাতাল, অ্যাপয়েন্টমেন্ট বুকিং, ব্লাড ডোনেশন, স্বাস্থ্য সেবা, contact noakhali"
        }
        url={"https://medifasthealthcare.com/contact-us"}
      />

      <div className="relative before:absolute before:w-full before:h-full before:inset-0 before:bg-black before:opacity-40 before:z-10">
        <img src={contactImg} alt="Banner" className="absolute inset-0 w-full h-full object-cover" />
        <div className="relative z-50 min-h-[400px] max-w-4xl flex flex-col justify-center px-6 py-12">
          <h3 className="text-white md:text-5xl text-4xl font-bold">যোগাযোগ করুন</h3>
          <ul className="flex space-x-5 mt-4 text-white text-base">
            <li className="flex items-center cursor-pointer">হোম</li>
            <li>/</li>
            <li className="font-bold cursor-pointer">যোগাযোগ করুন</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-3xl font-bold text-indigo-900 mb-4">যোগাযোগ করুন</h2>
            <p className="text-gray-600 mb-8 text-sm">যেকোনো প্রয়োজনে আমাদের সাথে যোগাযোগ করুন, আমরা দ্রুত উত্তর দেব।</p>
            <form onSubmit={submit} className="space-y-4">
              <input
                type="text"
                name="name"
                required
                value={state.name}
                onChange={inputHandle}
                placeholder="আপনার পূর্ণ নাম লিখুন"
                className="w-full p-3 rounded-lg border text-sm border-gray-200 outline-none"
              />
              <input
                type="text"
                name="phone"
                maxLength={11}
                required
                value={state.phone}
                onChange={inputHandle}
                placeholder="মোবাইল নম্বর (০১XXXXXXXXX)"
                className="w-full p-3 rounded-lg border text-sm border-gray-200 outline-none"
              />
              <textarea
                name="message"
                rows="4"
                required
                value={state.message}
                onChange={inputHandle}
                placeholder="আপনার বার্তা লিখুন…"
                className="w-full p-3 rounded-lg border text-sm border-gray-200 outline-none resize-none"
              ></textarea>
              <button
                type="submit"
                disabled={loading}
                className={`w-full cursor-pointer text-sm bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                {loading ? "পাঠানো হচ্ছে..." : "পাঠান"}
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="text-xl font-semibold text-indigo-900 mb-6">যোগাযোগের তথ্য</h3>
              <div className="space-y-4 text-sm text-gray-600">
                <div>
                  <strong className="text-gray-900">ঠিকানা:</strong> চাটখিল, নোয়াখালী, বাংলাদেশ
                </div>
                <div>
                  <strong className="text-gray-900">ফোন:</strong> +৮৮ ০১৩৩৬-১১৬৮৬৮, +৮৮ ০১৭০৮-৭৬৯৫১৩
                </div>
                <div>
                  <strong className="text-gray-900">ইমেইল:</strong> info@medifasthealthcare.com
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="text-xl font-semibold text-indigo-900 mb-6">অফিস সময়</h3>
              <div className="flex justify-between text-sm text-gray-600">
                <span>প্রতিদিন (৭ দিন)</span>
                <span>সকাল ৯টা - রাত ১২টা</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-8 h-[350px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14684.291195517515!2d90.9705216!3d23.057792499999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1739378145787!5m2!1sen!2sbd"
          className="left-0 top-0 h-full w-full"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
