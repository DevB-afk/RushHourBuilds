import { useMemo, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import ProductCard from "../components/ProductCard";

function Products({ products, addToCart }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...new Set(products.map((p) => p.category))],
    [products]
  );

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <Container className="py-5">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <h2 className="mb-0">Products</h2>
        <Form.Select
          style={{ maxWidth: "250px" }}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Form.Select>
      </div>

      <Row className="g-4">
        {filteredProducts.map((product) => (
          <Col md={6} lg={4} xl={3} key={product.id}>
            <ProductCard product={product} addToCart={addToCart} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Products;