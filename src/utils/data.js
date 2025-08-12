
import img1 from "../assets/hero/female-doctor-taking-an-ok-pose-svgrepo-com.svg"
import img3 from "../assets/hero/blood-donation-svgrepo-com.svg"
import img2 from "../assets/hero/hospital.svg"
import ambulanceImg from "../assets/hero/ambulance.png"
import medicineImg from "../assets/hero/drugs.png"                       
import subscriptionImg from "../assets/hero/subscription.png"                       
export const HEROS = [
    {
        ID:1,
        LOGO :img1,
        TITLE :"ডাক্তার খুঁজুন",
        URL :"/our-doctors",
        description : "দ্রুত চিকিৎসা পেতে আর দেরি নয়—একটি সঠিক ডাক্তারই পারে বদলে দিতে আপনার স্বাস্থ্য"
    },
    {
        ID:2,
        LOGO :img2,
        TITLE :"হাসপাতাল খুঁজুন",
        URL :"/our-hospitals",
        description :"বিশ্বস্ত ও উন্নত চিকিৎসা সেবার জন্য আপনার নিকটবর্তী হাসপাতাল খুঁজে নিন সহজেই"
    },
    {
        ID:3,
        LOGO :img3,
        TITLE :"রক্তদাতা খুঁজুন",
        URL :"/blood-donners",
        description :"জরুরি রক্তদানের প্রয়োজন? আমাদের প্ল্যাটফর্মে সহজেই খুঁজে নিন বিশ্বস্ত রক্তদাতা"
    },
    {
    ID: 4,
    LOGO: ambulanceImg,
    TITLE: "অ্যাম্বুলেন্স বুক করুন",
    URL: "/ambulance-booking",
    description: "জরুরী পরিস্থিতিতে দ্রুত অ্যাম্বুলেন্স সেবা পেতে এখনই বুক করুন বিশ্বস্ত পরিবহন",
  },
  {
    ID: 5,
    LOGO: medicineImg,
    TITLE: "ঔষধ অর্ডার করুন",
    URL: "/medicine",
    description: "দ্রুত হোম ডেলিভারির মাধ্যমে নিশ্চিত করুন প্রয়োজনীয় ওষুধ আপনার দোরগোড়ায়",
  },
  {
    ID: 6,
    LOGO: subscriptionImg,
    TITLE: "সাবস্ক্রিপশন প্ল্যান",
    URL: "/subscription",
    description: "প্রিমিয়াম সুবিধাসমূহ উপভোগ করতে সাবস্ক্রিপশন নিন Medi Fast Health Care-এর",
  },
]