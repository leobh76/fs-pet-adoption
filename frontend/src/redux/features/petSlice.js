import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createPet = createAsyncThunk(
  "pet/createpet",
  async ({ updatedPetData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createPet(updatedPetData);
      toast.success("Pet added successfully!");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getPets = createAsyncThunk(
  "pet/getpets",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getPets();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getPet = createAsyncThunk(
  "pet/getpet",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getPet(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const likePet = createAsyncThunk(
  "pet/likepet",
  async ({ _id }, { rejectWithValue }) => {
    try {
      const response = await api.likePet(_id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getPetsByUser = createAsyncThunk(
  "pet/getpetsbyuser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getPetsByUser(userId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deletePet = createAsyncThunk(
  "pet/deletepet",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deletePet(id);
      toast.success("Pet deleted successfully!");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updatePet = createAsyncThunk(
  "pet/updatepet",
  async ({ id, updatedPetData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updatePet(updatedPetData, id);
      toast.success("Pet updated successfully!");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const searchPets = createAsyncThunk(
  "pet/searchpets",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await api.getPetsBySearch(searchQuery);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const petSlice = createSlice({
  name: "pet",
  initialState: {
    pet: {},
    pets: [],
    userPets: [],
    error: "",
    loading: false,
  },
  extraReducers: {
    // creating a pet
    [createPet.pending]: (state, action) => {
      state.loading = true;
    },
    [createPet.fulfilled]: (state, action) => {
      state.loading = false;
      state.pets = [action.payload];
    },
    [createPet.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    //getting all pets
    [getPets.pending]: (state, action) => {
      state.loading = true;
    },
    [getPets.fulfilled]: (state, action) => {
      state.loading = false;
      state.pets = action.payload;
    },
    [getPets.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    // getting a single pet
    [getPet.pending]: (state, action) => {
      state.loading = true;
    },
    [getPet.fulfilled]: (state, action) => {
      state.loading = false;
      state.pet = action.payload;
    },
    [getPet.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    // getting pets by user
    [getPetsByUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getPetsByUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userPets = action.payload;
    },
    [getPetsByUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    // deleting a pet
    [deletePet.pending]: (state, action) => {
      state.loading = true;
    },
    [deletePet.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("action", action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userPets = state.userPets.filter((item) => item._id !== id);
        state.pets = state.pets.filter((item) => item._id !== id);
      }
    },
    [deletePet.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    // updating a pet
    [updatePet.pending]: (state, action) => {
      state.loading = true;
    },
    [updatePet.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userPets = state.userPets.map((item) =>
          item._id === id ? action.payload : item
        );
        state.pets = state.pets.map((item) =>
          item._id === id ? action.payload : item
        );
      }
    },
    [updatePet.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    // liking a pet
    [likePet.pending]: (state, action) => {},
    [likePet.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { _id },
      } = action.meta;
      if (_id) {
        state.pets = state.pets.map((item) =>
          item._id === _id ? action.payload : item
        );
      }
    },
    [likePet.rejected]: (state, action) => {
      state.error = action.payload.message;
    },
    // search for a pet
    [searchPets.pending]: (state, action) => {
      state.loading = true;
    },
    [searchPets.fulfilled]: (state, action) => {
      state.loading = false;
      state.pets = action.payload;
    },
    [searchPets.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default petSlice.reducer;