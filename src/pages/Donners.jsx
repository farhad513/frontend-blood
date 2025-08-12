/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { query_donners } from "../store/reducers/homeReducer";
import donnerImg from "../assets/don.jpg";
import Donner from "../components/Donner/Donner";
import Pagination from "../components/Pagination/Pagination";
import { debounce } from "lodash";
import SeoHelmet from "../components/SEO/SEO";

const Donners = () => {
  const dispatch = useDispatch();
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [parPage, setParPage] = useState(5);
  const [filterData, setFilterData] = useState({
    division: "",
    district: "",
    upazila: "",
    bloodGroup: "",
  });
useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      left: 0,
      top: 0,
    });
  }, []);
  const { donners, totalDonners } = useSelector((state) => state.home);
  // Optimized search function with debounce
  const handleSearch = useCallback(
    debounce(() => {
      const divisionName = divisions.find(
        (d) => d.id === selectedDivision
      )?.bn_name;
      const districtName = districts.find(
        (d) => d.id === selectedDistrict
      )?.bn_name;
      const upazilaName = upazilas.find(
        (u) => u.id === selectedUpazila
      )?.bn_name;

      setFilterData({
        division: divisionName || "",
        district: districtName || "",
        upazila: upazilaName || "",
        bloodGroup: encodeURIComponent(bloodGroup || ""),
      });
      setPageNumber(1); // Reset page to 1 on every search
    }, 500), // 500ms debounce
    [selectedDivision, selectedDistrict, selectedUpazila, bloodGroup]
  );

  useEffect(() => {
    dispatch(
      query_donners({
        page: pageNumber,
        parPage,
        division: filterData.division,
        district: filterData.district,
        upazila: filterData.upazila,
        bloodGroup: filterData.bloodGroup,
      })
    );
  }, [pageNumber, filterData, dispatch]); // Only depend on filterData and pageNumber

  useEffect(() => {
    // Fetch divisions only once on mount
    fetch("https://bdapi.vercel.app/api/v.1/division")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setDivisions(data.data);
        }
      })
      .catch((err) => console.error("Divisions Fetch Error:", err));
  }, []);

  useEffect(() => {
    // Fetch districts only when selectedDivision changes
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

  useEffect(() => {
    // Fetch upazilas only when selectedDistrict changes
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

  const renderDonors = () => {
    if (donners.length === 0) {
      return (
        <div className="flex justify-center items-center py-4">
          <p className="text-center text-xl text-red-500 font-semibold">
            কোনো ডোনার পাওয়া যায়নি। আবার চেষ্টা করুন।
          </p>
        </div>
      );
    }
    return <Donner donners={donners} />;
  };

  return (
    <div>
      <SeoHelmet
        title={"রক্তদাতা খুঁজুন | ব্লাড ডোনেশন প্ল্যাটফর্ম"}
        description={
          "বাংলাদেশের যেকোনো বিভাগ, জেলা এবং উপজেলার রক্তদাতাদের সহজে খুঁজুন। A+, B+, O- সহ সকল গ্রুপের ব্লাড ডোনার এখন এক ক্লিকে। এক ফোঁটা রক্ত, এক নতুন জীবন।"
        }
        keywords={
          "রক্তদাতা, ব্লাড ডোনার বাংলাদেশ, ব্লাড ডোনেশন, রক্তদান, Blood Donor BD, Blood Donation Bangladesh, Blood Group A+, B+, O-, AB+"
        }
        url={"https://medifasthealthcare.com/blood-donners"}
      />
      <div className="relative font-sans before:absolute before:w-full before:h-full before:inset-0 before:bg-black before:opacity-50 before:z-10 ">
        <img
          src={donnerImg}
          alt="Banner Image"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="min-h-[350px] relative z-50 h-full max-w-6xl mx-auto flex flex-col justify-center items-center text-center text-white p-6">
          <h2 className="sm:text-4xl text-2xl font-bold mb-6">
            &#34;এক ফোঁটা রক্ত, এক নতুন জীবন&#34;
          </h2>
          <p className="sm:text-lg text-base text-center text-gray-200">
            &#34;স্বেচ্ছায় রক্তদান, ভালোবাসার নিঃস্বার্থ প্রতীক — আজই একজন দাতা
            হন।&#34;
          </p>
        </div>
      </div>
      <div className="max-w-7xl max-lg:max-w-2xl mx-auto px-3">
        <div className="grid lg:grid-cols-5 sm:grid-cols-2 gap-2 max-sm:max-w-sm max-sm:mx-auto mt-5">
          <div>
            <select
              className="border p-2 rounded w-full mb-3"
              onChange={(e) => setBloodGroup(e.target.value)}
            >
              <option value="">-- রক্তের গ্রুপ নির্বাচন করুন --</option>
              <option value="A+">এ+</option>
              <option value="A-">এ-</option>
              <option value="B+">বি+</option>
              <option value="B-">বি-</option>
              <option value="AB+">এবি+</option>
              <option value="AB-">এবি-</option>
              <option value="O+">ও+</option>
              <option value="O-">ও-</option>
            </select>
          </div>
          <div>
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
          </div>
          <div>
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
          </div>
          <div>
            <select
              className="border p-2 rounded w-full"
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
          </div>
          <button
            onClick={handleSearch}
            type="button"
            className="px-2 h-10 font-semibold w-full bg-blue-600 hover:bg-blue-700 text-white tracking-wide ml-auto outline-none border-none rounded cursor-pointer"
          >
            অনুসন্ধান করুন
          </button>
        </div>
      </div>
      {renderDonors()}
      {totalDonners > parPage && donners.length > 0 && (
        <div className="mt-6">
          <Pagination
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            totalItem={totalDonners}
            parPage={parPage}
          />
        </div>
      )}
    </div>
  );
};

export default Donners;
