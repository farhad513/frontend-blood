/* eslint-disable react/prop-types */
import React from "react";

const InputField = ({
  label,
  name,
  value,
  placeholder,
  onChange,
  type = "text",
}) => (
  <div className="mb-5">
    {label && (
      <label
        htmlFor={name}
        className="mb-3 block text-base font-medium text-[#07074D]"
      >
        {label}
      </label>
    )}

    {type === "time" ? (
      <div className="relative">
        <input
          type="time"
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          className="appearance-none w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 pr-12 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          required
        />
        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-7a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
    ) : (
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        required
      />
    )}
  </div>
);

export default InputField;
