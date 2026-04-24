import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

function SiteNavbar({ cartCount }) {
  return (
    <Navbar expand="lg" bg="dark" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Rush Hour
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/products">Products</Nav.Link>
            <Nav.Link as={Link} to="/cart">
              Cart <Badge bg="warning" text="dark">{cartCount}</Badge>
            </Nav.Link>
            <Nav.Link as={Link} to="/checkout">Checkout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default SiteNavbar;