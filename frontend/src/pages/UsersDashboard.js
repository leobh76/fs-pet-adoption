import React, { useEffect } from "react";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBCardGroup,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser, getUsers } from "../redux/features/userSlice";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

const UsersDashboard = () => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { users, loading } = useSelector((state) => ({ ...state.user }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if (loading) {
    return <Spinner />;
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser({ id, toast }));
    }
  };

  return (
    <div
      style={{
        margin: "auto",
        padding: "120px",
        alignContent: "center",
      }}
    >
      <h4 className="text-center">
        {user?.result?.firstName}'s Users Dashboard
      </h4>
      <hr style={{ maxWidth: "100%" }} />
      {users &&
        users.map((item) => (
          <MDBCardGroup key={item._id}>
            <MDBCard styles={{ maxWidth: "600px" }} className="mt-2">
              <MDBRow className="g-0">
                <MDBCol md="10">
                  <MDBCardTitle className="text-start mt-3 mx-3">
                    {item.firstName} {item.lastName} | <small>{item.email}</small> | <small>{item.phone}</small>
                  </MDBCardTitle>
                </MDBCol>
                <MDBCol md="2">
                  <MDBCardBody>
                    <div
                      style={{
                        marginLeft: "5px",
                        float: "right",
                        marginBottom: "1rem",
                      }}
                    >
                      <Link to={`/edituser/${item._id}`}>
                        <MDBIcon
                          fas
                          icon="edit"
                          style={{ color: "#55acee" }}
                          size="lg"
                        />
                      </Link>
                      <MDBBtn tag="a" color="none">
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

export default UsersDashboard;
