import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";

// Icons from react-icons
import {
  FaMapMarkedAlt,
  FaHome,
  FaUtensils,
  FaGlassCheers,
  FaLandmark,
  FaRoute,
  FaInfoCircle
} from "react-icons/fa";

export default function NavigationBar() {
  return (
    <Navbar
      bg="dark"
      data-bs-theme="dark"
      expand="lg"
      fixed="top"
      className="mb-4"
    >
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/">
          <FaMapMarkedAlt className="me-2" />
          SerbTour
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>
              <FaHome className="me-1" />
              Home
            </Nav.Link>

            <Nav.Link as={NavLink} to="/food">
              <FaUtensils className="me-1" />
              Food
            </Nav.Link>

            <Nav.Link as={NavLink} to="/nightlife">
              <FaGlassCheers className="me-1" />
              Nightlife
            </Nav.Link>

            <Nav.Link as={NavLink} to="/historical">
              <FaLandmark className="me-1" />
              Historical Sites
            </Nav.Link>

            <Nav.Link as={NavLink} to="/itinerary">
              <FaRoute className="me-1" />
              Itinerary
            </Nav.Link>

            <Nav.Link as={NavLink} to="/travel-tips">
                <FaInfoCircle className="me-1" />
                Travel Tips
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
