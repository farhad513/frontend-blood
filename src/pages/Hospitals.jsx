/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import hos from "../assets//hospital.jpg";
import Hospital from "../components/Hospital/Hospital";
import Pagination from "../components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { query_hospitals } from "../store/reducers/homeReducer";
import SeoHelmet from "../components/SEO/SEO";

const Hospitals = () => {
  const dispatch = useDispatch();
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [parPage, setParPage] = useState(12);
  const [filterData, setFilterData] = useState({
    division: "",
    district: "",
    upazila: "",
  });

  const { hospitals, totalHospital, loading } = useSelector((state) => state.home);
  useEffect(() => {
    dispatch(
      query_hospitals({
        parPage: parseInt(parPage),
        page: parseInt(pageNumber),
        division: filterData.division,
        district: filterData.district,
        upazila: filterData.upazila,
      })
    );
  }, [pageNumber, filterData]);

  const handleSearch = () => {
    const divisionName = divisions.find(
      (d) => d.id === selectedDivision
    )?.bn_name;
    const districtName = districts.find(
      (d) => d.id === selectedDistrict
    )?.bn_name;
    const upazilaName = upazilas.find((u) => u.id === selectedUpazila)?.bn_name;

    setFilterData({
      division: divisionName || "",
      district: districtName || "",
      upazila: upazilaName || "",
    });

    setPageNumber(1); // Reset to page 1 on search
  };

  const renderHospitals = () => {
    if (hospitals?.length === 0) {
      return (
        <div className="grid place-items-center min-h-[200px] col-span-full">
          <p className="text-center text-xl text-red-500">
            কোনো হাসপাতাল পাওয়া যায়নি। আবার চেষ্টা করুন।
          </p>
        </div>
      );
    }
    return hospitals?.map((hospital, index) => (
      <Hospital hospital={hospital} key={index} />
    ));
  };

  // Load divisions
  useEffect(() => {
    fetch("https://bdapi.vercel.app/api/v.1/division")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setDivisions(data.data);
        }
      })
      .catch((err) => console.error("Divisions Fetch Error:", err));
  }, []);

  // Load districts
  useEffect(() => {
    if (selectedDivision) {
      fetch(`https://bdapi.vercel.app/api/v.1/district/${selectedDivision}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setDistricts(data.data);
          }
        })
        .catch((err) => console.error("Districts Fetch Error:", err));
    } else {
      setDistricts([]);
      setUpazilas([]);
    }
  }, [selectedDivision]);

  // Load upazilas
  useEffect(() => {
    if (selectedDistrict) {
      fetch(`https://bdapi.vercel.app/api/v.1/upazilla/${selectedDistrict}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setUpazilas(data.data);
          }
        })
        .catch((err) => console.error("Upazilas Fetch Error:", err));
    } else {
      setUpazilas([]);
    }
  }, [selectedDistrict]);
useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      left: 0,
      top: 0,
    });
  }, []);
  return (
    <div>
      <SeoHelmet
        title={"হাসপাতাল লিস্ট | আপনার নিকটস্থ হাসপাতাল খুঁজুন - স্বাস্থ্য সেবা"}
        description={
          "বাংলাদেশের সকল বিভাগের হাসপাতালগুলোর তালিকা দেখুন। আপনার এলাকার সেরা হাসপাতাল খুঁজুন এবং তাদের ঠিকানা ও যোগাযোগের বিস্তারিত তথ্য জেনে নিন।"
        }
        keywords={
          "বাংলাদেশ হাসপাতাল, হাসপাতাল তালিকা, স্বাস্থ্য সেবা, ঢাকা হাসপাতাল, নোয়াখালী হাসপাতাল, চিকিৎসা কেন্দ্র, হাসপাতাল ঠিকানা, সরকারি হাসপাতা"
        }
        url={"https://medifasthealthcare.com/our-doctors"}
      />

      {/* Banner */}
      <div className="relative font-sans before:absolute before:w-full before:h-full before:inset-0 before:bg-black before:opacity-50 before:z-10 ">
        <img
          src={hos}
          alt="Banner Image"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="min-h-[350px] relative z-50 h-full max-w-6xl mx-auto flex flex-col justify-center items-center text-center text-white p-6">
          <h2 className="sm:text-4xl text-2xl font-bold mb-6">
            &#34;আপনার সুস্থতা, আমাদের প্রথম অগ্রাধিকার&#34;
          </h2>
          <p className="sm:text-lg text-base text-center text-gray-200">
            &#34;সেবা নয়, এটা আমাদের দায়িত্ব — রোগীর মুখের হাসিই আমাদের প্রেরণা।&#34;
          </p>
        </div>
      </div>

      {/* Filters */}
      {
        hospitals &&        <div className="max-w-7xl max-lg:max-w-2xl mx-auto px-3">
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-2 max-sm:max-w-sm max-sm:mx-auto mt-5">
          {/* Division */}
          <select
            className="border p-2 rounded w-full mb-3"
            onChange={(e) => setSelectedDivision(e.target.value)}
          >
            <option value="">-- বিভাগ নির্বাচন করুন --</option>
            {divisions.map((div) => (
              <option key={div.id} value={div.id}>
                {div.bn_name}
              </option>
            ))}
          </select>

          {/* District */}
          <select
            className="border p-2 rounded w-full mb-3"
            onChange={(e) => setSelectedDistrict(e.target.value)}
            disabled={!selectedDivision}
          >
            <option value="">-- জেলা নির্বাচন করুন --</option>
            {districts.map((dist) => (
              <option key={dist.id} value={dist.id}>
                {dist.bn_name}
              </option>
            ))}
          </select>

          {/* Upazila */}
          <select
            className="border p-2 rounded w-full mb-3"
            disabled={!selectedDistrict}
            onChange={(e) => setSelectedUpazila(e.target.value)}
          >
            <option value="">-- উপজেলা নির্বাচন করুন --</option>
            {upazilas.map((upa) => (
              <option key={upa.id} value={upa.id}>
                {upa.bn_name}
              </option>
            ))}
          </select>

          {/* Search button */}
          <button
            onClick={handleSearch}
            type="button"
            disabled={
              loading ||
              (!selectedDivision && !selectedDistrict && !selectedUpazila)
            }
            className={`px-2 h-10 font-semibold w-full tracking-wide ml-auto outline-none border-none rounded
              ${
                loading ||
                (!selectedDivision && !selectedDistrict && !selectedUpazila)
                  ? "bg-gray-400 cursor-not-allowed text-white "
                  : "bg-blue-600 hover:bg-blue-700 text-white  cursor-pointer"
              }
            `}
          >
            {loading ? " অপেক্ষা করুন..." : "অনুসন্ধান করুন"}
          </button>
        </div>
      </div>
      }


      {/* Hospitals List */}
      <div className="font-[sans-serif]">
        <div className="p-4 mx-auto lg:max-w-7xl md:max-w-4xl sm:max-w-xl max-sm:max-w-sm">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6">
            {renderHospitals()}
          </div>
        </div>
      </div>

      {/* Pagination */}
      {totalHospital > parPage && hospitals.length > 0 && (
        <div className="mt-6">
          <Pagination
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            totalItem={totalHospital}
            parPage={parPage}
            showItem={Math.floor(totalHospital / parPage)}
          />
        </div>
      )}
    </div>
  );
};

export default Hospitals;
