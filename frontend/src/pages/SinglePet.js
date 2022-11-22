import React, { useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBContainer,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import { getPet } from "../redux/features/petSlice";

const SinglePet = () => {
  const dispatch = useDispatch();
  const { pet } = useSelector((state) => ({ ...state.pet }));
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getPet(id));
    }
  }, [id, dispatch]);

  return (
    <>
      <MDBContainer style={{ marginTop: "7rem" }} className="rounded-start">
        <MDBCard className=" mb-3 mt-5 flex flex-row">
          <MDBCardImage
            className="rounded-start"
            position="top"
            style={{
              maxWidth: "35%",
              maxHeight: "100%",
              objectFit: "scale-down",
            }}
            src={pet.imageFile}
            alt={pet.petName}
          />
          <MDBCardBody>
            <MDBCardText className="right text-start mt-2">
              <MDBIcon
                style={{ float: "left", margin: "5px" }}
                far
                icon="calendar-alt"
                size="lg"
              />
              <small className="text-muted">
                {moment(pet.createdAt).fromNow()}
              </small>
            </MDBCardText>
            <MDBCardText className="lead mb-3 text-start">
              <h3>{pet.petName}</h3>
              <em>{pet.bio}</em>
            </MDBCardText>
            <MDBCardText className="lead mb-0 text-start">
              <strong>• Type: </strong>
              {pet.petType}
              <br />
              <strong>• Adoption Status: </strong>
              {pet.adoptionStatus}
              <br />
              <strong>• Height: </strong>
              {pet.height}cm
              <br />
              <strong>• Weight: </strong>
              {pet.weight}kg
              <br />
              <strong>• Color: </strong>
              {pet.color}
              <br />
              <strong>• Hypoallergenic: </strong>
              {pet.hypoallergenic}
              <br />
              <strong>• Dietary Restrictions: </strong>
              {pet.dietaryRestrictions}
              <br />
              <strong>• Breed: </strong>
              {pet.breed}
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
        {pet.adoptionStatus === "Available" ? (
          <MDBBtn>
            Adopt {pet.petName}! <MDBIcon icon="paw" />
          </MDBBtn>
        ) : (
          <MDBBtn color="light" disabled>
            {pet.petName} is not available for adoption...
            <MDBIcon icon="paw" />
          </MDBBtn>
        )}
      </MDBContainer>
    </>
  );
};

export default SinglePet;
