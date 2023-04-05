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
export const getData = createAsyncThunk("getblogs", async () => {
  try {
    const res = await axios.get("http://localhost:5000/getblogs", {
      headers: {
        authorization: `bearer ${JSON.parse(
          localStorage.getItem("login-auth")
        )}`,
      },
    });
    // return res.data;
    return res;
  } catch (err) {
    console.log(err);
  }
});

export const UserSlice = createSlice({
  name: "blogs",
  initialState: {
    success: false,
    failed: false,
    loading: false,
    addblogs: false,
    progress: 40,
    blogs: [],
  },
  extraReducers: {
    [addData.pending]: (state, action) => {
      state.loading = true;
      state.progress = 70;
      state.success = false;
    },
    [addData.fulfilled]: (state, action) => {
      state.addblogs = true;
      state.loading = false;
      state.success = true;
      state.progress = 100;
      state.blogs = action.payload;
    },
    [addData.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
    },

    [getData.pending]: (state, action) => {
      state.loading = true;
      state.success = false;
      state.progress = 70;
    },
    [getData.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.progress = 100;
      state.blogs = action.payload;
    },
    [getData.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
    },
    // reducers: {
    //   addblogs(state, action) {
    //     state.push(action.payload);
    //   },
  },
});

export const { addblogs } = UserSlice.actions;
export const selectAllPosts = (state) => state.posts.posts;

// this is for configureStore
export default UserSlice.reducer;
