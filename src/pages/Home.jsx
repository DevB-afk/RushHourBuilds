import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home({ products, addToCart }) {
  const featured = products.filter(
  (p) =>
    p.category === "Prebuilt PCs" ||
    p.category === "GPUs"
).slice(0, 4);

  return (
    <>
      <section className="hero-section text-white text-center d-flex align-items-center">
        <Container>
          <h1 className="display-4 fw-bold">Rush Hour Tech</h1>
          <p className="lead">Fast parts. Clean builds. No slowdown.</p>
          <Button as={Link} to="/products" variant="warning" size="lg">
            Shop Products
          </Button>
        </Container>
      </section>

      <Container className="py-5">
        <h2 className="text-center mb-4">Hot Products</h2>
        <Row className="g-4">
          {featured.map((product) => (
            <Col md={6} lg={3} key={product.id}>
              <Card className="h-100 shadow-sm">
                <Card.Img variant="top" src={product.image} alt={product.name} />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Card.Text className="fw-bold">${product.price.toFixed(2)}</Card.Text>
                  <Button
                    variant="warning"
                    className="mt-auto"
                    onClick={() => addToCart(product.id)}
                    disabled={product.stock <= 0}
                  >
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Home;