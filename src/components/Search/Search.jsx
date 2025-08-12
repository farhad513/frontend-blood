/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
const SearchPage = () => {
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");



  // 🔹 বিভাগ (Division) লোড করা
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

  // 🔹 জেলা (District) লোড করা (নির্বাচিত বিভাগ অনুযায়ী)
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

  // 🔹 উপজেলা (Upazila) লোড করা (নির্বাচিত জেলা অনুযায়ী)
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

  return (

  <div className="max-w-7xl max-lg:max-w-2xl mx-auto px-3">
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-2 max-sm:max-w-sm max-sm:mx-auto mt-5" >
      {/* <h2 className="text-lg font-bold mb-3 text-center">Select Location</h2> */}

   <div>   
    {/* <label className="block mb-1">Division:</label> */}
      <select
        className="border p-2 rounded w-full mb-3"
        onChange={(e) => setSelectedDivision(e.target.value)}
      >
        <option value="">-- Select Division --</option>
        {divisions.map((div) => (
          <option key={div.id} value={div.id}>
            {div.bn_name}
          </option>
        ))}
      </select></div>

      <div>
      <div>
        {/* <label className="block mb-1">District:</label> */}
      <select
        className="border p-2 rounded w-full mb-3"
        onChange={(e) => setSelectedDistrict(e.target.value)}
        disabled={!selectedDivision}
      >
        <option value="">-- Select District --</option>
        {districts.map((dist) => (
          <option key={dist.id} value={dist.id}>
            {dist.bn_name}
          </option>
        ))}
      </select></div>

      </div>
    <div>
    {/* <label className="block mb-1">Upazila:</label> */}
      <select
        className="border p-2 rounded w-full"
        disabled={!selectedDistrict}
        
  onChange={(e) => setSelectedUpazila(e.target.value)}
      >
        <option value="">-- Select Upazila --</option>
        {upazilas.map((upa) => (
          <option key={upa.id} value={upa.id}>
            {upa.bn_name}
          </option>
        ))}
      </select>
    </div>
      <button
        type="button"
        className="px-2 h-10 font-semibold w-full  bg-blue-600 hover:bg-blue-700 text-white tracking-wide ml-auto outline-none border-none rounded cursor-pointer"
      >
        Search
      </button>
    </div>
  </div>
  );
};

export default SearchPage;
