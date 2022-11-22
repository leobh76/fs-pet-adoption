import React, { useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../redux/features/authSlice";
import { searchPets } from "../redux/features/petSlice";
import { useNavigate } from "react-router-dom";
import decode from "jwt-decode";

const Header = () => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = user?.token;

  if(token) {
    const decodedToken = decode(token);
    if(decodedToken.exp * 1000 < new Date().getTime()) {
      dispatch(setLogout());
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      dispatch(searchPets(search));
      navigate(`/pets/search?searchquery=${search}`);
      setSearch("");
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    dispatch(setLogout());
  };

  return (
    <MDBNavbar fixed="top" expand="lg" style={{ backgroundColor: "#F0E6EA" }}>
      <MDBContainer>
        <MDBNavbarBrand
          href="/"
          style={{ color: "#606080", fontWeight: "600", fontSize: "22px" }}
        >
          🐶 Pet Adoption 🐱
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShow(!show)}
          style={{ color: "#606080" }}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse show={show} navbar>
          <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
            {user?.result?.firstName && (
              <h5 style={{ marginRight: "2rem", marginTop: "1.5rem" }}>
                Welcome, {user?.result?.firstName}!
              </h5>
            )}
            <MDBNavbarItem>
              <MDBNavbarLink href="/">
                <p className="header-text">Home</p>
              </MDBNavbarLink>
            </MDBNavbarItem>
            {user?.result?.firstName && (
              <>
                {user?.result?.isAdmin ? (
                  <MDBNavbarItem>
                    <MDBNavbarLink href="/addpet">
                      <p className="header-text">Add Pet</p>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                ) : (
                  ""
                )}
                {user?.result?.isAdmin ? (
                  <MDBNavbarItem>
                    <MDBNavbarLink href="/adduser">
                      <p className="header-text">Add User</p>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                ) : (
                  ""
                )}
                {user?.result?.isAdmin ? (
                  <MDBNavbarItem>
                    <MDBNavbarLink href="/dashboard">
                      <p className="header-text">Pets Dashboard</p>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                ) : (
                  ""
                )}
                {user?.result?.isAdmin ? (
                  <MDBNavbarItem>
                    <MDBNavbarLink href="/usersdashboard">
                      <p className="header-text">Users Dashboard</p>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                ) : (
                  ""
                )}
              </>
            )}
            {user?.result?.firstName ? (
              <MDBNavbarItem>
                <MDBNavbarLink href="/login">
                  <p className="header-text" onClick={handleLogout}>
                    Logout
                  </p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            ) : (
              <MDBNavbarItem>
                <MDBNavbarLink href="/login">
                  <p className="header-text">Login</p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            )}
          </MDBNavbarNav>
          <form className="d-flex input-group w-auto" onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="🔍 Search for a pet..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;
