import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBInput,
  MDBCardBody,
  MDBValidation,
  MDBBtn,
} from "mdb-react-ui-kit";
import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPet, updatePet } from "../redux/features/petSlice";

const initialState = {
  petName: "",
  petType: "",
  adoptionStatus: "",
  height: "",
  weight: "",
  color: "",
  hypoallergenic: "",
  dietaryRestrictions: "",
  breed: "",
  bio: "",
};

const AddEditPet = () => {
  const [petData, setPetData] = useState(initialState);

  const { error, pets } = useSelector((state) => ({ ...state.pet }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    petName,
    petType,
    adoptionStatus,
    height,
    weight,
    color,
    hypoallergenic,
    dietaryRestrictions,
    breed,
    bio,
  } = petData;

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const singlePet = pets.find((pet) => pet._id === id);
      setPetData({ ...singlePet });
    }
  }, [pets, id]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      petName &&
      petType &&
      adoptionStatus &&
      height &&
      weight &&
      color &&
      hypoallergenic &&
      dietaryRestrictions &&
      breed &&
      bio
    ) {
      const updatedPetData = { ...petData, name: user?.result?.firstName };
      if (!id) {
        dispatch(createPet({ updatedPetData, navigate, toast }));
      } else {
        dispatch(updatePet({ id, updatedPetData, toast, navigate }));
      }
      handleClear();
    }
  };

  const handleClear = () => {
    setPetData({
      petName: "",
      petType: "",
      adoptionStatus: "",
      height: "",
      weight: "",
      color: "",
      hypoallergenic: "",
      dietaryRestrictions: "",
      breed: "",
      bio: "",
    });
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setPetData({ ...petData, [name]: value });
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
        <h5 className="mt-4">{id ? "Update Pet" : "Add New Pet"}</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>
            <div className="col-md-12">
              <MDBInput
                label="Pet Name"
                placeholder="Enter the pet's name"
                type="text"
                value={petName || ""}
                name="petName"
                onChange={onInputChange}
                className="form-control"
                required
                invalid="true"
                validation="Please provide a pet name."
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                label="Pet Type"
                placeholder="Enter the pet's type"
                type="text"
                value={petType || ""}
                name="petType"
                onChange={onInputChange}
                className="form-control"
                required
                invalid="true"
                validation="Please provide a pet type."
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                label="Adoption Status"
                placeholder="Adopted, available or fostered"
                type="text"
                value={adoptionStatus || ""}
                name="adoptionStatus"
                onChange={onInputChange}
                className="form-control"
                required
                invalid="true"
                validation="Please provide an adoption status."
              />
            </div>
            <div className="col-md-6">
              <MDBInput
                label="Pet Height"
                placeholder="Height (in cm)"
                type="number"
                value={height || ""}
                name="height"
                onChange={onInputChange}
                className="form-control"
                required
                invalid="true"
                validation="Please provide a height."
              />
            </div>
            <div className="col-md-6">
              <MDBInput
                label="Pet Weight"
                placeholder="Weight (in kg)"
                type="number"
                value={weight || ""}
                name="weight"
                onChange={onInputChange}
                className="form-control"
                required
                invalid="true"
                validation="Please provide a weight."
              />
            </div>
            <div className="col-md-6">
              <MDBInput
                label="Pet Color"
                placeholder="Color"
                type="text"
                value={color || ""}
                name="color"
                onChange={onInputChange}
                className="form-control"
                required
                invalid="true"
                validation="Please provide a color."
              />
            </div>
            <div className="col-md-6">
              <MDBInput
                label="Hypoallergenic?"
                placeholder="Hypoallergenic?(y/n)"
                type="text"
                value={hypoallergenic || ""}
                name="hypoallergenic"
                onChange={onInputChange}
                className="form-control"
                required
                invalid="true"
                validation="Please provide an answer."
              />
            </div>
            <div className="col-md-6">
              <MDBInput
                label="Dietary Restrictions?"
                placeholder="Dietary restrictions?"
                type="text"
                value={dietaryRestrictions || ""}
                name="dietaryRestrictions"
                onChange={onInputChange}
                className="form-control"
                required
                invalid="true"
                validation="Please provide an answer."
              />
            </div>
            <div className="col-md-6">
              <MDBInput
                label="Breed"
                placeholder="Breed"
                type="text"
                value={breed || ""}
                name="breed"
                onChange={onInputChange}
                className="form-control"
                required
                invalid="true"
                validation="Please provide a breed."
              />
            </div>
            <div className="col-md-12">
              <textarea
                placeholder="Write here a short bio"
                type="text"
                value={bio}
                name="bio"
                onChange={onInputChange}
                className="form-control"
                required
                textarea
                rows={4}
                validation="Please provide a bio."
              />
            </div>
            <div className="d-flex-justify-content-start">
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setPetData({ ...petData, imageFile: base64 })
                }
              />
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

export default AddEditPet;
