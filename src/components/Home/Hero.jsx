import { Link } from "react-router-dom";
import { HEROS } from "../../utils/data";
import SEO from "../SEO/SEO";

const Hero = () => {
  return (
    <>
      <SEO
        title="বাংলাদেশ স্বাস্থ্যসেবা | হাসপাতাল, ব্লাড ডোনেশন ও অনলাইন সেবা"
        description="বাংলাদেশের হাসপাতাল, ব্লাড ডোনেশন, অনলাইন ডাক্তার অ্যাপয়েন্টমেন্ট, জরুরি স্বাস্থ্যসেবা ও মেডিকেল তথ্য এখন এক প্ল্যাটফর্মে। অনলাইনেই খুঁজুন প্রয়োজনীয় স্বাস্থ্যসেবা।"
        keywords="বাংলাদেশ হাসপাতাল, অনলাইন ডাক্তার অ্যাপয়েন্টমেন্ট, ব্লাড ডোনেশন সেবা, জরুরি স্বাস্থ্য সেবা, সরকারি হাসপাতাল, প্রাইভেট হাসপাতাল, মেডিকেল সার্ভিস, অনলাইন স্বাস্থ্য পরামর্শ, রক্ত খোঁজার সেবা, ব্লাড ব্যাংক বাংলাদেশ, স্বাস্থ্য তথ্য, বাংলাদেশ স্বাস্থ্যসেবা, অনলাইন ব্লাড ডোনেশন, এমার্জেন্সি মেডিকেল সাপোর্ট, ফ্রি স্বাস্থ্য পরামর্শ, নার্সিং সেবা, অ্যাম্বুলেন্স সেবা, রক্তদাতা খোঁজা, স্বাস্থ্যসেবা সেন্টার, মেডিকেল ডিরেক্টরি, বাংলাদেশ হেলথ প্ল্যাটফর্ম"
         url="https://medifasthealthcare.com"
      />

      <section className="bg-white font-[sans-serif] mt-5">
        <div className="max-w-7xl mx-auto px-4 lg:mb-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {HEROS.map((hero, index) => (
              <Link
                to={hero.URL}
                key={index}
                className="group relative overflow-hidden bg-white px-6 pt-10 pb-8 shadow-lg ring-1 ring-gray-900/5 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <span className="absolute top-10 left-1/2 -translate-x-1/2 h-20 w-20 rounded-full bg-sky-500 transition-all duration-300 group-hover:scale-[10]"></span>
                <div className="relative z-10 flex flex-col items-center text-center">
                  <span className="grid h-20 w-20 place-items-center rounded-full bg-sky-500 transition-all duration-300 group-hover:bg-sky-400">
                    <img
                      src={hero.LOGO}
                      alt={hero.TITLE}
                      className="w-14 h-14"
                    />
                  </span>
                  <h4 className="pt-5 text-2xl font-semibold text-gray-800 transition-all duration-300 group-hover:text-white">
                    {hero.TITLE}
                  </h4>
                  <p className="mt-2 text-gray-600 text-base leading-6 transition-all duration-300 group-hover:text-white/90">
                    {hero.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
