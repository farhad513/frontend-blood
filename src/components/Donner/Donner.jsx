/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

// Mapping of blood groups to Bangla
const bloodGroupMap = {
  "A+": "এ +",
  "A-": "এ -",
  "B+": "বি +",
  "B-": "বি -",
  "AB+": "এবি +",
  "AB-": "এবি -",
  "O+": "ও +",
  "O-": "ও -",
};

const engToBengaliNumber = (number) => {
  const engNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const bengNumbers = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

  return number?.toString().split('').map(char => {
    const index = engNumbers.indexOf(char);
    return index !== -1 ? bengNumbers[index] : char;
  }).join('');
};

const Donner = ({ donners }) => {
  return (
    <>
      <div className="font-[sans-serif]">
        <div className="p-4 mx-auto lg:max-w-7xl md:max-w-4xl sm:max-w-xl max-sm:max-w-sm">
          <div className="font-sans overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100 whitespace-nowrap">
                <tr>
                  <th className="p-4 text-center text-xs font-semibold text-gray-800">
                    নাম
                  </th>
                  <th className="p-4 text-center text-xs font-semibold text-gray-800">
                    মোবাইল নাম্বার
                  </th>
                  <th className="p-4 text-center text-xs font-semibold text-gray-800">
                    ব্লাড গ্রুপ
                  </th>
                  <th className="p-4 text-center text-xs font-semibold text-gray-800">
                    সর্বশেষ রক্তদান
                  </th>
                  <th className="p-4 text-center text-xs font-semibold text-gray-800">
                    উপজেলা
                  </th>
                  <th className="p-4 text-center text-xs font-semibold text-gray-800">
                    ঠিকানা
                  </th>
                </tr>
              </thead>
              {donners.map((donner, index) => {
                return (
                  <tbody key={index}>
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 text-center text-[15px] text-gray-800">
                        {donner?.name}
                      </td>
                      <td className="p-4 text-center text-[15px] text-gray-800">
                        {engToBengaliNumber(donner?.phone)}
                      </td>
                      <td className="p-4 text-center text-[15px] text-gray-800">
                        {bloodGroupMap[donner.bloodGroup] || donner.bloodGroup}
                      </td>
                      <td className="p-4 text-center text-[15px] text-gray-800">
                        {new Date(donner?.lastBloodDate).toLocaleDateString(
                          "bn-BD"
                        )}
                      </td>
                      <td className="p-4 text-center text-[15px] text-gray-800">
                        {donner?.upazila}
                      </td>
                      <td className="p-4 text-center text-[15px] text-gray-800">
                        {donner?.address?.split(" ").slice(0, 3).join(" ")}
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Donner;
