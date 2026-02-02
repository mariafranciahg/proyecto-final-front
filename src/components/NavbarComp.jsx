import React, { useContext } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import logo from "../assets/img/logo.png";
import "./Navbar.css"; 

const NavbarComp = () => {
  const { token, logout } = useContext(UserContext);

  return (
    <Navbar expand="lg" className="navbar-servi py-2">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="brand-text">
          <img
            src={logo}
            alt="servicasa logo"
            style={{ width: "32px", height: "32px" }}
          />
          Servicasa
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="nav" />

        <Navbar.Collapse id="nav">
          <Nav className="ms-auto">
            {!token && (
              <>
                <NavLink to="/login" className="nav-link-servi">
                  Iniciar sesión
                </NavLink>
                <NavLink to="/register" className="nav-link-servi">
                  Registrarse
                </NavLink>
              </>
            )}

            {token && (
              <>
                <NavLink to="/profile" className="nav-link-servi">
                  Perfil
                </NavLink>
                <NavLink to="/" className="nav-link-servi">
                  Mis Solicitudes
                </NavLink>
                <NavLink to="/create-service" className="nav-link-servi">
                  Crear Publicacion
                </NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComp;
