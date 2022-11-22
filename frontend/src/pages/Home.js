import React, { useEffect } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { getPets } from "../redux/features/petSlice";
import CardPet from "../components/CardPet";
import Spinner from "../components/Spinner";

const Home = () => {
  const { pets, loading } = useSelector((state) => ({ ...state.pet }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPets());
  }, [dispatch]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "1000px",
        alignContent: "center",
      }}
    >
      <MDBRow className="mt-5">
        {pets.length === 0 && (
          <MDBTypography className="text-center mb-0" tag="h2">
            No pets found!
          </MDBTypography>
        )}

        <MDBCol>
          <MDBContainer style={{ marginTop: "1rem" }}>
            <MDBRow className="row-cols-1 row-cols-md-3 g-2">
              {pets && pets.map((item) => <CardPet key={item._id} {...item} />)}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default Home;
