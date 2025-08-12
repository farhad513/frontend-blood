/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwt from "jwt-decode";
import { base_url } from "../../utils/config";
import axios from "axios";


export const verifyAndRegister = createAsyncThunk(
  "user/verifyAndRegister",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    console.log(info)
    try {
      const { data } = await axios.post(
        `${base_url}/api/user/verify-register`,
        info,
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("userToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const sendOtpForRegistration = createAsyncThunk(
  "user/sendOtpForRegistration",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    console.log(info)
    try {
      const { data } = await axios.post(`${base_url}/api/user/send-otp`, info);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: "OTP পাঠাতে সমস্যা হয়েছে।" }
      );
    }
  }
);

export const user_login = createAsyncThunk(
  "user/user_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axios.post(
        `${base_url}/api/user/user-login`,
        info,
        { withCredentials: true }
      );
      localStorage.setItem("userToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const user_profile = createAsyncThunk(
  "user/user_profile",
  async (info, { rejectWithValue, fulfillWithValue }) => {

    try {
      const { data } = await axios.post(
        `${base_url}/api/user/user-profile`,
        info, { withCredentials: true }
      );
      localStorage.setItem("userToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_user_info = createAsyncThunk(
  "auth/get_user_info",
  async (_, { rejectWithValue, fulfillWithValue,getState }) => {
    try {
       const token = getState().user.token;
   
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
      const { data } = await axios.get(`${base_url}/api/user/get-user`, config);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unauthorized");
    }
  }
);
const decodeToken = (token) => {
  if (token) {
    const userInfo = jwt(token);
    const expired = new Date(userInfo.exp * 1000);
    if (new Date() > expired) {
      localStorage.removeItem("userToken");
      return "";
    } else {
      return userInfo;
    }
  } else {
    return "";
  }
};
export const authReducer = createSlice({
  name: "user",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    userInfo: decodeToken(localStorage.getItem("userToken")),
    token: localStorage.getItem("userToken"),
    otpSent: "",
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    user_reset: (state, _) => {
      state.userInfo = "";
    },
        setUserInfo: (state, action) => {
      state.userInfo = action.payload.userInfo;
      state.token = action.payload.token;
    },
  },
  extraReducers: {
[verifyAndRegister.pending]: (state) => {
      state.loader = true;
    },
    [verifyAndRegister.rejected]: (state, { payload }) => {
      state.errorMessage = payload.error;
      state.loader = false;

    },
    [verifyAndRegister.fulfilled]: (state, { payload }) => {
      const userInfo = jwt(payload.token);
      state.successMessage = payload.message;
      state.loader = false;
      state.userInfo = userInfo;
      state.token = payload.token;
    },
        [sendOtpForRegistration.pending]: (state, { payload }) => {
      state.loader = true;
    },
    [sendOtpForRegistration.rejected]: (state, { payload }) => {
      state.loader = false;
      state.otpSent = false;
      state.errorMessage = payload.error;
    },
    [sendOtpForRegistration.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.otpSent = true;
      state.successMessage = payload.message;
    },
    [user_login.pending]: (state, _) => {
      state.loader = true;
    },
    [user_login.rejected]: (state, { payload }) => {
      state.errorMessage = payload.error;
      state.loader = false;
    },
    [user_login.fulfilled]: (state, { payload }) => {
      const userInfo = decodeToken(payload.token);
      state.successMessage = payload.message;
      state.loader = false;
      state.userInfo = userInfo;
      state.token = payload.token;
    },
    [user_profile.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
      state.loader = false;
      state.userInfo = decodeToken(payload.token);
    },[user_profile.rejected]: (state, { payload }) => {
      state.errorMessage = payload.error;
      state.loader = false;
    },
    
    [get_user_info.pending]: (state) => {
      state.loader = true;
    },
    [get_user_info.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.userInfo = payload.userInfo;
    },
    [get_user_info.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload;
      if (payload === "No token found") {
        state.userInfo = null;
        state.token = null;
      }
    },
  },
});

export const { messageClear, user_reset,setUserInfo } = authReducer.actions;
export default authReducer.reducer;


export const loadUserInfo = () => async (dispatch) => {
  const { userInfo, token } = await decodeToken();
  if (token) {
    dispatch(setUserInfo({ userInfo, token }));
  }
};
