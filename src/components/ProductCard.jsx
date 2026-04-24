import { Card, Button, Badge } from "react-bootstrap";

function ProductCard({ product, addToCart }) {
  return (
    <Card className="h-100 shadow-sm product-card">
      <Card.Img
  variant="top"
  src={`${import.meta.env.BASE_URL}${product.image}`}
  alt={product.name}
/>
      <Card.Body className="d-flex flex-column">
        <div className="mb-2">
          <Badge bg="secondary">{product.category}</Badge>
        </div>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text className="fw-bold mb-1">${product.price.toFixed(2)}</Card.Text>
        <Card.Text className={product.stock > 0 ? "text-success" : "text-danger"}>
          {product.stock > 0 ? `In stock: ${product.stock}` : "Out of stock"}
        </Card.Text>

        <Button
          className="mt-auto"
          variant="warning"
          onClick={() => addToCart(product.id)}
          disabled={product.stock <= 0}
        >
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;