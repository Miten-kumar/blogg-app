import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const postUrl = "http://localhost:5000/addblogs";

export const addData = createAsyncThunk("addblogs", async (blogs) => {
  try {
    const res = await axios.post(postUrl, blogs, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
});

export const UserSlice = createSlice({
  name: "addblogs",
  initialState: {
    success: false,
    failed: false,
    loading: false,
  },
  extraReducers: {
    [addData.pending]: (state, action) => {
      state.loading = true;
      state.success=false
    },
    [addData.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    [addData.rejected]: (state, action) => {
      state.loading = false;
      state.success=false

    },
    // reducers: {
    //   addblogs(state, action) {
    //     state.push(action.payload);
    //   },
  },
});

export const { addblogs } = UserSlice.actions;

// this is for configureStore
export default UserSlice.reducer;
