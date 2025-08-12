/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { base_url } from "../../utils/config";
import qs from "qs";
export const get_categorys = createAsyncThunk(
  "home/get_categorys",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${base_url}/api/home/get-categorys`);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);



export const get_category = createAsyncThunk(
  "home/get_category",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${base_url}/api/home/get-category`);

      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const query_doctors = createAsyncThunk(
  "home/query_doctors",
  async (query, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${base_url}/api/home/query-doctors?category=${
          query.category
        }&&pageNumber=${query.pageNumber}&&searchValue=${
          query.searchValue ? query.searchValue : ""
        }`
      );
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data || error.response);
    }
  }
);

export const query_hospitals = createAsyncThunk(
  "home/query_hospitals",
  async (query, { fulfillWithValue, rejectWithValue }) => {
    console.log(query, "query");

    // Start building the URL
    let url = `${base_url}/api/get-user-hospitals?page=${query.page}&parPage=${query.parPage}`;

    // Conditionally add filters to the URL if they're defined
    if (query.division) url += `&division=${query.division}`;
    if (query.district) url += `&district=${query.district}`;
    if (query.upazila) url += `&upazila=${query.upazila}`;
    if (query.searchValue) url += `&searchValue=${query.searchValue}`;

    try {
      const { data } = await axios.get(url);
      console.log(data, "data");
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data || error.response);
    }
  }
);

export const query_donners = createAsyncThunk(
  "home/query_donners",
  async (query, { fulfillWithValue, rejectWithValue, getState }) => {
    console.log(query, "query");
    const token = getState().user.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    // Start building the URL
    let url = `${base_url}/api/user/get-user-donners?page=${query.page}&parPage=${query.parPage}`;

    // Conditionally add filters to the URL if they're defined
    if (query.division) url += `&division=${query.division}`;
    if (query.district) url += `&district=${query.district}`;
    if (query.upazila) url += `&upazila=${query.upazila}`;
    if (query.searchValue) url += `&searchValue=${query.searchValue}`;
    if (query.bloodGroup) url += `&bloodGroup=${query.bloodGroup}`;
    try {
      const { data } = await axios.get(url, config);

      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data || error.response);
    }
  }
);

export const get_doctor = createAsyncThunk(
  "home/get_doctor",
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${base_url}/api/home/get-doctor/${id}`);

      return fulfillWithValue(data);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const get_doctors = createAsyncThunk(
  "home/get_doctors",
  async (filters = {}, { fulfillWithValue, rejectWithValue,getState }) => {
    const token = getState().user.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      // filters can be a string (search) or object with keys
      let query = "";
      if (typeof filters === "string") {
        query = `search=${encodeURIComponent(filters)}`;
      } else if (typeof filters === "object" && filters !== null) {
        // Convert filter object to query string using qs
        query = qs.stringify(filters, { encode: true, skipNulls: true });
      }

      const { data } = await axios.get(
        `${base_url}/api/home/get-doctors?${query}`,config
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.response);
    }
  }
);
export const contact_us = createAsyncThunk(
  "home/contact_us",
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${base_url}/api/home/create-contact`,
        info
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const bookAppointment = createAsyncThunk(
  "appointment/bookAppointment",
  async (appointmentData, { fulfillWithValue, rejectWithValue, getState }) => {
    const token = getState().user.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${base_url}/api/home/appoinment/place-appoinment`,
        appointmentData,
        config
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const get_user_appointments = createAsyncThunk(
  "appointment/get_user_appointments",
  async (
    { userId, status, parPage, page },
    { fulfillWithValue, rejectWithValue, getState }
  ) => {
    const token = getState().user.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.get(
        `${base_url}/api/home/customer/get-appoinments/${userId}/${status}?page=${page}&parPage=${parPage}`,
        config
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const bookAmbulance = createAsyncThunk(
  "home/bookAmbulance",
  async (ambulanceData, { fulfillWithValue, rejectWithValue, getState }) => {
    const token = getState().user.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.post(
        `${base_url}/api/home/ambulance/place-booking`,
        ambulanceData,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("Network Error");
      }
    }
  }
);

export const get_blogs = createAsyncThunk(
  "home/get_blogs",
  async (query, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${base_url}/api/blog/blog-user-get?page=${query.page}&&parPage=${
          query.parPage
        }&&searchValue=${query.searchValue ? query.searchValue : ""}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data || error.response);
    }
  }
);

export const get_blog = createAsyncThunk(
  "home/get_blog",
  async (blogId, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${base_url}/api/blog/get-user-blog/${blogId}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data || error.response);
    }
  }
);

export const get_user_ambulances = createAsyncThunk(
  "home/get_user_ambulances",
  async (
    { userId, status, parPage, page },
    { fulfillWithValue, rejectWithValue, getState }
  ) => {
    try {
      const token = getState().user.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // API url তৈরি
      const url = `${base_url}/api/home/get-ambulances/${userId}/${status}?page=${page}&parPage=${parPage}`;

      // API কল করা
      const { data } = await axios.get(url, config);

      // সফল হলে data রিটার্ন করো
      return fulfillWithValue(data);
    } catch (error) {
      // এরর হলে এরর কনসোল করো

      // rejectWithValue দিয়ে error message পাঠাও
      return rejectWithValue(
        error.response?.data || error.message || "Unknown error occurred"
      );
    }
  }
);


// get all banners

export const get_banners = createAsyncThunk(
  "home/get_banners",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
  const { data } = await axios.get(
        `${base_url}/api/site-banner/get-banners`,
      );      
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data || error.response);
    }
  }
);


export const get_all_hospitals = createAsyncThunk(
  "home/get_all_hospitals",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
  const { data } = await axios.get(
        `${base_url}/api/home/get-all-hospital`
      );      
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data || error.response);
    }
  }
);



export const homeReducer = createSlice({
  name: "home",
  initialState: {
    categorys: [],
    doctors: [],
    totalDoctor: 0,
    parPage: 4,
    errorMessage: "",
    successMessage: "",
    doctor: {},
    hospitals: [],
    hospital: {},
    totalHospital: 0,
    donners: [],
    donner: {},
    totalDonner: 0,
    loading: false,
    myAppointments: [],
    totalAppoinments: 0,
    ambulances:[],
    totalAmbulance:0,
    banners:[],
    totalBanner:0,

  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    reset_doctor: (state) => {
      state.doctor = {}; // doctor ডেটা null বা empty object করে দিচ্ছি
    },
  },
  extraReducers: {
    [get_category.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [get_category.fulfilled]: (state, { payload }) => {
      state.category = payload.category;
      state.loading = false;
    },
    [get_categorys.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [get_categorys.fulfilled]: (state, { payload }) => {
      state.categorys = payload.categorys;
      state.loading = false;
    },
    [query_doctors.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [query_doctors.fulfilled]: (state, { payload }) => {
      state.doctors = payload.doctors;
      state.totalDoctor = payload.totalDoctor;
      state.parPage = payload.parPage;
      state.loading = false;
    },
    [query_hospitals.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [query_hospitals.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.hospitals = payload.hospitals;
      state.totalHospital = payload.totalHospital;
      state.parPage = payload.parPage;
    },
    [query_donners.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [query_donners.fulfilled]: (state, { payload }) => {
      state.donners = payload.users;
      state.totalDonners = payload.totalDonners;
      state.parPage = payload.parPage;
      state.loading = false;
    },
    [get_doctor.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [get_doctor.fulfilled]: (state, { payload }) => {
      state.doctor = payload.doctor;
      state.loading = false;
    },
    [get_doctors.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [get_doctors.fulfilled]: (state, { payload }) => {
      state.doctors = payload.doctors;
      state.loading = false;
    },
    [contact_us.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [contact_us.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
      state.loading = false;
    },
    [bookAppointment.pending]: (state, { payload }) => {
      state.loading = true;
      state.successMessage = null;
      state.errorMessage = null;
    },
    [bookAppointment.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.successMessage = payload.message;
    },
    [bookAppointment.rejected]: (state, { payload }) => {
      state.loading = false;
      state.errorMessage = payload.message;
    },
    [get_user_appointments.pending]: (state, { payload }) => {
      state.loading = true;
      state.successMessage = null;
      state.errorMessage = null;
    },
    [get_user_appointments.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.successMessage = payload.message;
      state.myAppointments = payload.appointments;
      state.totalAppoinments = payload.totalAppointments;
    },
    [get_user_appointments.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.errorMessage =
        payload?.message || error?.message || "কিছু ভুল হয়েছে!";
    },
    [bookAmbulance.pending]: (state) => {
      state.loading = true;
      state.successMessage = null;
      state.errorMessage = null;
    },
    [bookAmbulance.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.successMessage = payload.message;
    },
    [bookAmbulance.rejected]: (state, { payload }) => {
      state.loading = false;
      state.errorMessage = payload.message || payload;
    },
    [get_blogs.fulfilled]: (state, { payload }) => {
      state.blogs = payload.blogs;
      state.totalBlog = payload.totalBlog;
      state.parPage = payload.parPage;
      state.loading = false;
    },
    [get_blog.fulfilled]: (state, { payload }) => {
      state.blog = payload.blog;
    },
          [get_user_ambulances.pending]: (state) => {
        state.loading = true;
        state.successMessage = null;
        state.errorMessage = null;
      },
      [get_user_ambulances.fulfilled]: (state, { payload }) => {
        state.loading = false;
        state.successMessage = payload.message;
        state.ambulances = payload.ambulances;
        state.totalAmbulance = payload.totalAmbulance;
      },
      [get_user_ambulances.rejected]: (state, { payload, error }) => {
        state.loading = false;
        state.errorMessage =
          payload?.message || error?.message || "কিছু ভুল হয়েছে!";
      },
    [get_banners.fulfilled]: (state, { payload }) => {
      state.banners = payload.banners;
    },
    [get_all_hospitals.fulfilled]: (state, { payload }) => {
      state.hospitals = payload.hospitals;
    },
  },
});

export const { messageClear, reset_doctor } = homeReducer.actions;
export default homeReducer.reducer;
