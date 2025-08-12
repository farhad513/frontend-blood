/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  get_user_info,
  messageClear,
  user_profile,
} from "../../store/reducers/authReducer";
import moment from "moment";
import toast from "react-hot-toast";
import Loading from "../Loading/Loading";

const DonorForm = () => {
  const { userInfo, errorMessage, successMessage } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    division: "",
    district: "",
    upazila: "",
    address: "",
    lastBloodDate: "",
    age: "",
    donateBlood: "",
  });

  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
const [isLoading, setIsLoading] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const bengaliRegex = /^[\u0980-\u09FF0-9\s,./-]*$/;
    const numericRegex = /^[০-৯]*$/;

    if (name === "name" && value && !bengaliRegex.test(value)) {
      toast.error("নাম অবশ্যই বাংলায় লিখুন, ইংরেজি বা অন্য কিছু নয়।");
      return;
    }

    if (name === "address" && value && !bengaliRegex.test(value)) {
      toast.error("ঠিকানা শুধু বাংলায় দিন, ইংরেজি বা স্পেশাল ক্যারেক্টার নয়।");
      return;
    }

    if (
      name === "age" &&
      value &&
      !(/^[০-৯]*$/.test(value) || /^[0-9]*$/.test(value))
    ) {
      toast.error("বয়সের ঘরে শুধু সংখ্যা লিখুন। অন্য কিছু নয়।");
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDisabled(true);

    const bengaliRegex = /^[\u0980-\u09FF0-9\s,./-]+$/;
    const numericRegex = /^[০-৯]+$/;
    const englishNumericRegex = /^[0-9]+$/;

    if (formData.address && !bengaliRegex.test(formData.address)) {
      toast.error("অনুগ্রহ করে ঠিকানা বাংলায় লিখুন।");
      return;
    }

    if (
      formData.age &&
      !(
        numericRegex.test(formData.age) ||
        englishNumericRegex.test(formData.age)
      )
    ) {
      toast.error("বয়স শুধুমাত্র সংখ্যা হতে হবে।");
      return;
    }

    const divisionName =
      divisions.find((d) => d.id === selectedDivision)?.bn_name ||
      formData.division;
    const districtName =
      districts.find((d) => d.id === selectedDistrict)?.bn_name ||
      formData.district;
    const upazilaName =
      upazilas.find((u) => u.id === selectedUpazila)?.bn_name ||
      formData.upazila;

    const data = {
      ...formData,
      division: divisionName,
      district: districtName,
      upazila: upazilaName,
      donateBlood: formData.donateBlood,
    };

    dispatch(user_profile({ ...data, id: userInfo._id }));
  };

  // Handle message notifications
  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setIsDisabled(true);
      setIsDisabled(false);

      dispatch(get_user_info());
    }
  }, [successMessage, errorMessage, dispatch]);

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

  // Load districts when division changes
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

  // Load upazilas when district changes
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

  // Load user data and set default values
  useEffect(() => {
    if (userInfo && divisions.length > 0) {
      setFormData({
        name: userInfo.name || "",
        email: userInfo.email || "",
        dob: userInfo.dob ? moment(userInfo.dob).format("YYYY-MM-DD") : "",
        gender: userInfo.gender || "",
        bloodGroup: userInfo.bloodGroup || "",
        division: userInfo.division || "",
        district: userInfo.district || "",
        upazila: userInfo.upazila || "",
        address: userInfo.address || "",
        lastBloodDate: userInfo.lastBloodDate
          ? moment(userInfo.lastBloodDate).format("YYYY-MM-DD")
          : "",
        age: userInfo.age || "",
        donateBlood: userInfo.donateBlood || "",
      });

      // set selected division id by name
      const selectedDiv = divisions.find(
        (d) => d.bn_name === userInfo.division
      );
      setSelectedDivision(selectedDiv?.id || "");
      setSelectedDistrict("");
      setSelectedUpazila("");
    }
     setIsLoading(false); 

  }, [userInfo, divisions]);

  // Set selected district when districts load
  useEffect(() => {
    if (districts.length > 0 && userInfo) {
      const selectedDist = districts.find(
        (d) => d.bn_name === userInfo.district
      );
      setSelectedDistrict(selectedDist?.id || "");
    }
  }, [districts, userInfo]);

  // Set selected upazila when upazilas load
  useEffect(() => {
    if (upazilas.length > 0 && userInfo) {
      const selectedUpz = upazilas.find((u) => u.bn_name === userInfo.upazila);
      setSelectedUpazila(selectedUpz?.id || "");
    }
  }, [upazilas, userInfo]);
if (isLoading) {
  
  return (
    <div className="min-h-screen flex items-center justify-center text-lg font-semibold text-gray-600">
      তথ্য লোড হচ্ছে...
    </div>
  );
}
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {userInfo?.avatar?.url && (
        <div className="flex justify-center mb-6">
          <img
            src={userInfo.avatar.url}
            alt="User Avatar"
            className="w-28 h-28 object-cover rounded-full border-4 border-green-500"
          />
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          // disabled={isDisabled}
          className="border p-2 rounded"
          placeholder="নাম"
        />
        <input
          type="text"
          value={userInfo?.phone}
          disabled
          className="border p-2 rounded"
          placeholder="মোবাইল"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          // disabled={isDisabled}
          className="border p-2 rounded"
          placeholder="ইমেইল"
        />
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          // disabled={isDisabled}
          className="border p-2 rounded"
        />
        <input
          type="date"
          name="lastBloodDate"
          value={formData.lastBloodDate}
          onChange={handleChange}
          // disabled={isDisabled}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="age"
          value={formData.age}
          onChange={handleChange}
          // disabled={isDisabled}
          className="border p-2 rounded"
          placeholder="বয়স"
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          // disabled={isDisabled}
          className="border p-2 rounded"
        >
          <option value="">লিঙ্গ</option>
          <option value="পুরুষ">পুরুষ</option>
          <option value="মহিলা">মহিলা</option>
          <option value="অন্যান্য">অন্যান্য</option>
        </select>

        <select
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          // disabled={isDisabled}
          className="border p-2 rounded"
        >
          <option value="">রক্তের গ্রুপ</option>
          <option value="A+">এ+</option>
          <option value="A-">এ-</option>
          <option value="B+">বি+</option>
          <option value="B-">বি-</option>
          <option value="AB+">এবি+</option>
          <option value="AB-">এবি-</option>
          <option value="O+">ও+</option>
          <option value="O-">ও-</option>
        </select>

        <select
          value={selectedDivision}
          onChange={(e) => setSelectedDivision(e.target.value)}
          // disabled={isDisabled}
          className="border p-2 rounded"
        >
          <option value="">বিভাগ</option>
          {divisions.map((div) => (
            <option key={div.id} value={div.id}>
              {div.bn_name}
            </option>
          ))}
        </select>

        <select
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          disabled={!selectedDivision || isDisabled}
          className="border p-2 rounded"
        >
          <option value="">জেলা</option>
          {districts.map((dist) => (
            <option key={dist.id} value={dist.id}>
              {dist.bn_name}
            </option>
          ))}
        </select>

        <select
          value={selectedUpazila}
          onChange={(e) => setSelectedUpazila(e.target.value)}
          disabled={!selectedDistrict || isDisabled}
          className="border p-2 rounded"
        >
          <option value="">উপজেলা</option>
          {upazilas.map((upz) => (
            <option key={upz.id} value={upz.id}>
              {upz.bn_name}
            </option>
          ))}
        </select>

        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows="3"
          className="border p-2 rounded col-span-1 md:col-span-2"
          placeholder="ঠিকানা লিখুন"
        />
        <label className="block mb-4">
          <span className="text-lg font-medium">
            আপনি কি মানবতার পাশে দাঁড়িয়ে রক্ত দিতে ইচ্ছুক?
          </span>
          <div className="flex items-center space-x-6 mt-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="donateBlood"
                value="হ্যাঁ"
                checked={formData.donateBlood === "হ্যাঁ"}
                onChange={handleChange}
                // disabled={isDisabled}
                className="form-radio text-green-500"
              />
              <span>হ্যাঁ</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="donateBlood"
                value="না"
                checked={formData.donateBlood === "না"}
                onChange={handleChange}
                // disabled={isDisabled}
                className="form-radio text-red-500"
              />
              <span>না</span>
            </label>
          </div>
        </label>

        <button
          type="submit"
          className={`col-span-1 md:col-span-2 py-2 rounded text-white ${
            isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-green-500"
          }`}
          disabled={isDisabled}
        >
          {isDisabled ? "সাবমিট হচ্ছে..." : "সাবমিট করুন"}
        </button>
      </form>
    </div>
  );
};

export default DonorForm;
