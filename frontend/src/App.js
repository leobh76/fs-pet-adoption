// misc
import "./App.css";
import { PrivateRoute } from "./components/PrivateRoute";

// header
import Header from "./components/Header";

// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddEditPet from "./pages/AddEditPet";
import AddEditUser from "./pages/AddEditUser";
import SinglePet from "./pages/SinglePet";
import Dashboard from "./pages/Dashboard";
import UsersDashboard from "./pages/UsersDashboard";
import NotFound from "./pages/NotFound";

// utilities
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/authSlice";
import AccessDenied from "./pages/AccessDenied";

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    dispatch(setUser(user));
  }, [dispatch, user]);
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <ToastContainer />
        <Routes>
          {/* ↓↓ private routes (user) ↓↓ */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/pets/search"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          {/* ↑↑ private routes (user) ↑↑ */}

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ↓↓ admin routes ↓↓ */}
          <Route
            path="/addpet"
            element={
              user && user?.result?.isAdmin ? <AddEditPet /> : <AccessDenied />
            }
          />
          <Route
            path="/editpet/:id"
            element={
              user && user?.result?.isAdmin ? <AddEditPet /> : <AccessDenied />
            }
          />
          <Route
            path="/dashboard"
            element={
              user && user?.result?.isAdmin ? <Dashboard /> : <AccessDenied />
            }
          />
          <Route
            path="/adduser"
            element={
              user && user?.result?.isAdmin ? <AddEditUser /> : <AccessDenied />
            }
          />
          <Route
            path="/edituser/:id"
            element={
              user && user?.result?.isAdmin ? <AddEditUser /> : <AccessDenied />
            }
          />
          <Route
            path="/usersdashboard"
            element={
              user && user?.result?.isAdmin ? <UsersDashboard /> : <AccessDenied />
            }
          />
          {/* ↑↑ admin routes ↑↑ */}

          <Route path="*" element={<NotFound />} />
          <Route
            path="/pet/:id"
            element={
              <PrivateRoute>
                <SinglePet />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
