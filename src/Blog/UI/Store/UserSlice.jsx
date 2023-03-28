import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addData = createAsyncThunk("register", async (Data) => {
  try {
    const res = await axios.post("http://localhost:8000/User", Data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
});

export const UserSlice = createSlice({
  name: "Signup",
  initialState: {
    success: false,
    failed: false,
    loading: false,
  },
  extraReducers: {
    [addData.pending]: (state, action) => {
      state.loading = true;
    },
    [addData.fulfilled]: (state, action) => {
      state.success = true;
      state.loading = false;
    },
    [addData.rejected]: (state, action) => {
      state.failed = true;
      state.loading = false;
    },
  },

});


export const { success, error } = UserSlice.actions;

// this is for configureStore
export default UserSlice.reducer;