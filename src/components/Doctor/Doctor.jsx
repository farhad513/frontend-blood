/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useCallback, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import { reset_doctor } from '../../store/reducers/homeReducer';
import { useDispatch } from 'react-redux';

const Doctor = ({ doctor }) => {
  const dispatch= useDispatch();
  const navigate = useNavigate();
   useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
  console.log(doctor,"doctor")
  const booking = useCallback(() => {
    const obj = {
      hospitalId: doctor.hospital._id,
      doctorInfo: doctor,
    };
    navigate("/doctor-booking", {
      state: { appoinment: obj },
    });
  }, [doctor, navigate]);
  
  const handleDetails = () => {
    dispatch(reset_doctor());
    navigate(`/doctor/details/${doctor.slug}-${doctor._id}`, {
      state: { refresh: new Date().getTime() }
    });
  }
  const trimWords = (text, count) => text.split(" ").slice(0, count).join(" ");

  return (
    <div key={doctor.id}>
       
      <div className="bg-white flex flex-col rounded overflow-hidden shadow-md hover:scale-[1.01] transition-all h-[470px]">
        <div className="w-full">
          <img
            src={doctor?.image?.url}
            alt={`ডাক্তার ${doctor?.name}`}
            loading="lazy"
            className="w-full object-cover object-top h-64 aspect-[305/307]"
          />
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <div className="flex-1">
            <div onClick={handleDetails}>
              <h5 className="text-sm sm:text-base font-bold cursor-pointer text-gray-800 line-clamp-2">{trimWords(doctor.name,3)}</h5>
            </div>

            <p className="text-sm font-medium">{doctor.qualification}</p>
            <p className="text-sm font-medium">বিভাগ: {trimWords(doctor.category,2)}</p>
            <p className="text-sm font-medium">{doctor.experience} বছরের অভিজ্ঞতা</p>
            <p className="text-sm font-medium">চেম্বার ফি: {doctor.fee}</p>
            <p className="text-sm font-medium">চেম্বার: {doctor?.hospital?.name}</p>
          </div>

          <button
            type="button"
            onClick={booking}
            className="px-2 h-9 font-semibold w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white tracking-wide ml-auto outline-none border-none rounded cursor-pointer"
          >
            অ্যাপয়েন্টমেন্ট বুক করুন
          </button>
        </div>
      </div>
    </div>
  );
};

export default Doctor;
