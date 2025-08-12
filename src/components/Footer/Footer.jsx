import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 p-8 font-sans tracking-wide">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* আমাদের সম্পর্কে */}
          <div className="sm:col-span-2 max-w-sm">
            <h4 className="text-base font-semibold mb-6 text-white">
              আমাদের সম্পর্কে
            </h4>
            <p className="text-gray-400 text-sm text-justify leading-relaxed">
              আমাদের ওয়েবসাইটের মাধ্যমে আপনি সহজেই ব্লাড ডোনেশন, ডাক্তার
              অ্যাপয়েন্টমেন্ট, হাসপাতাল খোঁজা, অ্যাম্বুলেন্স বুকিং এবং ঔষধ ও
              মেডিকেল প্রোডাক্ট অর্ডার করার সুবিধা পাবেন।
              <br />
              <br />
              আমরা প্রতিশ্রুতিবদ্ধ—আপনাকে দ্রুত, সহজ এবং নির্ভরযোগ্য সেবা প্রদান
              করতে। আপনার সুস্থতাই আমাদের সর্বোচ্চ অগ্রাধিকার।
              <br />
              <br />
              পাশাপাশি, আপনি চাইলে আমাদের ব্লগ পেজে গিয়ে স্বাস্থ্য, চিকিৎসা,
              জীবনযাপন ও প্রয়োজনীয় টিপস পড়তে পারেন, যা আপনার দৈনন্দিন জীবনকে আরও
              সচেতন ও স্বাস্থ্যসম্মত করে তুলবে।
            </p>
          </div>

          {/* সেবা সমূহ */}
          <div>
            <h4 className="text-base font-semibold mb-6 text-white">
              সেবা সমূহ
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">
                  হোম
                </Link>
              </li>
              <li>
                <Link
                  to="/our-doctors"
                  className="text-gray-400 hover:text-white"
                >
                  আমাদের ডাক্তার
                </Link>
              </li>
              <li>
                <Link
                  to="/our-hospitals"
                  className="text-gray-400 hover:text-white"
                >
                  আমাদের হাসপাতাল
                </Link>
              </li>
              <li>
                <Link
                  to="/blood-donners"
                  className="text-gray-400 hover:text-white"
                >
                  রক্তদাতারা
                </Link>
              </li>
              <li>
                <Link
                  to="/ambulance-booking"
                  className="text-gray-400 hover:text-white"
                >
                  অ্যাম্বুলেন্স সেবা
                </Link>
              </li>
              <li>
                <Link
                  to="/medicine"
                  className="text-gray-400 hover:text-white"
                >
                  ঔষধ ও প্রোডাক্ট
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="text-gray-400 hover:text-white">
                  স্বাস্থ্যবিষয়ক ব্লগ
                </Link>
              </li>
            </ul>
          </div>

          {/* যোগাযোগ */}
          <div className="space-y-3">
            <h4 className="text-base font-semibold mb-6 text-white">
              যোগাযোগ করুন
            </h4>
            <p className="text-gray-400 text-sm">চাটখিল, নোয়াখালী</p>
            <p className="text-gray-400 text-sm">বাংলাদেশ</p>
            <p className="text-gray-400 text-sm">info@medifasthealthcare.com</p>
            <p className="text-gray-400 text-sm">+৮৮ ০১৩৩৬-১১৬৮৬৮</p>
            <p className="text-gray-400 text-sm">+৮৮ ০১৭০৮-৭৬৯৫১৩</p>
          </div>
        </div>

        <hr className="my-6 border-gray-500" />

        <div className="text-center text-gray-300 text-sm flex flex-col md:flex-row items-center justify-center gap-2">
          <span>
            © {new Date().getFullYear()}{" "}
            <a
              href="https://www.facebook.com/medifasthelathcare"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:underline"
            >
              মেডিফাস্ট হেলথ কেয়ার
            </a>
            । সর্বস্বত্ব সংরক্ষিত।
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
