// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { base_url } from "../utils/config";
import { user_reset } from "../store/reducers/authReducer";
import axios from "axios";
import SeoHelmet from "../components/SEO/SEO";

const Dashboard = () => {
  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      left: 0,
      top: 0,
    });
  }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = async () => {
    try {
      await axios.get(`${base_url}/api/user/logout`);
      localStorage.removeItem("userToken");
      dispatch(user_reset());
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <SeoHelmet
        title="ইউজার ড্যাশবোর্ড | স্বাস্থ্য সেবা"
        description="আপনার স্বাস্থ্য সেবা ইউজার ড্যাশবোর্ড থেকে প্রোফাইল সেটিং, অ্যাপয়েন্টমেন্ট এবং ব্লাড ডোনেশন হিস্টোরি ম্যানেজ করুন।"
        keywords="ইউজার ড্যাশবোর্ড, স্বাস্থ্য সেবা, ব্লাড ডোনেশন হিস্টোরি, অ্যাপয়েন্টমেন্ট"
        url="https://medifasthealthcare.com/dashboard"
      />
      <div className="flex flex-col md:flex-row mt-6 bg-slate-100 min-h-screen">
        {/* Sidebar */}
        <div className="hidden md:block w-[270px] bg-white shadow-md p-4">
          <ul className="text-slate-700 font-medium text-lg space-y-4">
            <li>
              <Link to="/dashboard/user/profile-setting"> আমার প্রোফাইল</Link>
            </li>
            <li>
              <Link to="/dashboard/user/appointments">
                ডাক্তার অ্যাপয়েন্টমেন্ট
              </Link>
            </li>
            <li>
              <Link to="/dashboard/user/ambulance-history">
                অ্যাম্বুলেন্স হিস্টোরি
              </Link>
            </li>
            {/* <li>
              <Link to="/dashboard/user/my-requests"> আমার রিকোয়েস্ট</Link>
            </li>
            <li>
              <Link to="/dashboard/user/change-password">
                পাসওয়ার্ড পরিবর্তন
              </Link>
            </li> */}
            <button
              onClick={logout}
              className="block w-full text-left  py-2 text-red-600  cursor-pointer"
            >
              সাইন আউট
            </button>
          </ul>
        </div>

        {/* Main content */}
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
