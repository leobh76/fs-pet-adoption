import React, { useEffect } from "react";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBCardGroup,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deletePet, getPets } from "../redux/features/petSlice";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { pets, loading } = useSelector((state) => ({ ...state.pet }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPets());
  }, [dispatch]);

  const excerpt = (str) => {
    if (str.length > 40) {
      str = str.substring(0, 40) + "...";
    }
    return str;
  };

  if (loading) {
    return <Spinner />;
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this pet?")) {
      dispatch(deletePet({ id, toast }));
    }
  };

  return (
    <div
      style={{
        margin: "auto",
        padding: "120px",
        maxWidth: "900px",
        alignContent: "center",
      }}
    >
      <h4 className="text-center" style={{ marginTop: "-1rem" }}>
        {user?.result.firstName}'s Pet Dashboard
      </h4>
      <hr style={{ maxWidth: "100%" }} />
      {pets &&
        pets.map((item) => (
          <MDBCardGroup key={item._id}>
            <MDBCard styles={{ maxWidth: "600px" }} className="mt-2">
              <MDBRow className="g-0">
                <MDBCol md="4">
                  <MDBCardImage
                    className="rounded"
                    style={{
                      height: "80px",
                      width: "80px",
                      marginTop: "20px",
                      objectFit: "cover",
                    }}
                    src={item.imageFile}
                    alt={item.petName}
                    fluid
                  />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody>
                    <MDBCardTitle className="text-start">
                      {item.petName}
                    </MDBCardTitle>
                    <MDBCardText className="text-start">
                      <small className="text-muted">{excerpt(item.bio)}</small>
                    </MDBCardText>
                    <div
                      style={{
                        marginLeft: "5px",
                        float: "right",
                        marginTop: "-60px",
                      }}
                    >
                      <Link to={`/editpet/${item._id}`}>
                        <MDBIcon
                          fas
                          icon="edit"
                          style={{ color: "#55acee" }}
                          size="lg"
                        />
                      </Link>
                      <MDBBtn className="mt-1" tag="a" color="none">
                        <MDBIcon
                          fas
                          icon="trash"
                          style={{ color: "#dd4b39", marginLeft: "10px" }}
                          size="lg"
                          onClick={() => handleDelete(item._id)}
                        />
                      </MDBBtn>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCardGroup>
        ))}
    </div>
  );
};

export default Dashboard;
