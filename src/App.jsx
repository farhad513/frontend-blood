/* eslint-disable no-unused-vars */
import { lazy, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
const Home = lazy(() => import("./pages/Home"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const Contact = lazy(() => import("./pages/Contact"));
const AllSpeciality = lazy(() => import("./components/Speciality/AllSpeciality"));
const DoctorDetails = lazy(() => import("./components/Doctor/DoctorDetails"));
const Booking = lazy(() => import("./components/Doctor/Booking"));
const Hospitals = lazy(() => import("./pages/Hospitals"));
const Donners = lazy(() => import("./pages/Donners"));
const Blogs = lazy(() => import("./pages/Blogs"));
const BlogDetails = lazy(() => import("./components/Blog/BlogDetails"));
const NotFound = lazy(() => import("./pages/NotFound"));
const DoctorPage = lazy(() => import("./components/Doctor/DoctorPage"));
const MyProfile = lazy(() => import("./components/Dashboard/MyProfile"));
const Appoinments = lazy(() => import("./components/Dashboard/Appoinments"));
const Header = lazy(() => import("./components/Header/Header"));
const Footer = lazy(() => import("./components/Footer/Footer"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const ProtectedUser = lazy(() => import("./utils/ProtectedUser"));
const AmbulanceHistory = lazy(() => import("./components/Dashboard/AmbulanceHistory"));
const AmbulanceBooking = lazy(() => import("./pages/AmbulanceBooking"));
const Medicine = lazy(() => import("./pages/Medicine"));
const VerifyOtp = lazy(() => import("./pages/VerifyOtp"));
const Loading = lazy(() => import("./components/Loading/Loading"));



import { useDispatch, useSelector } from "react-redux";
import { get_user_info, loadUserInfo } from "./store/reducers/authReducer";
function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchUser = async () => {
      await dispatch(loadUserInfo());
      setLoading(false);
    };
    fetchUser();
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(get_user_info());
    }
  }, [token, dispatch]);

  if (loading) {
    <Loading />;
  }
  return (
    <HelmetProvider>
      {" "}
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/contact-us" element={<Contact />} />

          <Route path="/our-doctors" element={<DoctorPage />} />
          <Route path="/doctor/details/:id" element={<DoctorDetails />} />
          <Route path="/blog/:blogId" element={<BlogDetails />} />
          <Route path="/all-speciality" element={<AllSpeciality />} />
          <Route path="/our-hospitals" element={<Hospitals />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route element={<ProtectedUser />}>
            <Route path="/doctor-booking" element={<Booking />} />
          </Route>
          <Route element={<ProtectedUser />}>
            <Route path="/ambulance-booking" element={<AmbulanceBooking />} />
          </Route>
          <Route element={<ProtectedUser />}>
            <Route path="/blood-donners" element={<Donners />} />
          </Route>
          <Route element={<ProtectedUser />}>
            <Route path="/medicine" element={<Medicine />} />
          </Route>

          <Route path="/dashboard" element={<ProtectedUser />}>
            <Route path="" element={<Dashboard />}>
              <Route path="user/profile-setting" element={<MyProfile />} />
              <Route path="user/appointments" element={<Appoinments />} />
              <Route
                path="user/ambulance-history"
                element={<AmbulanceHistory />}
              />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
