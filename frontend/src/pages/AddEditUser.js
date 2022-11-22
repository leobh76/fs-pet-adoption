import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBInput,
  MDBCardBody,
  MDBValidation,
  MDBBtn,
} from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUser, updateUser } from "../redux/features/userSlice";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phone: "",
};

const AddEditUser = () => {
  const [userData, setUserData] = useState(initialState);

  const { error, users } = useSelector((state) => ({ ...state.user }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    firstName,
    lastName,
    email,
    password,
    phone,
  } = userData;

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const singleUser = users.find((user) => user._id === id);
      setUserData({ ...singleUser });
    }
  }, [users, id]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      firstName &&
      lastName &&
      email &&
      password &&
      phone
    ) {
      const updatedUserData = { ...userData, name: user?.result?.firstName };
      if (!id) {
        dispatch(createUser({ updatedUserData, navigate, toast }));
      } else {
        dispatch(updateUser({ id, updatedUserData, toast, navigate }));
      }
      handleClear();
    }
  };

  const handleClear = () => {
    setUserData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
    });
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "5rem",
      }}
      className="container"
    >
      <MDBCard alignment="center">
        <h5 className="mt-4">{id ? "Update User" : "Add New User"}</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>
            <div className="col-md-12">
              <MDBInput
                label="First Name"
                placeholder="First Name"
                type="text"
                value={firstName || ""}
                name="firstName"
                onChange={onInputChange}
                className="form-control"
                required
                invalid="true"
                validation="Please provide a first name."
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                label="Last Name"
                placeholder="Last Name"
                type="text"
                value={lastName || ""}
                name="lastName"
                onChange={onInputChange}
                className="form-control"
                required
                invalid="true"
                validation="Please provide a last name."
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                label="Email"
                placeholder="Email"
                type="text"
                value={email || ""}
                name="email"
                onChange={onInputChange}
                className="form-control"
                required
                invalid="true"
                validation="Please provide an email."
              />
            </div>
            <div className="col-md-6">
              <MDBInput
                label="Password"
                placeholder="Password"
                type="text"
                value={password || ""}
                name="password"
                onChange={onInputChange}
                className="form-control"
                required
                invalid="true"
                validation="Please provide a password."
              />
            </div>
            <div className="col-md-6">
              <MDBInput
                label="Phone"
                placeholder="Phone"
                type="text"
                value={phone || ""}
                name="phone"
                onChange={onInputChange}
                className="form-control"
                required
                invalid="true"
                validation="Please provide a phone number."
              />
            </div>
            <div className="d-flex-justify-content-start">
              <div className="col-12">
                <MDBBtn style={{ width: "100%", marginTop: "1rem" }}>
                  {id ? "Update" : "Submit"}
                </MDBBtn>
                <MDBBtn
                  style={{ width: "100%" }}
                  className="mt-2"
                  color="danger"
                  onClick={handleClear}
                >
                  Clear
                </MDBBtn>
              </div>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default AddEditUser;