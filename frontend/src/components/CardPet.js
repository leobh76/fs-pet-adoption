import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardGroup,
  MDBBtn,
  MDBIcon,
  MDBTooltip,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { likePet } from "../redux/features/petSlice";

const statusColors = {
  Available: "rgba(0,128,0, 0.7)",
  Fostered: "rgba(255,165,0, 0.7)",
  Adopted: "rgba(255, 0, 0, 0.7)",
};

const CardPet = ({ imageFile, petName, bio, adoptionStatus, _id, likes }) => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const userId = user?.result?._id;

  const dispatch = useDispatch();
  const excerpt = (str) => {
    if (str.length > 50) {
      str = str.substring(0, 50) + "...";
    }
    return str;
  };

  const Likes = () => {
    if (likes?.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <MDBIcon fas icon="heart" />
          &nbsp;
          {likes?.length > 2 ? (
            <MDBTooltip
              tag="a"
              title={`You and ${likes.length - 1} other likes`}
            >
              {likes.length} likes
            </MDBTooltip>
          ) : (
            `${likes.length} like${likes.length > 1 ? "s" : ""}`
          )}
        </>
      ) : (
        <>
          <MDBIcon fas icon="heart" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <MDBIcon far icon="heart" />
        &nbsp;Like
      </>
    );
  };

  const handleLike = () => {
    dispatch(likePet({ _id }));
  };

  return (
    <MDBCardGroup>
      <MDBCard
        className="m-2 d-sm-flex"
        style={{
          maxWidth: "20rem",
        }}
      >
        <MDBCardImage
          src={imageFile}
          alt={petName}
          position="top"
          style={{ maxWidth: "100%", height: "180px", objectFit: "cover" }}
        />
        <div
          className="top-left"
          style={{
            position: "absolute",
            padding: "5px 10px",
            borderRadius: "15px",
            top: "8px",
            left: "16px",
            color: "#ffff",
            background: statusColors[adoptionStatus],
            fontWeight: "500",
            fontSize: "14px",
          }}
        >
          Status: {adoptionStatus}
        </div>
        <MDBCardBody>
          <MDBBtn
            style={{ float: "right" }}
            tag="a"
            color="none"
            onClick={!user?.result ? null : handleLike}
          >
            {!user?.result ? (
              <MDBTooltip tag="a" title="Please login to like">
                <Likes />
              </MDBTooltip>
            ) : (
              <Likes />
            )}
          </MDBBtn>
          <MDBCardTitle className="text-start">{petName}</MDBCardTitle>
          <MDBCardText className="text-start">{excerpt(bio)}</MDBCardText>
          <Link to={`/pet/${_id}`}>Read More</Link>
        </MDBCardBody>
      </MDBCard>
    </MDBCardGroup>
  );
};

export default CardPet;
