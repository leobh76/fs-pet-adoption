import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createUser = createAsyncThunk(
  "user/createuser",
  async ({ updatedUserData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createUser(updatedUserData);
      toast.success("User created successfully!");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getUsers = createAsyncThunk(
  "user/getusers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getUsers();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getUser = createAsyncThunk(
  "user/getuser",
  async (_id, { rejectWithValue }) => {
    try {
      const response = await api.getUser(_id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getUsersByAdmin = createAsyncThunk(
  "pet/getusersbyadmin",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getUsersByAdmin(userId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteuser",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteUser(id);
      toast.success("User deleted successfully!");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateuser",
  async ({ id, updatedUserData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateUser(updatedUserData, id);
      toast.success("User updated successfully!");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    users: [],
    adminUsers: [],
    error: "",
    loading: false,
  },
  extraReducers: {
    // creating a user
    [createUser.pending]: (state, action) => {
      state.loading = true;
    },
    [createUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = [action.payload];
    },
    [createUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    //getting all users
    [getUsers.pending]: (state, action) => {
      state.loading = true;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    [getUsers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    // getting a single user
    [getUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [getUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    // getting users by admin
    [getUsersByAdmin.pending]: (state, action) => {
      state.loading = true;
    },
    [getUsersByAdmin.fulfilled]: (state, action) => {
      state.loading = false;
      state.adminUsers = action.payload;
    },
    [getUsersByAdmin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    // deleting a user
    [deleteUser.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("action", action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.adminUsers = state.adminUsers.filter((item) => item._id !== id);
        state.users = state.users.filter((item) => item._id !== id);
      }
    },
    [deleteUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    // updating an user
    [updateUser.pending]: (state, action) => {
      state.loading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("action", action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.adminUsers = state.adminUsers.map((item) =>
          item._id === id ? action.payload : item
        );
        state.users = state.users.map((item) =>
          item._id === id ? action.payload : item
        );
      }
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default userSlice.reducer;
