import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

// authentication / authorization
export const signIn = (formData) => API.post("users/signin", formData);
export const signUp = (formData) => API.post("users/signup", formData);
export const isAdmin = () => API.get("/isAdmin");

// pets
export const createPet = (petData) => API.post("/pet", petData);
export const getPets = () => API.get("/pet");
export const getPet = (id) => API.get(`/pet/${id}`);
export const deletePet = (id) => API.delete(`/pet/${id}`);
export const updatePet = (updatedPetData, id) =>
  API.patch(`/pet/${id}`, updatedPetData);
export const getPetsByUser = (userId) => API.get(`/pet/userpets/${userId}`);
export const getPetsBySearch = (searchQuery) =>
  API.get(`/pet/search?searchquery=${searchQuery}`);
export const likePet = (id) => API.patch(`/pet/like/${id}`);

// users
export const createUser = (userData) => API.post("/admin", userData);
export const getUsers = () => API.get("/admin/");
export const getUser = (id) => API.get(`/admin/users/${id}`);
export const deleteUser = (id) => API.delete(`/admin/users/${id}`);
export const updateUser = (updatedUserData, id) =>
  API.patch(`/admin/users/${id}`, updatedUserData);
export const getUsersByAdmin = (userId) =>
  API.get(`admin/user/adminusers/${userId}`);