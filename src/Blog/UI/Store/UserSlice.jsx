import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
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
export const getData = createAsyncThunk("getblogs", async (data) => {
  let { limit, count } = data;
  // console.log(count);
  try {
    const res = await axios.get(
      `http://localhost:5000/getblogs?page=${count}&limit=${limit}`,
      {
        headers: {
          authorization: `bearer ${JSON.parse(
            localStorage.getItem("login-auth")
          )}`,
        },
      }
    );
    return res;
  } catch (err) {
    console.log(err);
  }
});

export const getUserData = createAsyncThunk("getblog", async (data) => {
  let { limit, userId, count } = data;
  // console.log(userId);
  try {
    const res = await axios.get(
      `http://localhost:5000/getblog/${userId}?page=${count}&limit=${limit}`,
      {
        headers: {
          authorization: `bearer ${JSON.parse(
            localStorage.getItem("login-auth")
          )}`,
        },
      }
    );
    return res;
  } catch (err) {
    console.log(err);
  }
});
export const deleteUserData = createAsyncThunk("delete", async (_id) => {
  try {
    const res = await axios.delete(`http://localhost:5000/delete/${_id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(
          localStorage.getItem("login-auth")
        )}`,
      },
    });
    toast.error("Deleted!!!", { autoClose: 200 });
    return res;
  } catch (err) {
    console.log(err);
  }
});
export const updateData = createAsyncThunk("updateblogs", async (item) => {
  const { name, email, password, image, userId, _id } = item;

  // console.log(item);
  try {
    const res = await axios
      .put(
        `http://localhost:5000/updateblogs/${_id}`,
        {
          name: name,
          email: email,
          password: password,
          userId: userId,
          image: image,
        },
        {
          headers: {
            authorization: `bearer ${JSON.parse(
              localStorage.getItem("login-auth")
            )}`,
            "content-type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log(response);
      });
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
      state.addblogs = false;
    },
    [addData.fulfilled]: (state, action) => {
      state.addblogs = true;
      state.loading = false;
      state.success = true;
      state.progress = 100;
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

    [getUserData.pending]: (state, action) => {
      state.loading = true;
      state.success = false;
      state.progress = 70;
    },
    [getUserData.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.progress = 100;
      state.blogs = action.payload;
    },
    [getUserData.rejected]: (state, action) => {
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
