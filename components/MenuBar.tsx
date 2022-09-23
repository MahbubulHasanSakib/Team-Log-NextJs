import "bootstrap/dist/css/bootstrap.css";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MenuStyles from "../styles/MenuBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { useAppContext } from "../components/UserContext";
import axios from "axios";
import { Navbar, Container, Nav, NavLink, NavDropdown } from "react-bootstrap";

const MenuBar = () => {
  const router = useRouter();
  const userData = useAppContext();

  const handleClick = (e: any) => {
    router.push("/statistics");
  };
  const goToHome = (e: any) => {
    router.push("/");
  };
  const handleLogOut = () => {
    userData.userInfo.setIsValid(false);
    //localStorage.removeItem('userDetails');
    router.push("/login");
  };
  return (
    <div className="menu bg-dark">
      <Navbar bg="dark" expand="lg">
        <Container>
          <Navbar.Toggle
            className="bg-light"
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto navbar  navbar-expand-lg navbar-light bg-transparent">
              <Nav.Link
                style={{ marginRight: "10px" }}
                className={`nav-link ${MenuStyles.menuItems} 
                ${router.pathname === "/" && MenuStyles.menuActive}`}
                onClick={goToHome}
              >
                Home
              </Nav.Link>
              <Nav.Link
                className={`nav-link ${MenuStyles.menuItems}
                 ${router.pathname === "/statistics" && MenuStyles.menuActive}`}
                onClick={handleClick}
              >
                Statistics
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link onClick={handleLogOut} style={{ fontSize: "15px" }}>
                <span>
                  <FontAwesomeIcon icon={faArrowCircleLeft} />
                </span>
                Log Out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default MenuBar;
