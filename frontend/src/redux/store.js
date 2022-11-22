import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import PetReducer from "./features/petSlice";
import UserReducer from "./features/userSlice";

export default configureStore({
  reducer: {
    auth: AuthReducer,
    pet: PetReducer,
    user: UserReducer,
  },
});