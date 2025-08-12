import { motion } from "framer-motion";
import { useEffect } from "react";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaFacebookMessenger,
} from "react-icons/fa";
import SeoHelmet from "../components/SEO/SEO";

const Medicine = () => {


    useEffect(() => {
        window.scrollTo({
          behavior: "smooth",
          left: 0,
          top: 0,
        });
      }, []);
  const whatsappNumber = "+8801336116868";
  const callNumber = "+8801336116868";
  const messengerLink = "https://m.me/medifasthelathcare"; // পেজ লিংক

  const openLink = (url, fallbackMessage) => {
    const newWindow = window.open(url, "_blank");
    if (!newWindow || newWindow.closed || typeof newWindow.closed === "undefined") {
      alert(fallbackMessage);
    }
  };

  const infoList = [
    "📄 আপনার প্রেসক্রিপশনটি স্পষ্টভাবে স্ক্যান বা ছবি আকারে পাঠাবেন।",
    "⏰ সকাল ৯টা থেকে রাত ৯টা পর্যন্ত আমাদের প্রতিনিধি সক্রিয় থাকবেন।",
    "📦 আপনার ওষুধ সরবরাহ করার আগে প্রতিনিধি আপনাকে ফোনে কনফার্ম করবেন।",
    "💳 ক্যাশ অন ডেলিভারি এবং বিকাশ/নগদ/রকেট পেমেন্ট সাপোর্ট করি।",
    "🔒 আপনার তথ্য সম্পূর্ণরূপে গোপন রাখা হবে।",
  ];

  const buttons = [
    {
      icon: <FaWhatsapp className="text-2xl" />,
      text: "WhatsApp",
      bg: "bg-green-500 hover:bg-green-600",
      onClick: () =>
        openLink(
          `https://wa.me/${whatsappNumber.replace("+", "")}?text=হ্যালো, আমি প্রেসক্রিপশন সম্পর্কে কথা বলতে চাই।`,
          "WhatsApp ইনস্টল করা নেই!"
        ),
    },
    {
      icon: <FaFacebookMessenger className="text-3xl" />,
      text: "Messenger",
      bg: "bg-blue-600 hover:bg-blue-700",
      onClick: () =>
        openLink(messengerLink, "Messenger অ্যাপ ইনস্টল নেই!"),
    },
    {
      icon: <FaPhoneAlt className="text-2xl" />,
      text: "কল করুন",
      bg: "bg-blue-500 hover:bg-blue-600",
      onClick: () =>
        openLink(`tel:${callNumber}`, "আপনার ডিভাইসে কল করার সুবিধা নেই!"),
    },
  ];

  return (
    <div className="w-full mx-auto mt-10 px-4 space-y-6">
            <SeoHelmet
  title={"ঔষধ ও স্বাস্থ্যপণ্য | অনলাইন মেডিসিন শপ বাংলাদেশ"}
  description={
    "বাংলাদেশের যেকোনো স্থান থেকে ঘরে বসেই অর্ডার করুন আপনার প্রয়োজনীয় ঔষধ ও স্বাস্থ্যপণ্য। বিশ্বস্ততা ও মানসম্পন্ন সেবার প্রতিশ্রুতি নিয়ে, মেডি ফাস্ট হেলথ কেয়ারের অনলাইন মেডিসিন সার্ভিস।"
  }
  keywords={
    "ঔষধ, অনলাইন ঔষধ শপ, মেডিসিন ডেলিভারি বাংলাদেশ, স্বাস্থ্যপণ্য, medicine BD, online medicine Bangladesh, pharmacy home delivery"
  }
  url={"https://medifasthealthcare.com/medicine"}
/>
      <div className="flex justify-center">
        <div className="bg-blue-50 p-6 rounded-2xl shadow-md w-full max-w-3xl">
          <h2 className="text-xl font-bold text-blue-800 mb-4">
            আপনার প্রেসক্রিপশন সম্পর্কে
          </h2>

          <p className="text-gray-700 text-base leading-relaxed mb-3">
            আপনার স্বাস্থ্য আমাদের অগ্রাধিকার। আমাদের অভিজ্ঞ চিকিৎসক দল সবসময় প্রস্তুত আপনাকে সেবা দিতে।
          </p>

          <p className="text-gray-700 text-base leading-relaxed mb-5">
            আপনি চাইলে প্রেসক্রিপশন পাঠাতে পারেন, অথবা নিচের মাধ্যমগুলোতে আমাদের সঙ্গে সরাসরি যোগাযোগ করতে পারেন।
          </p>

          <ul className="list-disc list-inside space-y-2 text-gray-800">
            {infoList.map((item, index) => (
              <li key={index} className="text-base leading-6">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Responsive Button Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto py-5">
        {buttons.map((btn, index) => (
          <motion.button
            key={index}
            whileTap={{ scale: 0.95 }}
            onClick={btn.onClick}
            className={`w-full flex items-center justify-center gap-3 text-white py-3 rounded-lg font-semibold shadow-md cursor-pointer transition duration-200 ${btn.bg}`}
          >
            {btn.icon}
            <span>{btn.text}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default Medicine;
