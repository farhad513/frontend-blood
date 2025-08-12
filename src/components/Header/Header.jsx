import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaRegUser } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";
import { user_reset } from "../../store/reducers/authReducer";
import { base_url } from "../../utils/config";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Memoize the dropdown handler
  const toggleDropdown = useCallback(() => {
    setDropdownOpen((prev) => !prev);
  }, []);

  // Mobile menu auto close on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  // Dropdown outside click close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logout = async () => {
    try {
      await axios.get(`${base_url}/api/user/logout`);
      localStorage.removeItem("userToken");
      document.cookie =
        "userToken=; Max-Age=0; path=/; SameSite=Strict; secure";
      dispatch(user_reset());
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  const trimWords = (text, count) => text.split(" ").slice(0, count).join(" ");

  return (
    <header className="bg-white shadow sticky top-0  dark:bg-gray-900 z-[10000]">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://i.ibb.co.com/kgBg7BN2/Untitled-4.jpg"
            alt="Logo"
            className="h-12 w-auto"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex gap-6 text-gray-700 dark:text-white text-md font-medium">
          <Link to="/">হোম</Link>
          <Link to="/our-doctors"> ডাক্তার</Link>
          <Link to="/our-hospitals"> হাসপাতাল</Link>
          <Link to="/ambulance-booking">অ্যাম্বুলেন্স</Link>
          <Link to="/blood-donners">রক্তদানকারী</Link>
          <Link to="/medicine">মেডিসিন</Link>
          <Link to="/blogs">ব্লগ</Link>
          <Link to="/contact-us">যোগাযোগ</Link>
        </nav>

        {/* User Dropdown + Mobile Icon */}
        <div className="flex items-center gap-4">
          {userInfo ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <FaRegUser />
                {trimWords(userInfo?.name, 2)}
                <IoIosArrowDown />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow rounded z-[10000]">
                  <Link
                    to="/dashboard/user/profile-setting"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    আমার প্রোফাইল
                  </Link>
                  <Link
                    to="/dashboard/user/appointments"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    ডাক্তার অ্যাপয়েন্টমেন্ট
                  </Link>
                  <Link
                    to="/dashboard/user/ambulance-history"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    অ্যাম্বুলেন্স হিস্টোরি
                  </Link>
                  {/* <Link
                    to="/dashboard/user/blood-donation-history"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    ব্লাড ডোনেশন হিস্টোরি
                  </Link> */}
                  {/* <Link
                    to="/dashboard/user/my-requests"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    আমার রিকোয়েস্ট
                  </Link> */}
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-700"
                  >
                    সাইন আউট
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="text-md px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              সাইন ইন
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-gray-800 dark:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-900 px-4 pb-4">
          <nav className="flex flex-col gap-2 text-gray-700 dark:text-white text-md">
            <Link to="/">হোম</Link>
            <Link to="/our-doctors"> ডাক্তার</Link>
            <Link to="/our-hospitals"> হাসপাতাল</Link>
            <Link to="/ambulance-booking">অ্যাম্বুলেন্স</Link>
            <Link to="/blood-donners">রক্তদানকারী</Link>
            <Link to="/medicine">মেডিসিন</Link>
            <Link to="/blogs">ব্লগ</Link>
            <Link to="/contact-us">যোগাযোগ</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
